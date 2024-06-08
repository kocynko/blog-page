<template>
  <Posts v-if="isSignedIn" />
</template>
<script setup lang="ts">
import { useAuth } from "vue-clerk";

const { isSignedIn } = useAuth();

</script>
