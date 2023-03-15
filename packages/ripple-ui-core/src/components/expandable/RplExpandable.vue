<script setup lang="ts">
import { onMounted } from 'vue'
import { ref } from 'vue'

interface Props {
  expanded?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false,
  class: ''
})

const DEFAULT_DURATION = 420

const containerRef = ref(null)
const duration = ref(DEFAULT_DURATION)

onMounted(() => {
  duration.value =
    parseFloat(
      getComputedStyle(containerRef.value).getPropertyValue(
        '--rpl-motion-speed-9'
      )
    ) * 1000
})

function onBeforeEnter(el) {
  el.style.height = `0px`
}

// called one frame after the element is inserted.
// use this to start the entering animation.
function onEnter(el, done) {
  el.style.height = `${el.scrollHeight}px`

  // call the done callback to indicate transition end
  setTimeout(done, duration.value)
}

function onBeforeLeave(el) {
  el.style.height = `${el.getBoundingClientRect().height}px`
}

// called when the leave transition starts.
// use this to start the leaving animation.
function onLeave(el, done) {
  el.style.height = `0px`

  // call the done callback to indicate transition end
  setTimeout(done, duration.value)
}
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <div
      v-show="expanded"
      ref="containerRef"
      :class="`rpl-expandable ${expanded ? 'rpl-expandable--isExpanded' : ''} ${
        props.class
      }`"
      role="region"
    >
      <slot />
    </div>
  </Transition>
</template>

<style>
.rpl-expandable {
  overflow: hidden;
  transition: height var(--rpl-motion-speed-9) ease-out;

  @media print {
    /* Needs to override inline styles */
    display: block !important;
    height: auto !important;
  }
}
</style>
