<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  direction: 'prev' | 'next'
  label?: string
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined
})

const emit = defineEmits<{
  (e: 'paginate', payload: rplEventPayload & { action: 'prev' | 'next' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-page-links', emit)

const displayLabel = computed(() => {
  return props.label || (props.direction === 'prev' ? 'Previous' : 'Next')
})

const handleClick = () => {
  emitRplEvent(
    'paginate',
    {
      action: props.direction,
      value: props.url,
      text: displayLabel.value
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-page-links__item">
    <RplTextLink
      :url="url"
      class="rpl-page-links__link rpl-type-p"
      v-bind="$attrs"
      @click="handleClick"
    >
      <RplIcon
        :name="direction === 'prev' ? 'icon-arrow-left' : 'icon-arrow-right'"
        colour="default"
        class="rpl-page-links__link-icon"
      />
      <span class="rpl-page-links__link-label rpl-type-weight-bold">
        {{ displayLabel }}
      </span>
      <span v-if="$slots.default" class="rpl-page-links__link-text">
        <slot />
      </span>
    </RplTextLink>
  </div>
</template>
