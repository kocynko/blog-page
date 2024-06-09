import { createClerkClient, verifyToken } from "@clerk/backend";
import { ConvexError, v } from "convex/values";
import { api, internal } from "./_generated/api";
import { action, internalQuery, mutation, query } from "./_generated/server";

export const createPost = mutation({
  args: {
    text: v.string(),
  },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return null;
    }
    const postId = await ctx.db.insert("posts", {
      text: args.text,
      tokenIdentifier: user.tokenIdentifier,
    });
    await ctx.scheduler.runAfter(0, internal.users.store, {
      name: user.name!,
      email: user.email!,
      tokenIdentifier: user.tokenIdentifier!,
      profilePicture: user.pictureUrl!,
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
    const tokenIdentifier = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!tokenIdentifier) {
      return null;
    }
    const posts = await ctx.db.query("posts").collect();
    if (!posts) {
      return null;
    }
    return { posts: posts, tokenIdentifier };
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
