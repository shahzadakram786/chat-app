import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

export const create = mutation({
  args: {
    conversationId: v.id("conversations"),
    type: v.union(v.literal("text"), v.literal("image"), v.literal("file")), // More specific validation
    content: v.array(v.string())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      throw new ConvexError("Unauthorized"); // Use ConvexError for consistency
    }

    const currentUser = await getUserByClerkId({
      ctx, 
      clerkId: identity.subject
    });

    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    const membership = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId_conversationId", 
        q => q
          .eq("memberId", currentUser._id)
          .eq("conversationId", args.conversationId)
      )
      .unique();

    if (!membership) {
      throw new ConvexError("You aren't a member of this conversation");
    }

    // Create message with timestamp
    const message = await ctx.db.insert("messages", {
      senderId: currentUser._id,
      conversationId: args.conversationId,
      type: args.type,
      content: args.content,
    //   timestamp: Date.now() // Add timestamp
    });

    try {
      // Update conversation with last message reference
      await ctx.db.patch(args.conversationId, {
        lastMessageId: message,
        // lastMessageAt: Date.now() // Also track when last message was sent
      });
    } catch (error) {
      // Handle case where conversation doesn't have lastMessageId field
      console.error("Failed to update conversation:", error);
      // You might want to handle this differently based on your schema
    }

    return message;
  }
});