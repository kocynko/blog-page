<template>
  <div class="relative flex h-screen w-screen flex-col">
    <NavBar />
    <Posts v-if="!isLoading && isAuthenticated" />
    <div
      v-else-if="!isAuthenticated && !isLoading"
      class="container flex h-screen w-full flex-col items-center justify-center gap-2"
    >
      <h1 class="text-3xl">Sign in to Blog to see the newest Posts.</h1>
      <Button><NuxtLink to="/sign-in">Sign in</NuxtLink></Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCurrentUser } from "~/composables/useCurrentUser";
const { isAuthenticated, isLoading } = useCurrentUser();
</script>
