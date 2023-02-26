<script setup lang="ts">
import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

const RplChipVariants = ['default', 'reverse']

interface Props {
  variant?: (typeof RplChipVariants)[number]
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
    :class="`rpl-chip rpl-chip--${variant} rpl-type-label rpl-u-focusable-block rpl-u-screen-only`"
    :href="url"
    @click="onClick()"
    >{{ label }}</a
  >
</template>

<style src="./RplChip.css" />
