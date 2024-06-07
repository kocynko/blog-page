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
const isLiked = ref(false);
const content = ref(`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
      `);
const editor = new Editor({
  content: content.value,
  extensions: [StarterKit],
  editable: false,
  editorProps: {
    attributes: {
      class:
        "prose dark:prose-invert max-w-none focus:outline-none rounded mx-4 mt-8 px-3 py-2",
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
        <Heart v-if="isLiked" :size="20" fill="" />
        <Heart v-else:size="20" fill="none" />
      </div>
      <Comment />
    </CardFooter>
  </Card>
</template>

<
