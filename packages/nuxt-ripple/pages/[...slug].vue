<template>
  <TideContentPage></TideContentPage>
</template>

<script>
export default {
  name: 'TideWrapper'
}
</script>

<script setup>
import { definePageMeta } from '#imports'

// After upgrading to nuxt 3.5.2, we were seeing alot of console errors
// When fetching assets from the /public folder, this route was getting hit too.
// This is only an issue if the /public folder is inside a layer
//
// TODO This should be revisited as it is likely a bug in Nuxt
definePageMeta({
  validate: async (route) => {
    const assetsPaths = [
      '/assets/',
      '/img/',
      '/android-chrome-192x192.png',
      '/android-chrome-512x512.png',
      '/apple-touch-icon.png',
      '/browserconfig.xml',
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/favicon.ico',
      '/mstile-150x150.png',
      '/safari-pinned-tab.svg',
      '/site.webmanifest'
    ]

    return !assetsPaths.some((substr) => route.fullPath.startsWith(substr))
  }
})
</script>
