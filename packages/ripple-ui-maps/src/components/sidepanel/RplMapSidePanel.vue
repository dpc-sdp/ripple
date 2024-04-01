<template>
  <div
    :class="{
      'rpl-map-side-panel': true,
      'rpl-map-side-panel--open': isOpen,
      'rpl-map-side-panel--right': panelLocation === 'right',
      'rpl-map-side-panel--busy': isBusy
    }"
    :style="`--local-map-side-panel-height: ${mapHeight}px`"
  >
    <div ref="scrollParentRef" class="rpl-map-side-panel__wrapper">
      <div class="rpl-map-side-panel__above-items">
        <slot v-if="totalResults" name="aboveItems">
          <RplMapSidePanelCount
            :pagingStart="pagingStart"
            :pagingEnd="pagingEnd"
            :totalResults="totalResults"
          />
        </slot>
      </div>

      <component :is="el" class="rpl-map-side-panel__items">
        <slot></slot>
      </component>

      <div class="rpl-map-side-panel__below-items">
        <slot name="belowItems">
          <RplPagination
            v-if="totalPages > 1"
            :currentPage="currentPage"
            :totalPages="totalPages"
            variant="simple"
            class="rpl-map-side-panel__pagination"
            @change="handlePageChange"
          />
        </slot>
      </div>
    </div>
    <RplButton
      v-if="showToggle"
      variant="none"
      class="rpl-map-side-panel__toggle"
      aria-label="Toggle side panel"
      @click="toggleSidePanel"
    >
      <RplIcon name="icon-chevron-right" />
    </RplButton>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { RplButton, RplIcon, RplPagination } from '@dpc-sdp/ripple-ui-core/vue'
import RplMapSidePanelCount from './RplMapSidePanelCount.vue'
import { rplEventPayload, useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  el?: string
  mapHeight: number
  showToggle: boolean
  isStandalone: boolean
  isBusy: boolean
  panelLocation?: 'left' | 'right'
  pagingStart: number
  pagingEnd: number
  totalResults: number
  totalPages: number
  currentPage: number
}

const props = withDefaults(defineProps<Props>(), {
  el: 'ul',
  panelLocation: 'left',
  isStandalone: false,
  showToggle: false
})

const isOpen = ref(true)
const scrollParentRef = ref(null)

const toggleSidePanel = () => (isOpen.value = !isOpen.value)

const emit = defineEmits<{
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-side-panel', emit)

const handlePageChange = async (event) => {
  emitRplEvent('paginate', event, { global: true })

  if (props.isStandalone) {
    if (scrollParentRef.value) {
      const elementTop =
        scrollParentRef.value.getBoundingClientRect().top + window.scrollY
      const navHeight = 70

      window.scrollTo({
        top: elementTop - navHeight,
        behavior: 'smooth'
      })
    }
  } else {
    const scrollParent = scrollParentRef.value

    if (scrollParent) {
      await nextTick()
      scrollParent.scrollTo({
        top: 0,
        left: 0
      })
    }
  }
}
</script>

<style src="./RplMapSidePanel.css"></style>
