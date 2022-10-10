<script lang="ts">
export default { name: 'RplExpandable' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  animateClosing,
  animateOpening
} from '../../composables/useAnimateHeight'

interface Props {
  expanded?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false,
  class: ''
})

const containerRef = ref(null)

watch(
  () => props.expanded,
  (isExpanded, wasExpanded) => {
    // Was closed, is opening
    if (!wasExpanded && isExpanded) {
      if (containerRef.value) {
        animateOpening(containerRef.value)
      }
    }
    // Was open, is closing
    else if (wasExpanded && !isExpanded) {
      if (containerRef.value) {
        animateClosing(containerRef.value)
      }
    }
  }
)
</script>

<template>
  <div
    ref="containerRef"
    :class="`expandable ${expanded ? 'isExpanded' : ''} ${props.class}`"
    role="region"
  >
    <slot />
  </div>
</template>

<style>
.expandable {
  height: 0;
  overflow: hidden;
  transition: height var(--rpl-motion-speed-8) ease-out;
}

.isExpanded {
  height: auto;
}
</style>
