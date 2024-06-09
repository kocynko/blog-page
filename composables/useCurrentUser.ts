import { ref, computed, watchEffect } from "vue";
import { api } from "../convex/_generated/api";
import { useConvexQuery } from "@convex-vue/core";
import { useAuth } from "vue-clerk";
import type { Doc } from "~/convex/_generated/dataModel";

// Define a function to use the current user
export function useCurrentUser() {
  // Use Vue's ref to create reactive variables
  const isLoading = ref<Boolean | undefined>(true);
  const isAuthenticated = ref<Boolean | undefined>(false);
  const user = ref<Doc<"users"> | null>(null);

  // Get the authentication state
  const { isLoaded: authLoaded, isSignedIn: authState } = useAuth();

  // Use the query to fetch the current user
  const userQuery = useConvexQuery(api.users.current, {});

  // Watch for changes in the authentication state and user query
  watchEffect(() => {
    isLoading.value =
      !authLoaded.value || (authState.value && userQuery.data === null);
    isAuthenticated.value = authState.value && userQuery.data !== null;
    user.value = userQuery.data.value;
  });

  // Return the reactive state
  return {
    isLoading,
    isAuthenticated,
  };
}
