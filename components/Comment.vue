<template>
  <li>
    <div class="flex items-center gap-2 text-left">
      <NuxtImg
        :src="props.user.profilePicture"
        class="h-12 w-12 rounded-full"
      />
      <div class="flex flex-col justify-between">
        <div
          class="flex max-w-fit flex-col rounded bg-zinc-100 p-2 dark:bg-zinc-700"
        >
          <span class="text-xs font-bold">{{ props.user.name }}</span>
          <span>
            {{ props.comment.text }}
          </span>
        </div>
        <div class="flex min-w-16">
          <span class="max-h-2 text-xs">{{ timeAgo }}</span>
          <Button
            variant="link"
            @click="showAnswerForm"
            class="max-h-4 max-w-16"
            >Answer</Button
          >
        </div>
      </div>
    </div>
    <Answers :comment-id="props.comment._id" />
    <AnswerForm
      v-if="answer"
      :comment-id="props.comment._id"
      :on-upload="showAnswerForm"
    />
  </li>
</template>
<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  comment: Doc<"comments">;
  user: Doc<"users">;
}>();

const timeAgo = useTimeAgo(props.comment._creationTime, {
  updateInterval: 30_000,
});

const answer = ref(false);
const showAnswerForm = () => {
  answer.value = !answer.value;
};
</script>
