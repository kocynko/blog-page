<script setup lang="ts">
import { useConvexAction, useConvexQuery } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";

const { data, isLoading, error } = useConvexQuery(api.posts.getPosts, {});
</script>

<template>
  <div class="container flex w-full items-center justify-center">
    <ul class="w-1/2 space-y-4">
      <li v-if="isLoading"><h1 class="text-3xl">LOADING</h1></li>
      <Post
        v-if="data?.posts"
        v-for="post in data.posts"
        :key="post._id"
        :post="post"
        :current-user-id="data.tokenIdentifier"
      />
    </ul>
  </div>
</template>
