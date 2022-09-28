<template>
  <RplLayout :background="page.background">
    <template #aboveHeader>
      <slot name="aboveHeader"></slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav"></slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs"></slot>
    </template>
    <template #aboveBody>
      <DynamicComponents
        v-if="page.headerComponents?.length > 0"
        :components="page.headerComponents"
        class="rpl-col-12"
      />
    </template>
    <template #body>
      <DynamicComponents
        v-if="page.bodyComponents?.length > 0"
        :components="page.bodyComponents"
      />
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer"> </slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import type TideLandingPagePage from './../types'
import DynamicComponents from './components/DynamicComponents.vue'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
