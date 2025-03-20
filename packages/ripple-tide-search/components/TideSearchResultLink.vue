<script setup lang="ts">
import { useSlots } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  url: string
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{}>()

const { emitRplEvent } = useRippleEvent('rpl-search-result', emit)

const slots = useSlots()

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: slots.default()[0].children
    },
    { global: true }
  )
}
</script>

<template>
  <RplTextLink @click="handleClick">
    <slot />
  </RplTextLink>
</template>
