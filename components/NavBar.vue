<template>
  <nav class="flex items-center justify-between p-4">
    <h1 class="text-2xl">Hello</h1>
    <NewPostButton v-if="isSignedIn" />
    <div class="flex items-center justify-between gap-3" v-if="isSignedIn">
      <ModeToggle />
      <UserButton v-if="isSignedIn" afterSignOutUrl="/" />
    </div>
    <Button v-else><NuxtLink to="/sign-in">Sign in</NuxtLink></Button>
  </nav>
</template>
<script setup lang="ts">
import { useAuth, UserButton } from "vue-clerk";

const { isSignedIn } = useAuth();
</script>
