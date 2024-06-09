<template>
  <div v-if="comments?.length > 0" class="w-full space-y-4 text-left">
    <ul class="space-y-8">
      <Comment
        v-for="comment in comments"
        :comment="comment"
        :user="comment.user"
        v-if="comments.length > 0"
      />
    </ul>
    <Button
      class="mx-auto"
      v-if="!isDone"
      :disabled="isLoadingMore"
      @click="loadMore"
      >{{
        isLoadingMore
          ? "Loading more..."
          : isDone
            ? "No more comments"
            : "Load more comments"
      }}</Button
    >
  </div>
</template>
<script lang="ts" setup>
import { useConvexPaginatedQuery } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const props = defineProps<{
  postId: Id<"posts">;
}>();

const {
  data: comments,
  isLoading,
  isLoadingMore,
  isDone,
  lastPage,
  loadMore,
  reset,
} = useConvexPaginatedQuery(
  api.comments.getCommentsByPostId,
  {
    postId: props.postId,
  },
  {
    numItems: 2,
  },
);
</script>
