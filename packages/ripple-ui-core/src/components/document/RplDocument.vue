<script setup lang="ts">
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import { useSlotContent } from '../../composables/useSlotContent'

interface Props {
  url: string
  openInNewWindow?: boolean
  download?: boolean
  globalEvents?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  openInNewWindow: false,
  download: undefined,
  globalEvents: true
})

const emit = defineEmits<{
  (e: 'download', payload: rplEventPayload & { action: 'download' }): void
}>()

const slotContent = useSlotContent('name')
const { emitRplEvent } = useRippleEvent('rpl-document', emit)

const onClick = () => {
  emitRplEvent(
    'download',
    {
      action: 'download',
      text: slotContent,
      value: props.url
    },
    { global: props.globalEvents }
  )
}
</script>

<template>
  <figure
    :class="{ 'rpl-document': true, 'rpl-document--centered': !$slots.info }"
  >
    <a
      class="rpl-document__link rpl-u-focusable-within"
      :href="url"
      :download="download"
      :target="openInNewWindow ? '_blank' : null"
      @click="onClick"
    >
      <div v-if="$slots.icon" class="rpl-document__icon">
        <slot name="icon"></slot>
      </div>
      <div class="rpl-document__content">
        <div
          v-if="$slots.name"
          class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline"
        >
          <slot name="name"></slot>
        </div>
        <div v-if="$slots.info" class="rpl-document__info rpl-type-label-small">
          <slot name="info"></slot>
        </div>
      </div>
    </a>
    <figcaption
      v-if="$slots.caption"
      class="rpl-document__caption rpl-type-p-small"
    >
      <slot name="caption"></slot>
    </figcaption>
  </figure>
</template>
