<script setup lang="ts">
import { useConvexMutation, useConvexQuery } from "@convex-vue/core";
import { useTimeAgo } from "@vueuse/core";
import { api } from "~/convex/_generated/api";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  comment: Doc<"comments">;
  user: Doc<"users">;
}>();

const timeAgo = useTimeAgo(props.comment._creationTime, {
  updateInterval: 30_000,
});

const { data: numberOfLikes, isLoading: likesLoading } = useConvexQuery(
  api.comments.getCommentLikes,
  {
    commentId: props.comment._id,
  },
);
const { mutate: likecomment } = useConvexMutation(api.comments.likeComment);

const { mutate: unLikecomment } = useConvexMutation(api.comments.unlikeComment);

const { data: isLiked } = useConvexQuery(api.comments.hasLikedComment, {
  commentId: props.comment._id,
});

const answer = ref(false);

const showAnswerForm = () => {
  answer.value = !answer.value;
};

</script>
<template>
  <li>
    <div class="space-y-4">
      <div class="flex items-center gap-2 text-left">
        <NuxtImg
          :src="props.user.profilePicture"
          class="h-12 w-12 rounded-full"
        />
        <div class="flex flex-col justify-between">
          <div
            class="flex max-w-fit flex-col rounded bg-zinc-300 p-2 dark:bg-zinc-900"
          >
            <span class="text-xs font-bold">{{ props.user.name }}</span>
            <span>
              {{ props.comment.text }}
            </span>
          </div>
          <div class="flex gap-2">
            <span class="max-h-2 text-xs">{{ timeAgo }}</span>
            <span v-if="numberOfLikes" class="max-h-2 text-xs"
              >{{
                numberOfLikes < 2
                  ? numberOfLikes + " like"
                  : numberOfLikes + " likes"
              }}
            </span>
            <Button
              variant="link"
              @click="
                async () => {
                  if (isLiked)
                    await unLikecomment({ commentLikeId: isLiked._id });
                  else await likecomment({ commentId: props.comment._id });
                }
              "
              class="max-h-4 max-w-16 p-0 hover:underline"
              >{{ isLiked ? "Unlike" : "Like" }}</Button
            >
            <Button
              variant="link"
              @click="showAnswerForm"
              class="max-h-4 max-w-16 p-0 hover:underline"
              >Answer</Button
            >
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <Answers
          :comment-id="props.comment._id"
          :isFormShowed="answer"
          :on-upload="showAnswerForm"
        />
      </div>
    </div>
  </li>
</template>
