import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";
import { paginationOptsValidator } from "convex/server";

export const createComment = mutation({
  args: {
    postId: v.id("posts"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      text: args.text,
      userId: user._id,
    });
    return commentId;
  },
});

export const getCommentsByPostId = query({
  args: {
    paginationOpts: paginationOptsValidator,
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .order("desc")
      .paginate(args.paginationOpts);

    const data = comments.page.map(async (comment) => {
      const user = await ctx.db.get(comment.userId);
      if (!user) {
        throw new ConvexError("User not found");
      }
      return {
        ...comment,
        user,
      };
    });
    return {
      ...comments,
      page: await Promise.all(data),
    };
  },
});

export const likeComment = mutation({
  args: {
    commentId: v.id("comments"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    await ctx.db.insert("commentLikes", {
      commentId: args.commentId,
      userId: user._id,
    });
  },
});

export const hasLikedComment = query({
  args: {
    commentId: v.id("comments"),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    return ctx.db
      .query("commentLikes")
      .withIndex("by_Post_Token", (q) =>
        q.eq("commentId", args.commentId).eq("userId", user._id),
      )
      .first();
  },
});

export const getCommentLikes = query({
  args: {
    commentId: v.id("comments"),
  },
  async handler(ctx, args) {
    const likes = await ctx.db
      .query("commentLikes")
      .withIndex("by_Post_Token", (q) => q.eq("commentId", args.commentId))
      .collect();
    return likes.length;
  },
});

export const unlikeComment = mutation({
  args: {
    commentLikeId: v.id("commentLikes"),
  },
  async handler(ctx, args) {
    await getCurrentUserOrThrow(ctx);
    await ctx.db.delete(args.commentLikeId);
  },
});
