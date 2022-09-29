<script setup lang="ts">
import type { TideLandingPageComponent } from './../../types'
import { RplPageComponent } from '@dpc-sdp/ripple-ui-core'
interface Props {
  components: TideLandingPageComponent[]
}
defineProps<Props>()
</script>

<template>
  <RplPageComponent
    v-for="cmp in components"
    :key="`component-${cmp.id}`"
    :data-component-id="cmp.id"
    :data-component-type="cmp.component"
    :class="$attrs.class"
  >
    <component :is="cmp.component" v-bind="cmp.props"></component>
  </RplPageComponent>
</template>
