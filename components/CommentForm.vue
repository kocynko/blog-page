<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Heart } from 'lucide-vue-next'

const formSchema = toTypedSchema(z.object({
  text: z.string().min(2).max(100),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>

<template>
  <form class="w-full flex gap-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="text">
      <FormItem class="flex-1">
        <FormControl>
          <Input type="text" placeholder="Comment" v-bind="componentField" />
        </FormControl>
      </FormItem>
    </FormField>
    <Button type="submit">
      Comment
    </Button>
  </form>
</template>