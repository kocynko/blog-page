<script setup lang="ts">
import Post from "./Post.vue";
</script>

<template>
  <div class="container flex w-full items-center justify-center">
    <div class="flex w-2/3 flex-col gap-4">
      <Post />

      <TipTapEditor />
    </div>
  </div>
</template>
