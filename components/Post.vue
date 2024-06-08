<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { Heart } from "lucide-vue-next";
import type { Doc } from "~/convex/_generated/dataModel";
import CommentForm from "./CommentForm.vue";
import Comments from "./Comments.vue";
import { useAuth, useUser } from "vue-clerk";

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
const { userId } = useAuth();
</script>

<template>
  <li>
    <Card class="relative w-full space-y-8">
      <DeletePostButton
        :post-id="post._id"
        v-if="post.tokenIdentifier.split('|')[1] === userId"
      />
      <CardContent class="max-h-[350px] overflow-y-auto">
        <EditorContent :editor="editor" />
      </CardContent>
      <CardFooter class="flex flex-col items-center justify-between gap-4">
        <div class="flex w-full items-center gap-4">
          <CommentForm :post-id="post._id" />
          <Heart v-if="false" :size="20" fill="" />
          <Heart v-else :size="20" fill="none" />
        </div>
        <Comments :post="props.post" />
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
