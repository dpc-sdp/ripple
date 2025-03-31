<script setup lang="ts">
import { useRippleEvent, useSlotContent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  url: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), { text: '' })

const emit = defineEmits<{}>()

const { emitRplEvent } = useRippleEvent('rpl-search-result', emit)

const slotText = useSlotContent()

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: slotText || props.text
    },
    { global: true }
  )
}
</script>

<template>
  <RplTextLink :url="url" :text="text" @click="handleClick">
    <slot />
  </RplTextLink>
</template>
