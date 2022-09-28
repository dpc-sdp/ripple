<script lang="ts">
export default { name: 'RplLayout' }
</script>

<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface Props {
  background: 'default' | 'alt'
}

withDefaults(defineProps<Props>(), {
  background: 'default'
})

const $slots = useSlots()
const mainCols = computed(() => {
  if ($slots.sidebar) {
    return ['rpl-col-12', 'rpl-col-7-l']
  }
  return 'rpl-col-12'
})
</script>

<template>
  <div :class="`rpl-layout rpl-layout--${background}`">
    <slot name="aboveHeader"></slot>
    <header v-if="$slots.primaryNav" id="rpl-header" class="rpl-layout__header">
      <slot name="primaryNav"></slot>
      <div
        v-if="$slots.breadcrumbs"
        id="rpl-below-header"
        class="rpl-u-margin-t-1"
      >
        <slot name="breadcrumbs"></slot>
      </div>
    </header>
    <section
      v-if="$slots.aboveBody"
      id="rpl-above-body"
      class="rpl-u-margin-t-1"
    >
      <slot name="aboveBody"></slot>
    </section>
    <div class="rpl-layout__body-wrap">
      <div class="rpl-container">
        <div class="rpl-grid rpl-layout__body">
          <main id="rpl-main" :class="mainCols" class="rpl-layout__main">
            <slot name="body"> </slot>
          </main>
          <aside
            v-if="$slots.sidebar"
            id="rpl-sidebar"
            class="rpl-layout__sidebar rpl-col-4-l rpl-col-start-9-l rpl-col-12"
          >
            <slot name="sidebar"> </slot>
          </aside>
        </div>
      </div>
    </div>
    <section v-if="$slots.belowBody">
      <slot name="belowBody"> </slot>
    </section>
    <slot name="footer"> </slot>
  </div>
</template>

<style src="./layout.css" />
