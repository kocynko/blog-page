import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUserOrThrow } from "./users";

export const createAnswer = mutation({
  args: {
    commentId: v.id("comments"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const user = await getCurrentUserOrThrow(ctx);
    const answerId = await ctx.db.insert("answers", {
      commentId: args.commentId,
      text: args.text,
      userId: user._id,
    });
    return answerId;
  },
});

export const getAnswersByCommentId = query({
  args: {
    commentId: v.id("comments"),
  },
  async handler(ctx, args) {
    const answers = await ctx.db
      .query("answers")
      .withIndex("by_commentId", (q) => q.eq("commentId", args.commentId))
      .collect();
    return Promise.all(
      answers.map(async (answer) => {
        const user = await ctx.db.get(answer.userId);
        if (!user) {
          throw new Error("User not found");
        }
        return {
          ...answer,
          user,
        };
      }),
    );
  },
});
