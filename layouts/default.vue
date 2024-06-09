<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useAuth } from "vue-clerk";

const { isSignedIn } = useAuth();
</script>
