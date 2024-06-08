<template>
  <div>
    <nav class="flex items-center justify-between p-4">
      <h1 class="text-2xl">Hello {{ user?.firstName }}</h1>
      <NewPostButton v-if="isSignedIn" />
      <div class="flex items-center justify-between gap-3" v-if="isSignedIn">
        <ModeToggle />
        <UserButton v-if="isSignedIn" />
      </div>
      <SignInButton v-else />
    </nav>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { SignInButton, UserButton, useAuth, useUser } from "vue-clerk";
const { isSignedIn } = useAuth();
const { user } = useUser();
</script>
