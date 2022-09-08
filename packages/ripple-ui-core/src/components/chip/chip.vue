<script lang="ts">
export default { name: 'RplChip' }
</script>

<script setup lang="ts">
import { RplChipVariants } from './constants'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

interface Props {
  variant?: typeof RplChipVariants[number]
  label?: string
  url?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: '',
  url: '#'
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
