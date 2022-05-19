<script lang="ts">
export default { name: 'RplChip' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplChipThemes } from './constants'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

defineProps({
  theme: {
    type: String as PropType<typeof RplChipThemes[number]>,
    default: RplChipThemes[0]
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
    :className="`rpl-chip rpl-chip--${theme}`"
    :href="url"
    @click="onClick()"
    >{{ label }}</a
  >
</template>

<style src="./chip.css" />
