<script lang="ts">
export default { name: 'RplAccordionItemContent' }
</script>

<script setup lang="ts">
import { animateClosing, animateOpening } from '../../composables/useAnimateHeight'
import { ref, watch } from 'vue';

interface Props {
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false
})

const containerRef = ref(null)

watch(() => props.expanded, (wasExpanded, isExpanded) => {
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
    class="rpl-accordion__item-content"
    role="region"
    ref="containerRef"
  >
    <slot />
  </div>
</template>
