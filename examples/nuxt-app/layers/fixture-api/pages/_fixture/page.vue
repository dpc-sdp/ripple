<template>
  <TideLandingPage :site="site as any" :page="page as any">
    <template #sidebar>
      <TideSidebarSocialShare :page-title="page.title" />
    </template>
  </TideLandingPage>
</template>

<script setup lang="ts">
import site from '../../test/fixtures/site/vic.json'
import page from '../../test/fixtures/page/accordions-inpage-nav.json'
</script>
