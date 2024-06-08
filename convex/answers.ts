import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createAnswer = mutation({
  args: {
    commentId: v.id("comments"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    const answerId = await ctx.db.insert("answers", {
      commentId: args.commentId,
      text: args.text,
      tokenIdentifier: userId,
    });
    return answerId;
  },
});

export const getAnswersByCommentId = query({
  args: {
    commentId: v.id("comments"),
  },
  async handler(ctx, args) {
    return await ctx.db
      .query("answers")
      .withIndex("by_commentId", (q) => q.eq("commentId", args.commentId))
      .collect();
  },
});
