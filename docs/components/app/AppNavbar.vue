<script lang="ts" setup>
const { title, version, socials } = useAppConfig()
const { data: navigation } = await useAsyncData('equal', () => {
  return queryContent('/').where({ pinned: true }).find()
})

</script>

<template>
  <header class="flex justify-between px-6 py-6 mx-auto max-w-full lg:max-w-7xl">
    <!-- Logo -->
    <a aria-current="page" href="/" class="router-link-active router-link-exact-active flex items-center"
      aria-label="false"><img class="w-8" src="/img/ripple-logo.png" width="100" />
      <span class="flex text-sm font-bold mx-2 dark:text-white">
        {{ title }}
      </span>
      <span class="flex text-xs text-gray-700 dark:text-gray-400">v{{ version }}</span>
    </a>
    <div class="flex justify-between max-w-4xl mx-auto items-center">
      <!-- Navigation -->
      <div class="text-primary-700 dark:text-gray-200 rpl-type-label-small ">
        <NuxtLink v-for="link of navigation" :key="link._path" :to="link._path" active-class="rpl-type-weight-bold"
          class="mr-6">
          {{ link.navigation?.title || link.title }}
        </NuxtLink>
      </div>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 transition text-primary-500">
      <a v-if="socials?.github" :href="`https://github.com/${socials?.github}`" title="Twitter"
        class="text-gray-900 dark:text-gray-200">
        <Icon name="fa-brands:github" />
      </a>
      <ColorModeSwitch class="text-gray-900 dark:text-gray-200" />
    </div>
  </header>
</template>
