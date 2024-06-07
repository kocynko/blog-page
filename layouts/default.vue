<template>
  <div>
    <nav class="flex items-center justify-between p-4">
      <h1 class="text-2xl">Hello world</h1>
      <NewPostButton />
      <div class="flex items-center justify-between gap-3">
        Settings
        <ModeToggle />
      </div>
    </nav>
    <slot />
  </div>
</template>
