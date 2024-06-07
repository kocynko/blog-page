import { createConvexVue } from "@convex-vue/core";

export default defineNuxtPlugin((nuxtApp) => {
  const convexVue = createConvexVue({
    convexUrl: useRuntimeConfig().public.convexUrl as string,
  });

  nuxtApp.vueApp.use(convexVue);
});
