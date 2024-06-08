<template>
  <div class="ml-10 space-y-3 text-left">
    <div class="flex max-w-fit flex-col items-start">
      <p class="max-w-fit gap-2 rounded bg-zinc-100 p-2 dark:bg-zinc-700">
        {{ props.answer.text }}
      </p>
      <div>
        <span class="max-h-2 max-w-16 text-xs">{{ timeAgo }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  answer: Doc<"answers">;
}>();

const timeAgo = useTimeAgo(props.answer._creationTime, {
  updateInterval: 30_000,
});
</script>
