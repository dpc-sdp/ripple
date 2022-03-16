<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import COREICONS from './core.json'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const core = computed(() => COREICONS.includes(props.name))
</script>

<template>
  <svg
    v-if="core"
    class="rpl-icon"
    :class="`rpl-icon--${name}`"
    aria-hidden="true"
  >
    <use :xlink:href="`#rpl-icon--${name}`" />
  </svg>
  <component
    :is="
      defineAsyncComponent(() =>
        import(`../../assets/icons/custom/${name}.svg`)
      )
    "
    v-else
    class="rpl-icon"
    :class="`rpl-icon--${name}`"
    aria-hidden="true"
  />
</template>

<style>
@import './icon.css';
</style>
