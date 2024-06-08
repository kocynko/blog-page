<script setup lang="ts">
import { useConvexQuery } from "@convex-vue/core";
import Post from "./Post.vue";
import { api } from "~/convex/_generated/api";
const { data: posts, isLoading: postsIsLoading } = useConvexQuery(
  api.posts.getPosts,
  {},
);
</script>

<template>
  <div class="container flex w-full items-center justify-center">
    <div class="flex w-2/3 flex-col gap-4">
      <Post v-for="post in posts" :key="post._id" :post="post" />
    </div>
  </div>
</template>
