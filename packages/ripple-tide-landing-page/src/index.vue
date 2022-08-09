<template>
  <div class="rpl-grid">
    <DynamicComponents
      v-if="page.headerComponents?.length > 0"
      :components="page.headerComponents"
      class="rpl-col-12"
    />
    <DynamicComponents
      v-if="page.bodyComponents?.length > 0"
      class="rpl-u-margin-t-9 rpl-u-margin-b-9 rpl-col-9"
      :components="page.bodyComponents"
    />
  </div>
</template>

<script setup lang="ts">
import type TideLandingPagePage from './../types'
import DynamicComponents from './components/DynamicComponents.vue'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
