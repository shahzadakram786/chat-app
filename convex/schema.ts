import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";
import { request } from "http";



export default defineSchema({

    users: defineTable({
        // Define the fields of the users table
        username: v.string(),
        imageUrl: v.string(),
        clerkId: v.string(),
        email: v.string(),


         
    })
    .index("by_email", ["email"])   // Index to allow searching by email
    .index("by_clerkId", ["clerkId"]), // Index to allow

    requests: defineTable({
        sender: v.id("users"),
        receiver: v.id("users"),
        // status: v.string(), // e.g., 'pending', 'accepted', 'rejected'

    })

    .index("by_receiver", ["receiver"]) // Index to find requests by receiver
    .index("by_receiver_sender", ["receiver","sender"]), // Index to find requests by sender
    
    friends: defineTable({
        user1: v.id("users"),
        user2: v.id("users"),
        conversationId: v.id("conversations")
    })
    .index("by_user1" , ["user1"])
    .index("by_user2" , ["user2"])
    .index("by_conversationId" , ["conversationId"]),

    conversations: defineTable({
        name: v.optional(v.string()),
        isGroup: v.boolean(),
        lastMessageId: v.optional(v.id("messages")),

    }),
    conversationMembers: defineTable({
        memberId: v.id("users"),
        conversationId: v.id("conversations"),
        lastSeenMessage: v.optional(v.id("messages")),
    })
    .index("by_memberId" , ["memberId"])
    .index("by_conversationId" , ["conversationId"])
    .index("by_memberId_conversationId",
        ["memberId" , "conversationId"]
    ),


    messages: defineTable({
        senderId: v.id("users"),
        conversationId: v.id("conversations"),
        type: v.string(),
        content: v.array(v.string())
    })
    .index("by_conversationId" , ["conversationId"])

    






});