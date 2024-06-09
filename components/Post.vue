<script setup lang="ts">
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useConvexMutation, useConvexQuery } from "@convex-vue/core";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { useTimeAgo } from "@vueuse/core";
import { Heart } from "lucide-vue-next";
import { api } from "~/convex/_generated/api";
import CommentForm from "./CommentForm.vue";
import Comments from "./Comments.vue";
import type { Doc } from "~/convex/_generated/dataModel";

const props = defineProps<{
  post: (typeof api.posts.getPosts._returnType.page)[0];
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
const { data: numberOfLikes, isLoading: likesLoading } = useConvexQuery(
  api.posts.getPostLikes,
  {
    postId: props.post._id,
  },
);
const { mutate: likePost } = useConvexMutation(api.posts.likePost);

const { mutate: unLikePost } = useConvexMutation(api.posts.unlikePost);

const { data: isLiked } = useConvexQuery(api.posts.hasLikedPost, {
  postId: props.post._id,
});
</script>

<template>
  <Card
    class="relative mx-auto w-full bg-slate-100 dark:bg-zinc-900 dark:text-zinc-100 lg:w-1/3"
    v-if="!isLoading && !likesLoading"
  >
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
    <CardContent class="m-6 mx-auto space-y-4 overflow-y-auto">
      <NuxtImg
        :src="props.post.thumbnailUrl"
        loading="lazy"
        class="mx-auto max-h-[350px]"
      />
      <EditorContent :editor="editor" />
    </CardContent>
    <CardFooter class="flex w-full flex-col gap-8">
      <div class="flex w-full items-center gap-4">
        <CommentForm :post-id="post._id" />
        <span class="max-w-4 text-xs"
          >{{
            numberOfLikes == 1
              ? numberOfLikes + " like"
              : numberOfLikes + " likes"
          }}
        </span>
        <Button
          variant="ghost"
          size="icon"
          class="hover:bg-transparent"
          v-if="isLiked"
          @click="
            async () => {
              await unLikePost({ postLikeId: isLiked?._id! });
            }
          "
        >
          <Heart fill="red" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          class="hover:bg-transparent"
          v-else
          @click="
            async () => {
              await likePost({ postId: post._id });
            }
          "
        >
          <Heart />
        </Button>
      </div>
      <Comments :post-id="props.post._id" />
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
