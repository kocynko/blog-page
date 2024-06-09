<script setup lang="ts">
import { FormField, FormItem } from "@/components/ui/form";
import { useConvexMutation } from "@convex-vue/core";
import { toTypedSchema } from "@vee-validate/zod";
import { Loader2 } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";
import { api } from "~/convex/_generated/api";

const { isLoading, mutate, error } = useConvexMutation(api.posts.createPost);
const generateUploadUrl = useConvexMutation(api.posts.generateUploadUrl);

const MAX_FILE_SIZE = 5000000;

const props = defineProps({
  onUpload: {
    type: Function || Boolean,
    default: () => {},
  },
});
// function that check filename if it is an image .png .jpg .jpeg
const checkFileType = (file: File) => {
  const allowedExtensions = /(\.png|\.jpeg|\.jpg)$/i;
  return allowedExtensions.test(file.name);
};
const schema = z.object({
  tiptap: z
    .string()
    .min(1, "Content is required")
    .default("<h1>I love developing with vue</h1>"),
  file: z
    .instanceof(File)
    .refine(
      (file) => checkFileType(file),
      "Only .png, .jpg, .jpeg formats are supported.",
    ),
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});

const onSubmit = form.handleSubmit(async (values) => {
  const url = await generateUploadUrl.mutate({});
  const result = await fetch(url as string, {
    method: "POST",
    headers: { "Content-Type": values.file.type },
    body: values.file,
  });
  const { storageId } = await result.json();
  await mutate({
    text: values.tiptap,
    storageId,
  });
  props.onUpload();
  form.resetForm();
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
    <FormField v-slot="{ handleChange, handleBlur }" name="file">
      <FormItem>
        <FormLabel>Thumbnail picture</FormLabel>
        <FormControl>
          <Input type="file" @change="handleChange" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" :disabled="isLoading" class="flex items-center gap-1">
      <Loader2 class="animate-spin" v-if="isLoading" />
      <span v-if="isLoading">Creating post</span>
      <span v-else>Create post</span>
    </Button>
  </form>
</template>
