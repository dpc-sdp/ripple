<template>
  <TideLandingPage :site="site as any" :page="page as any">
    <template #sidebar>
      <TideSidebarSocialShare :page-title="page.title" />
    </template>
  </TideLandingPage>
</template>

<script setup lang="ts">
import page from '../test/fixtures/case/accordions-inpage-nav.json'
import { useTideSite } from '#imports'

const site = await useTideSite()
</script>
