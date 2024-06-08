<template>
  <div class="space-y-3 text-left">
    <div class="flex max-w-fit flex-col items-start">
      <p class="max-w-fit gap-2 rounded bg-zinc-100 p-2 dark:bg-zinc-700">
        {{ props.comment.text }}
      </p>
      <div>
        <span class="max-h-2 max-w-16 text-xs">{{ timeAgo }}</span>
        <Button variant="link" @click="showAnswerForm" class="max-h-4 max-w-16"
          >Answer</Button
        >
      </div>
    </div>
    <Answers :comment-id="props.comment._id" />
    <AnswerForm
      v-if="answer"
      :comment-id="props.comment._id"
      :on-upload="showAnswerForm"
    />
  </div>
</template>
<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  comment: Doc<"comments">;
}>();

const timeAgo = useTimeAgo(props.comment._creationTime, {
  updateInterval: 30_000,
});

const answer = ref(false);
const showAnswerForm = () => {
  answer.value = !answer.value;
};
</script>
