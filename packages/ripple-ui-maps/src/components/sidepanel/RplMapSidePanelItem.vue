<template>
  <component
    :is="el"
    :class="{
      'rpl-map-side-panel__item': true,
      'rpl-map-side-panel__item--active': activeId === data?.id
    }"
  >
    <div
      v-if="$slots.meta"
      class="rpl-map-side-panel__item-meta rpl-type-p-small"
    >
      <slot name="meta"></slot>
    </div>
    <RplButton
      variant="none"
      class="rpl-map-side-panel__item-title rpl-type-p-large-fixed"
      @click="handleClick"
    >
      {{ title }}
    </RplButton>
    <slot></slot>
    <div
      v-if="$slots.footer"
      class="rpl-map-side-panel__item-footer rpl-type-p-small"
    >
      <slot name="footer"></slot>
    </div>
  </component>
</template>
<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core/vue'
import { rplEventPayload, useRippleEvent } from '@dpc-sdp/ripple-ui-core'

interface Props {
  el?: string
  title: string
  activeId?: string | number
  data?: any
}

const props = withDefaults(defineProps<Props>(), {
  el: 'li',
  activeId: undefined,
  data: undefined
})

const emit = defineEmits<{
  (e: 'click', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-map-side-panel', emit)

const handleClick = () => {
  emitRplEvent('click', { action: 'click', value: props.data })
}
</script>
