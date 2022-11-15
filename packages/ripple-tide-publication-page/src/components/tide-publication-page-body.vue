<script lang="ts">
export default { name: 'TidePublicationPageBody' }
</script>

<template>
  <TideDynamicComponents
    v-if="components?.length > 0"
    :components="components"
  ></TideDynamicComponents>
</template>

<script setup lang="ts">
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'

defineProps<{
  components: Array<TideDynamicPageComponent>
}>()
</script>
