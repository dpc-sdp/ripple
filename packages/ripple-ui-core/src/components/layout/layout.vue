<script lang="ts">
export default { name: 'RplLayout' }
</script>

<script setup lang="ts">
import { Comment, Fragment, computed, useSlots, isVNode } from 'vue'

interface Props {
  background?: 'default' | 'alt'
}

withDefaults(defineProps<Props>(), {
  background: 'default'
})

// Currently in Vue 3 there is no standard way to check if a slot has anything in it because
// empty fragments and comments will still appear in the data returned from `useSlots`
// We need to recursively check if each fragments contain any actual rendered nodes
// Solution taken from: https://github.com/vuejs/rfcs/discussions/453
const getSlotContent = (vNodes) => {
  if (!vNodes) return null
  return vNodes.some((child) => {
    if (!isVNode(child)) return true
    if (child.type === Comment) return false
    if (child.type === Fragment && !getSlotContent(child.children)) return false
    return true
  })
    ? vNodes
    : null
}

const $slots = useSlots()

const hasSidebar = computed(() => {
  return $slots.sidebar && !!getSlotContent($slots.sidebar())
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
    <section v-if="$slots.aboveBody" id="rpl-above-body">
      <slot name="aboveBody"></slot>
    </section>
    <div class="rpl-layout__body-wrap">
      <div class="rpl-container">
        <div class="rpl-grid rpl-grid--no-row-gap rpl-layout__body">
          <main
            id="rpl-main"
            :class="{
              'rpl-col-12': true,
              'rpl-col-7-m': hasSidebar
            }"
            class="rpl-layout__main"
          >
            <slot name="body" :hasSidebar="hasSidebar"> </slot>
          </main>
          <aside
            v-if="$slots.sidebar"
            id="rpl-sidebar"
            class="rpl-layout__sidebar rpl-col-4-m rpl-col-start-9-m rpl-col-12"
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
