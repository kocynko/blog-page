<template>
  <div>
    <ClientOnly>
      <NavBar />
    </ClientOnly>
    <slot />
  </div>
</template>
<script setup lang="ts"></script>
