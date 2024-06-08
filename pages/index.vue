<template>
  <Posts v-if="isSignedIn && isLoaded" />
  <div
    v-if="!isSignedIn && isLoaded"
    class="flex h-screen w-screen flex-col items-center justify-center"
  >
    <h1 class="text-3xl">Sign in to see posts</h1>
    <Button><NuxtLink to="/sign-in">Sign in</NuxtLink></Button>
  </div>
</template>
<script setup lang="ts">
import { useAuth } from "vue-clerk";

const { isSignedIn, isLoaded } = useAuth();
</script>
