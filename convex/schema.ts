import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";



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
});