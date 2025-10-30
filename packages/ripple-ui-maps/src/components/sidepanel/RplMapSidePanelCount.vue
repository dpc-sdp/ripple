<template>
  <div class="rpl-map-side-panel__count">
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <p class="rpl-type-label-small">
        Displaying {{ pagingStart }}-{{ pagingEnd }} of {{ totalResults
        }}{{ maxResultsExceededMarker }} results
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  pagingStart: number
  pagingEnd: number
  totalResults: number
  maxResults?: number | null
}

const props = withDefaults(defineProps<Props>(), {
  maxResults: null
})

const maxResultsExceededMarker = computed(() => {
  if (!props.maxResults) {
    return ''
  }

  return props.totalResults >= props.maxResults ? '+' : ''
})
</script>
