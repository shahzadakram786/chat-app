// app/convex/auth.config.ts
export default {
  providers: [
    {
      domain: "https://easy-fox-78.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
  // Add these to match your env vars
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};