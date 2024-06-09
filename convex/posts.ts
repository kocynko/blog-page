import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
  args: {
    text: v.string(),
    storageId: v.id("_storage"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("posts", {
      text: args.text,
      storageId: args.storageId,
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
  args: {
    paginationOpts: paginationOptsValidator,
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    const posts = await ctx.db
      .query("posts")
      .order("desc")
      .paginate(args.paginationOpts);
    const data = posts.page.map(async (post) => {
      const user = await ctx.db.get(post.user_id);
      const url = await ctx.storage.getUrl(post.storageId);
      if (!url) {
        throw new ConvexError("Thumbnail not found");
      }
      if (!user) {
        throw new ConvexError("User not found");
      }
      return {
        ...post,
        user,
        thumbnailUrl: url,
      };
    });
    return {
      ...posts,
      page: await Promise.all(data),
    };
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

export const likePost = mutation({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    return await ctx.db.insert("postLikes", {
      postId: args.postId,
      userId: user._id,
    });
  },
});

export const unlikePost = mutation({
  args: {
    postLikeId: v.id("postLikes"),
  },
  async handler(ctx, args) {
    await getCurrentUserOrThrow(ctx);
    await ctx.db.delete(args.postLikeId);
  },
});

export const hasLikedPost = query({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    const like = await ctx.db
      .query("postLikes")
      .withIndex("by_Post_Token", (q) =>
        q.eq("postId", args.postId).eq("userId", user._id),
      )
      .first();
    return like;
  },
});

export const getPostLikes = query({
  args: {
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const likes = await ctx.db
      .query("postLikes")
      .withIndex("by_Post_Token", (q) => q.eq("postId", args.postId))
      .collect();
    return likes.length;
  },
});
