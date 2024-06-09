<template>
  <li>
    <div class="flex flex-col space-y-3 text-left">
      <div>
        <div class="flex items-center gap-2">
          <NuxtImg
            :src="props.user.profilePicture"
            class="h-8 w-8 rounded-full"
          />
          <div
            class="flex max-w-fit flex-col rounded bg-zinc-100 p-2 dark:bg-zinc-700"
          >
            <span class="text-xs font-bold">{{ props.user.name }}</span>
            <span>
              {{ props.comment.text }}
            </span>
          </div>
        </div>
        <div>
          <span class="max-h-2 max-w-16 text-xs">{{ timeAgo }}</span>
          <Button
            variant="link"
            @click="showAnswerForm"
            class="max-h-4 max-w-16"
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
