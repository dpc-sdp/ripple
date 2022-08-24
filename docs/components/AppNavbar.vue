<script lang="ts" setup>
const { data: navigation } = await useAsyncData('navigation', () =>
  fetchContentNavigation(queryContent('pages').where({ pinned: true }))
)
const theme = useTheme()
</script>

<template>
  <header class="flex justify-between px-4 py-4 mx-auto sm:px-8">
    <!-- Logo -->
    <a
      aria-current="page"
      href="/"
      class="router-link-active router-link-exact-active flex items-center"
      aria-label="false"
      ><img class="w-8" src="/img/ripple-logo.png" width="100" />
      <span class="flex text-sm font-bold mx-2 dark:text-white">
        Ripple 2
      </span></a
    >
    <div class="flex justify-between max-w-4xl mx-auto">
      <!-- Navigation -->
      <div class="text-primary-700 dark:text-primary-200">
        <NuxtLink
          v-for="link of navigation"
          :key="link._path"
          :to="link._path"
          active-class="font-bold"
          class="mr-6"
        >
          {{ link.title }}
        </NuxtLink>
      </div>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 transition text-primary-500">
      <a
        v-if="theme.socials?.twitter"
        :href="`https://twitter.com/${theme.socials?.twitter}`"
        title="Twitter"
        class="
          dark:text-primary-100
          hover:text-primary-700
          dark:hover:text-primary-300
        "
        ><Icon name="fa-brands:twitter"
      /></a>
      <a
        v-if="theme.socials?.github"
        :href="`https://github.com/${theme.socials?.github}`"
        title="Twitter"
        class="
          text-gray-900 dark:text-gray-200
        "
        ><Icon name="fa-brands:github"
      /></a>
      <ColorModeSwitch
        class="
text-gray-900 dark:text-gray-200
        "
      />
    </div>
  </header>
</template>
