<template>
  <div v-if="details" class="tide-publication__details">
    <RplDescriptionList :items="processed"></RplDescriptionList>
  </div>
  <TideDynamicComponents
    v-if="components?.length > 0"
    :components="components"
    :has-sidebar="false"
    :full-width="false"
  ></TideDynamicComponents>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TideDynamicPageComponent, formatDate } from '#imports'

const props = defineProps<{
  details: any
  components: Array<TideDynamicPageComponent>
}>()

interface RplDescriptionListItem {
  term: string
  description: any
}

const processed = computed(() => {
  const out: Array<RplDescriptionListItem> = []
  for (const [key, value] of Object.entries(props.details)) {
    let val = value
    if (val) {
      if (key === 'date') {
        const published = new Date(props.details.date)
        val = formatDate(published)
      }
      out.push({
        term: key[0].toUpperCase() + key.substring(1) + ':',
        description: val
      })
    }
  }
  return out
})
</script>
