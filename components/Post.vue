<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Heart } from "lucide-vue-next";
import type { Doc } from "~/convex/_generated/dataModel";
import CommentForm from "./CommentForm.vue";
import Comments from "./Comments.vue";
import { useTimeAgo } from "@vueuse/core";
import { useConvexQuery } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";

const props = defineProps<{
  post: Doc<"posts">;
  postUser: Doc<"users">;
}>();

const editor = new Editor({
  content: props.post.text,
  extensions: [StarterKit],
  editable: false,
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert max-w-none focus:outline-none  rounded max-h-[350px]",
    },
  },
});
const timeAgo = useTimeAgo(props.post._creationTime, {
  updateInterval: 30_000,
});

const { data: currentUser, isLoading } = useConvexQuery(api.users.current, {});
</script>

<template>
  <li>
    <Card class="relative w-full" v-if="!isLoading">
      <DeletePostButton
        :post-id="post._id"
        v-if="post.user_id === currentUser?._id"
      />
      <CardHeader class="pb-0">
        <div class="flex items-center gap-2">
          <NuxtImg
            :src="props.postUser.profilePicture"
            class="h-16 w-16 rounded-full"
          />
          <div>
            <h4 class="text-2xl">{{ props.postUser.name }}</h4>
            <span class="text-xs">{{ timeAgo }}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent class="m-6 overflow-y-auto pl-0">
        <EditorContent :editor="editor" />
      </CardContent>
      <CardFooter class="flex flex-col gap-2">
        <div class="flex w-full items-center gap-4">
          <CommentForm :post-id="post._id" />
          <Heart v-if="false" :size="20" fill="" />
          <Heart v-else :size="20" fill="none" />
        </div>
        <Comments :post-id="props.post._id" />
      </CardFooter>
    </Card>
  </li>
</template>

<style lang="scss">
/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }
}

.content {
  padding: 1rem 0 0;

  h3 {
    margin: 1rem 0 0.5rem;
  }

  pre {
    border-radius: 5px;
    color: #333;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }
}
</style>
