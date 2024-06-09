<script setup>
import { SignIn } from "vue-clerk";
</script>

<template>
  <div class="flex h-screen w-screen justify-center">
    <SignIn fallbackRedirectUrl="/" />
  </div>
</template>
