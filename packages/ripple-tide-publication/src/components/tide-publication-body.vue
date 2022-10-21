<script lang="ts">
export default { name: 'TidePublicationBody' }
</script>

<template>
  <RplDescriptionList :items="processed"></RplDescriptionList>
  <p class="rpl-type-label rpl-u-margin-t-6 rpl-u-margin-b-9">
    [ DYNAMIC COMPONENTS ]
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RplDescriptionList } from '@dpc-sdp/ripple-ui-core'
import { TideLandingPageComponent } from '@dpc-sdp/ripple-tide-landing-page'

const props =
  defineProps<{
    details: any
    components: Array<TideLandingPageComponent>
  }>()

const detailTerm = (str: string) =>
  str[0].toUpperCase() + str.substring(1) + ':'

const processed = computed(() => {
  let out = {}
  for (const [key, value] of Object.entries(props.details)) {
    if (key === 'date') {
      const published = new Date(props.details.date)
      out[detailTerm(key)] = new Intl.DateTimeFormat('default', {
        dateStyle: 'long'
      }).format(published)
    } else {
      out[detailTerm(key)] = value
    }
  }
  return [out]
})
</script>
