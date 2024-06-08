<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart } from "lucide-vue-next";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Comment from "./Comment.vue";
import CommentForm from "./CommentForm.vue";
import StarterKit from "@tiptap/starter-kit";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  post: Doc<"posts">;
}>();

const editor = new Editor({
  content: props.post.text,
  extensions: [StarterKit],
  editable: false,
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert max-w-none focus:outline-none rounded mx-4 mt-8 py-2",
    },
  },
});
</script>

<template>
  <Card class="w-full space-y-8">
    <CardContent class="max-h-[350px] overflow-y-auto">
      <EditorContent :editor="editor" />
    </CardContent>
    <CardFooter class="flex flex-col items-center justify-between gap-4">
      <div class="flex w-full items-center justify-center gap-4">
        <CommentForm />
        <Heart v-if="false" :size="20" fill="" />
        <Heart v-else:size="20" fill="none" />
      </div>
      <Comment />
    </CardFooter>
  </Card>
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
