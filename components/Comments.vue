<template>
  <div v-if="comments?.length > 0" class="w-full space-y-4 text-left">
    <h3
      class="hover:underline-offset-3 text-xl transition-all hover:cursor-pointer hover:underline"
      @click="showComments"
    >
      Comments
    </h3>
    <div class="space-y-4" v-if="visibleComments">
      <Comment
        v-for="comment in comments"
        :comment="comment"
        v-if="comments.length > 0"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useConvexQuery } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  post: Doc<"posts">;
}>();

const visibleComments = ref(false);
const showComments = () => {
  visibleComments.value = !visibleComments.value;
};

const {
  data: comments,
  isLoading: commentsIsLoading,
  error,
} = useConvexQuery(api.comments.getCommentsByPostId, {
  postId: props.post._id,
});
</script>
