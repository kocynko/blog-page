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
      <Post
        v-if="!postsIsLoading"
        v-for="post in posts?.posts"
        :key="post._id"
        :post="post"
        :user-id="posts?.userId"
      />
      <div v-else>Loading...</div>
    </ul>
  </div>
</template>
