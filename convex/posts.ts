import { Posts } from "./../.nuxt/components.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { handler } from "tailwindcss-animate";

export const createPost = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    const postId = await ctx.db.insert("posts", {
      text: args.text,
      tokenIdentifier: userId,
    });
    return postId;
  },
});

export const getPosts = query({
  async handler(ctx) {
    return await ctx.db.query("posts").collect();
  },
});
export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }
    if (post.tokenIdentifier !== userId) {
      return null;
    }
    await ctx.db.delete(args.postId);
  },
});
