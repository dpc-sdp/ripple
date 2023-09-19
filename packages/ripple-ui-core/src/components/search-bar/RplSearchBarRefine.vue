<script lang="ts">
export default {
  name: 'RplSearchBarRefine'
}
</script>

<script setup lang="ts">
interface Props {
  expanded?: boolean
}

withDefaults(defineProps<Props>(), {
  expanded: false
})
</script>

<template>
  <button
    :aria-expanded="expanded"
    :class="{
      'rpl-search-bar-refine': true,
      'rpl-search-bar-refine--expanded': expanded,
      'rpl-u-focusable-inline': true
    }"
  >
    <span class="rpl-type-label rpl-type-weight-bold">
      <slot> Refine search </slot>
    </span>
    <RplIcon name="icon-chevron-down"></RplIcon>
  </button>
</template>

<style src="./RplSearchBarRefine.css" />
