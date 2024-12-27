<script setup lang="ts">
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  label?: string
  appliedTally: number | undefined
  onClick: (data: rplEventPayload) => void
  expanded: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Filters'
})

const appliedLabel = computed(() => {
  if (props.appliedTally) {
    return `${props.label} ${props.appliedTally} selected`
  }

  return props.label
})

const handleClick = () => props.onClick({ text: appliedLabel.value })
</script>

<template>
  <div class="tide-search-filter-toggle">
    <RplSearchBarRefine :expanded="expanded" @click="handleClick">
      {{ label }}
    </RplSearchBarRefine>
    <span
      v-if="appliedTally"
      class="tide-search-filter-toggle__tally rpl-type-label rpl-type-weight-regular"
    >
      {{ appliedTally }} selected
    </span>
  </div>
</template>

<style>
.tide-search-filter-toggle {
  display: flex;
  gap: var(--rpl-sp-4);
}
</style>
