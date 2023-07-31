<script setup lang="ts">
import { Comment, Fragment, computed, useSlots, isVNode } from 'vue'
import RplLayoutBackToTop from './RplLayoutBackToTop.vue'
import RplLayoutSkipLink from './RplLayoutSkipLink.vue'

interface Props {
  background?: 'default' | 'alt'
  showBackToTop?: boolean
  direction?: string
  language?: string
}

withDefaults(defineProps<Props>(), {
  background: 'default',
  showBackToTop: true,
  direction: undefined,
  language: undefined
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

const hasBreadcrumbs = computed(() => {
  return $slots.breadcrumbs && !!getSlotContent($slots.breadcrumbs())
})

const aboveBodyId = 'rpl-above-body'
const belowBodyId = 'rpl-below-body'
const mainId = 'rpl-main'
const skipLinksId = 'rpl-skip-links'
</script>

<template>
  <div>
    <div :id="skipLinksId">
      <RplLayoutSkipLink :targetId="$slots.aboveBody ? aboveBodyId : mainId"
        >Skip to main content</RplLayoutSkipLink
      >
    </div>
    <div
      :class="`rpl-layout rpl-layout--${background} rpl-layout--${direction}`"
    >
      <slot name="aboveHeader"></slot>
      <div class="rpl-layout__container">
        <header
          v-if="$slots.primaryNav"
          id="rpl-header"
          class="rpl-layout__header"
        >
          <slot name="primaryNav"></slot>
          <div
            v-if="hasBreadcrumbs"
            id="rpl-below-header"
            class="rpl-u-margin-t-1"
          >
            <slot name="breadcrumbs"></slot>
          </div>
        </header>
        <section v-if="$slots.aboveBody" :id="aboveBodyId">
          <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs"></slot>
        </section>
        <div class="rpl-layout__body-wrap">
          <div class="rpl-container">
            <div class="rpl-grid rpl-grid--no-row-gap rpl-layout__body">
              <main
                :id="mainId"
                :class="{
                  'rpl-col-12': true,
                  'rpl-col-7-m': hasSidebar,
                  [`rpl-u-font-lang--${language}`]: language
                }"
                class="rpl-layout__main"
                :dir="direction"
              >
                <slot name="body" :hasSidebar="hasSidebar"></slot>
              </main>
              <aside
                v-if="hasSidebar"
                id="rpl-sidebar"
                class="rpl-layout__sidebar rpl-col-4-m rpl-col-start-9-m rpl-col-12"
              >
                <slot name="sidebar"></slot>
              </aside>
            </div>
          </div>
        </div>
        <section v-if="$slots.belowBody" :id="belowBodyId">
          <slot name="belowBody"></slot>
        </section>
        <RplLayoutBackToTop v-if="showBackToTop" topElementId="skipLinksId" />
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style src="./RplLayout.css" />
