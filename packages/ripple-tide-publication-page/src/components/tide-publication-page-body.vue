<script lang="ts">
export default { name: 'TidePublicationPageBody' }
</script>

<template>
  <TideDynamicComponents
    v-if="components?.length > 0"
    :components="components"
    :has-sidebar="false"
    :full-width="false"
  ></TideDynamicComponents>
</template>

<script setup lang="ts">
import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api'

interface Props {
  components: Array<TideDynamicPageComponent>
}

defineProps<Props>()
</script>
