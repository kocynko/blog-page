import { type Resources } from "@clerk/types";
import { createConvexVue } from "@convex-vue/core";
import { type Ref, computed, ref } from "vue";
import { clerkPlugin } from "vue-clerk/plugin";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(clerkPlugin, {
    fallbackRedirectUrl: "/",
    publishableKey: useRuntimeConfig().public.clerkKey as string,
  });

  const authState: {
    isLoading: Ref<boolean>;
    session: Ref<Resources["session"]>;
  } = {
    isLoading: ref(true),
    session: ref(undefined),
  };
  nuxtApp.vueApp.config.globalProperties.$clerk.addListener((arg) => {
    authState.isLoading.value = false;
    authState.session.value = arg.session;
  });
  const convexVue = createConvexVue({
    convexUrl: useRuntimeConfig().public.convexUrl as string,
    auth: {
      isAuthenticated: computed(() => !!authState.session.value),
      isLoading: authState.isLoading,
      getToken: async ({ forceRefreshToken }) => {
        try {
          return await authState.session.value?.getToken({
            template: "convex",
            skipCache: forceRefreshToken,
          });
        } catch (error) {
          return null;
        }
      },
    },
  });
  nuxtApp.vueApp.use(convexVue);
});
