<script setup lang="ts">
import { computed, ref } from 'vue'
import { useComputedSpeed } from '../../composables/useComputedSpeed'

interface Props {
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  expanded: false
})

const containerRef = ref(null)
const duration = useComputedSpeed(containerRef, '--rpl-motion-speed-9', 420)

function onBeforeEnter(el: any) {
  el.style.height = '0px'
}

// called one frame after the element is inserted.
// use this to start the entering animation.
function onEnter(el: any, done: Function): void {
  el.style.height = `${el.scrollHeight}px`

  // call the done callback to indicate transition end
  setTimeout(done, duration.value)
}

function onAfterEnter(el: any) {
  el.style.height = 'auto'
  el.style.overflow = 'initial'
}

function onBeforeLeave(el: any) {
  el.style.height = `${el.getBoundingClientRect().height}px`
  el.style.overflow = 'hidden'
}

// called when the leave transition starts.
// use this to start the leaving animation.
function onLeave(el: any, done: Function) {
  el.style.height = '0px'

  // call the done callback to indicate transition end
  setTimeout(done, duration.value)
}

const classes = computed(() => ({
  'rpl-expandable': true,
  'rpl-expandable--open': props.expanded
}))
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
  >
    <div v-show="expanded" ref="containerRef" :class="classes" role="region">
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

.rpl-expandable--open {
  height: auto;
  overflow: initial;
}
</style>
