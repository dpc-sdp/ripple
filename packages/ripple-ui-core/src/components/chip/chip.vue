<script lang="ts">
export default { name: 'RplChip' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplChipVariants } from './constants'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

defineProps({
  variant: {
    type: String as PropType<typeof RplChipVariants[number]>,
    default: RplChipVariants[0]
  },
  label: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    default: '#'
  }
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-chip/click', payload)
}
</script>

<template>
  <a
    :class="`rpl-chip rpl-chip--${variant} rpl-type-label rpl-u-focusable`"
    :href="url"
    @click="onClick()"
    >{{ label }}</a
  >
</template>

<style src="./chip.css" />
