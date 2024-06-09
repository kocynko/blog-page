import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const store = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    profilePicture: v.string(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .unique();
    if (user) {
      return;
    }

    await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      profilePicture: args.profilePicture,
      tokenIdentifier: args.tokenIdentifier,
    });
  },
});

export const getUser = query({
  args: {
    tokenIdentifier: v.string(),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .unique();
  },
});
