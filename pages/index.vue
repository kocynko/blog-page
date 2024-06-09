<template>
  <Posts v-if="!isLoading && isAuthenticated" />
  <div
    v-else-if="!isAuthenticated"
    class="container flex w-full items-center justify-center"
  >
    <h1 class="text-3xl">Sign in to see posts</h1>
  </div>
</template>
<script setup lang="ts">
import { useCurrentUser } from "~/composables/useCurrentUser";
const { isAuthenticated, isLoading } = useCurrentUser();
</script>
