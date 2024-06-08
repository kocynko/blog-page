import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handler } from "tailwindcss-animate";

export const createPost = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const postId = await ctx.db.insert("posts", {
      text: args.text,
    });
    return postId;
  },
});

export const getPosts = query({
  async handler(ctx) {
    return await ctx.db.query("posts").collect();
  },
});
