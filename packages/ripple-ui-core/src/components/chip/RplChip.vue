<script setup lang="ts">
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

const RplChipVariants = ['default', 'reverse']

interface Props {
  variant?: (typeof RplChipVariants)[number]
  label?: string
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  label: '',
  url: '#'
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-chip', emit)

const onClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props.url,
      text: props.label
    },
    { global: true }
  )
}
</script>

<template>
  <RplLink
    :class="`rpl-chip rpl-chip--${variant} rpl-type-label rpl-u-focusable-block rpl-u-screen-only`"
    :url="url"
    @click="onClick"
  >
    {{ label }}
  </RplLink>
</template>

<style src="./RplChip.css" />
