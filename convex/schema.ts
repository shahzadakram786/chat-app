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
});