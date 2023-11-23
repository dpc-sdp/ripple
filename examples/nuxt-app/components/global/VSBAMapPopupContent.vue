<template>
  <div class="vsba-map-popup-content" v-if="!hasMultiple">
    <p class="rpl-type-p-small">
      {{ selectedFeature[0].field_about_project_processed[0] }}
    </p>
    <RplTextLink
      class="rpl-type-p-small rpl-u-margin-t-4"
      :url="formatUrl(selectedFeature[0].url[0])"
    >
      View page
    </RplTextLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  selectedFeature: any
}
const props = withDefaults(defineProps<Props>(), {})

const hasMultiple = computed(() => {
  return (
    Array.isArray(props.selectedFeature) && props.selectedFeature.length > 1
  )
})

const formatUrl = (str) => str.replace(/\/site-(\d+)/, '')

const url = computed(() => {
  if (!hasMultiple && props.selectedFeature[0].url) {
    return props.selectedFeature[0].url[0].replace(/\/site-(\d+)/, '')
  }
  return false
})
</script>

<style>
.vsba-map-popup-content {
  display: flex;
  flex-direction: column;
}
</style>
