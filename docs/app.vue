<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      tagPosition: 'bodyClose',
      src: 'https://www.googletagmanager.com/gtag/js?id=G-JHL6XDTXK0',
      async: true
    },
    {
      tagPosition: 'bodyClose',
      innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JHL6XDTXK0');`
    }
  ]
})
</script>
