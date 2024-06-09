<template>
  <nav class="flex items-center justify-between p-4">
    <h1 class="text-2xl">Hello</h1>
    <NewPostButton v-if="!isLoading && isAuthenticated" />
    <div
      class="flex items-center justify-between gap-3"
      v-if="!isLoading && isAuthenticated"
    >
      <ModeToggle />
      <UserButton v-if="loaded" afterSignOutUrl="/" />
    </div>
    <Button v-else-if="!isLoading && !isAuthenticated"
      ><NuxtLink to="/sign-in">Sign in</NuxtLink></Button
    >
  </nav>
</template>
<script setup lang="ts">
import { useClerk, UserButton } from "vue-clerk";
import { useCurrentUser } from "~/composables/useCurrentUser";
const { isAuthenticated, isLoading } = useCurrentUser();
const { loaded } = useClerk();
</script>
