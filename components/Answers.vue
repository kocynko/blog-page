<template>
  <div>
    <ul>
      <li><Answer v-for="answer in answers" :answer="answer" /></li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { api } from "~/convex/_generated/api";

const props = defineProps<{
  commentId: Id<"comments">;
}>();

const {
  data: answers,
  isLoading: answersIsLoading,
  error,
} = useConvexQuery(api.answers.getAnswersByCommentId, {
  commentId: props.commentId,
});
</script>
