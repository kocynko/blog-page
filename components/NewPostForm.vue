<script setup lang="ts">
import { FormField, FormItem } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const props = defineProps({
  onUpload: {
    type: Function || Boolean,
    default: () => {},
  },
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(2).max(50).default(""),
    file: z.instanceof(File),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const onSubmit = form.handleSubmit(async (values) => {
  props.onUpload();
});
</script>

<template>
  <form @submit="onSubmit" class="w-full space-y-6">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <TipTapEditor />
      </FormItem>
    </FormField>

    <Button type="submit">Create Post</Button>
  </form>
</template>
