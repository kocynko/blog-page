<template>
  <nav
    class="fixed left-1/2 z-50 flex w-[90%] -translate-x-1/2 flex-row-reverse items-center justify-between bg-white p-4 dark:bg-zinc-900"
  >
    <div
      class="flex items-center justify-between gap-3"
      v-if="!isLoading && isAuthenticated"
    >
      <NewPostButton v-if="!isLoading && isAuthenticated" />
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
