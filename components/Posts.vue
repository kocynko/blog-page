<script setup lang="ts">
import { useConvexAction, useConvexQuery } from "@convex-vue/core";
import { SignedIn, useUser } from "vue-clerk";
import { api } from "~/convex/_generated/api";
const { data, isLoading, error } = useConvexQuery(api.posts.getPosts, {});
</script>

<template>
  <div class="container flex w-full items-center justify-center py-12">
    <ul class="w-1/2 space-y-4">
      <li v-if="isLoading"><h1 class="text-3xl">LOADING</h1></li>
      <Post
        v-if="!isLoading && data.length > 0"
        v-for="post in data"
        :key="post._id"
        :post="post"
        :post-user="post.user"
      />
    </ul>
  </div>
</template>
