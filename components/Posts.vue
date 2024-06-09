<script setup lang="ts">
import { useConvexPaginatedQuery } from "@convex-vue/core";
import { Loader2 } from "lucide-vue-next";
import { api } from "~/convex/_generated/api";
import { vInfiniteScroll } from "@vueuse/components";

const { data, isLoading, isLoadingMore, isDone, loadMore, reset, suspense } =
  useConvexPaginatedQuery(
    api.posts.getPosts, // the query name
    {}, // query arguments, if no arguments you need to pass an empty object. It can be ref,
    { numItems: 2 }, // the number of items per page
  );

function onLoadMore() {
  if (!isDone.value && !isLoadingMore.value) {
    loadMore();
  }
}
</script>

<template>
  <div
    v-if="!isLoading"
    class="w-full space-y-4 overflow-y-scroll py-8 pt-32"
    v-infinite-scroll="[onLoadMore, { distance: 2 }]"
  >
    <Post
      v-if="data.length > 0"
      v-for="post in data"
      :key="post._id"
      :post="post"
      :post-user="post.user"
    />
    <h2 v-else-if="!isLoading && data.length === 0" class="text-2xl">
      No posts
    </h2>
  </div>
  <Loader2
    class="mx-auto mt-32 h-24 w-24 animate-spin text-zinc-500"
    v-if="isLoading"
  />
  <Loader2
    class="fixed bottom-12 left-1/2 h-12 w-12 animate-spin text-zinc-500"
    v-if="isLoadingMore"
  />
</template>
