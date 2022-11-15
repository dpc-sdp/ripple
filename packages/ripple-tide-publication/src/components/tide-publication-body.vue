<script lang="ts">
export default { name: 'TidePublicationBody' }
</script>

<template>
  <div v-if="details" class="tide-publication__details rpl-u-margin-t-9">
    <RplDescriptionList :items="processed"></RplDescriptionList>
  </div>
  <TideDynamicComponents
    v-if="components?.length > 0"
    :components="components"
  ></TideDynamicComponents>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'

const props =
  defineProps<{
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
    if (key === 'date') {
      const published = new Date(props.details.date)
      val = new Intl.DateTimeFormat('default', { dateStyle: 'long' }).format(
        published
      )
    }
    out.push({
      term: key[0].toUpperCase() + key.substring(1) + ':',
      description: val
    })
  }
  return out
})
</script>
