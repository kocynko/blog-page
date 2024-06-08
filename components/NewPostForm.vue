<script setup lang="ts">
import { FormField, FormItem } from "@/components/ui/form";
import { useConvexMutation } from "@convex-vue/core";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { api } from "~/convex/_generated/api";

const createDocument = useConvexMutation(api.posts.createPost);

const props = defineProps({
  onUpload: {
    type: Function || Boolean,
    default: () => {},
  },
});
const schema = z.object({
  tiptap: z
    .string()
    .min(1, "Content is required")
    .default("<h1>I love developing with vue</h1>"),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = form.handleSubmit(async (values) => {
  await createDocument.mutate({
    text: values.tiptap,
  });
  form.resetForm()
  props.onUpload();
});
</script>

<template>
  <form @submit="onSubmit" class="w-full space-y-6">
    <FormField v-slot="{ value, handleChange }" name="tiptap">
      <FormItem>
        <TipTapEditor :modelValue="value" @update:modelValue="handleChange" />
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Create Post</Button>
  </form>
</template>
