<script setup>
import { SignIn } from "vue-clerk";
definePageMeta({
  title: "Sign In",
  layout: false,
});
</script>

<template>
  <div class="flex h-screen w-screen justify-center">
    <SignIn path="/sign-in" routing="path" redirectUrl="/" />
  </div>
</template>
