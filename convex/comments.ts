import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

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
    postId: v.id("posts"),
  },
  async handler(ctx, args) {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_postId", (q) => q.eq("postId", args.postId))
      .collect();
    return Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        if (!user) {
          throw new Error("User not found");
        }
        return {
          ...comment,
          user,
        };
      }),
    );
  },
});
