import { createClerkClient, verifyToken } from "@clerk/backend";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action, internalQuery, mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createPost = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("posts", {
      text: args.text,
      user_id: user._id,
    });
  },
});

export const getPost = query({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }
    return post;
  },
});

export const getPosts = query({
  async handler(ctx) {
    await getCurrentUserOrThrow(ctx);

    const posts = await ctx.db.query("posts").collect();
    return Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.user_id);
        if (!user) {
          throw new Error("User not found");
        }
        return {
          ...post,
          user,
        };
      }),
    );
  },
});

export const deletePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }
    if (post.user_id !== user._id) {
      return null;
    }
    await ctx.db.delete(args.postId);
  },
});
