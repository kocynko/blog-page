<script setup lang="ts">
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Heart } from "lucide-vue-next";
import { useConvexMutation } from "@convex-vue/core";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

const props = defineProps<{
  postId: Id<"posts">;
}>();

const createComment = useConvexMutation(api.comments.createComment);

const formSchema = toTypedSchema(
  z.object({
    text: z.string().min(2).max(100),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  createComment.mutate({
    text: values.text,
    postId: props.postId,
  });
  form.resetForm()
});
</script>

<template>
  <form class="flex w-full gap-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="text">
      <FormItem class="flex-1">
        <FormControl>
          <Input type="text" placeholder="Comment" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <Button type="submit"> Comment </Button>
  </form>
</template>
