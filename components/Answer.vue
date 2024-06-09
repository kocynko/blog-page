<template>
  <li class="ml-10 flex flex-col items-start space-y-3 text-left">
    <div>
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="props.user.profilePicture"
          class="h-8 w-8 rounded-full"
        />
        <div
          class="flex max-w-fit flex-col rounded bg-zinc-100 p-2 dark:bg-zinc-700"
        >
          <span class="text-xs font-bold">{{ props.user.name }}</span>
          <span>
            {{ props.answer.text }}
          </span>
        </div>
      </div>
      <span class="max-h-2 text-xs">{{ timeAgo }}</span>
    </div>
  </li>
</template>
<script setup lang="ts">
import { useTimeAgo } from "@vueuse/core";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  answer: Doc<"answers">;
  user: Doc<"users">;
}>();
console.log(props);

const timeAgo = useTimeAgo(props.answer._creationTime, {
  updateInterval: 30_000,
});
</script>
