<script setup lang="ts">
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
const isOpen = ref(false);

function closeDialog() {
  isOpen.value = false;
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger asChild>
      <Button class="flex items-center gap-2"
        ><Plus class="h-4 w-4" /> Create new post
      </Button>
    </DialogTrigger>
    <DialogContent class="max-w-screen-lg">
      <DialogHeader>
        <DialogTitle>Create new post</DialogTitle>
      </DialogHeader>
      <NewPostForm :onUpload="closeDialog" />
    </DialogContent>
  </Dialog>
</template>
