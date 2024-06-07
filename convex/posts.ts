import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createPost = mutation({
  args: {
    body: v.string(),
  },
  async handler(ctx, args) {
    const postId = await ctx.db.insert("posts", {
      body: args.body,
    });
    return postId;
  },
});
