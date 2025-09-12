import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";





export const get = query({ 
    args:{
        id: v.id("conversations")
    },

    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if(!identity){
            throw new Error("Unauthorized");
        }

        const currentUser = await 
        getUserByClerkId({
            ctx , clerkId: identity.subject
        })


        if(!currentUser){
            throw new ConvexError("User not found")
        }




    }

})