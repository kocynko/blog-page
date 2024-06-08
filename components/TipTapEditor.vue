<template>
  <div
    v-if="editor"
    class="flex flex-wrap justify-evenly gap-2 rounded border border-black p-2"
  >
    <Button
      type="button"
      @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="[editor.isActive('bold') ? 'bg-zinc-500' : '']"
    >
      bold
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="[editor.isActive('italic') ? 'bg-zinc-500' : '']"
    >
      italic
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="[editor.isActive('strike') ? 'bg-zinc-500' : '']"
    >
      strike
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="[editor.isActive('code') ? 'bg-zinc-500' : '']"
    >
      code
    </Button>
    <Button @click="editor.chain().focus().unsetAllMarks().run()" type="button">
      clear marks
    </Button>
    <Button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().setParagraph().run()"
      :class="{ 'is-active': editor.isActive('paragraph') }"
    >
      paragraph
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      h1
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
    >
      h2
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
    >
      h3
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
    >
      h4
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
    >
      h5
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
    >
      h6
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      bullet list
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      ordered list
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      code block
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      blockquote
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().setHorizontalRule().run()"
    >
      horizontal rule
    </Button>
    <Button type="button" @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      undo
    </Button>
    <Button
      type="button"
      @click="editor.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      redo
    </Button>
  </div>
  <editor-content :editor="editor" />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
  content: props.modelValue,
  onUpdate({ editor }) {
    emit("update:modelValue", editor.getHTML());
  },
  extensions: [StarterKit],
  editorProps: {
    attributes: {
      class:
        "border border-black p-2 text-start rounded min-h-32 h-full prose dark:prose-invert prose-sm sm:prose-base  focus:outline-none max-w-none",
    },
  },
});
</script>
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
