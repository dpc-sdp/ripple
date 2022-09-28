<script setup lang="ts">
import type { TideLandingPageComponent } from './../../types'
interface Props {
  components: TideLandingPageComponent[]
}
defineProps<Props>()
</script>

<template>
  <LazyRplLayoutPageComponent
    v-for="cmp in components"
    :key="`component-${cmp.id}`"
    :data-component-id="cmp.id"
    :data-component-type="cmp.component"
    :class="$attrs.class"
  >
    <component :is="cmp.component" v-bind="cmp.props"></component>
  </LazyRplLayoutPageComponent>
</template>
