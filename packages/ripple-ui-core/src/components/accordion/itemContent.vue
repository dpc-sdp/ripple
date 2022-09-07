<script lang="ts">
export default { name: 'RplAccordionItemContent' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { animateClosing, animateOpening } from '../../composables/useAnimateHeight'

interface Props {
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false
})

const containerRef = ref(null)

watch(() => props.expanded, (isExpanded, wasExpanded) => {
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
})
</script>

<template>
  <div
    ref="containerRef"
    class="rpl-accordion__item-content"
    role="region"
  >
    <slot />
  </div>
</template>
