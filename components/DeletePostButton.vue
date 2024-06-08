<template>
  <AlertDialog>
    <AlertDialogTrigger asChild
      ><Button
        variant="ghost"
        size="icon"
        class="absolute right-2 top-2 h-fit w-fit hover:bg-transparent"
      >
        <X :size="20" class="hover:text-destructive" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your post
          and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          @click="onDeleteButtonClick"
          v-if="!deleteDocument.isLoading"
          :disabled="!deleteDocument.isLoading"
          ><Loader2 class="animate-spin" />Deleting..</AlertDialogAction
        >
        <AlertDialogAction v-else @click="onDeleteButtonClick"
          >Delete</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useConvexMutation } from "@convex-vue/core";
import { Loader2, Trash2, X } from "lucide-vue-next";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const props = defineProps<{ postId: Id<"posts"> }>();

const deleteDocument = useConvexMutation(api.posts.deletePost);

const onDeleteButtonClick = async () => {
  await deleteDocument
    .mutate({ postId: props.postId })
    .then(() => {
      console.log("Post deleted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
};
</script>
