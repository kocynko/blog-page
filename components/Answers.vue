<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import type { Id } from "~/convex/_generated/dataModel";
import { api } from "~/convex/_generated/api";

const props = defineProps<{
  commentId: Id<"comments">;
  isFormShowed: boolean;
  onUpload: Function;
}>();

const {
  data: answers,
  isLoading: answersIsLoading,
  error,
} = useConvexQuery(api.answers.getAnswersByCommentId, {
  commentId: props.commentId,
});
const isAnswerShowed = ref(false);

const showAnswers = () => {
  isAnswerShowed.value = !isAnswerShowed.value;
};

const showAnswersAfterUpload = () => {
  props.onUpload();
  isAnswerShowed.value = true;
};
</script>
<template>
  <div v-if="isAnswerShowed">
    <ul class="space-y-4">
      <Answer v-for="answer in answers" :answer="answer" :user="answer.user" />
    </ul>
  </div>
  <Button
    variant="link"
    v-if="answers?.length > 0"
    @click="showAnswers"
    class="max-h-4 p-0 hover:underline"
    >{{ isAnswerShowed ? "Hide Answers" : "Show Answers" }}</Button
  >
  <AnswerForm
    v-if="isFormShowed"
    :comment-id="props.commentId"
    :on-upload="showAnswersAfterUpload"
  />
</template>
