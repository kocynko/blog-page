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
    <ul class="w-1/2 space-y-4">
      <Post v-for="post in posts" :key="post._id" :post="post" />
    </ul>
  </div>
</template>
