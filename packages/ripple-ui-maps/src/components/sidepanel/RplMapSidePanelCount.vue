<template>
  <div class="rpl-map-side-panel__count">
    <slot
      :pagingStart="pagingStart"
      :pagingEnd="pagingEnd"
      :totalResults="totalResults"
    >
      <p class="rpl-type-label-small">
        Displaying {{ pagingStart }}-{{ pagingEnd }} of {{ totalResults
        }}{{ excessResultsMarker }} results
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
  excessResults?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  excessResults: false
})

const excessResultsMarker = computed(() => (props.excessResults ? '+' : ''))
</script>
