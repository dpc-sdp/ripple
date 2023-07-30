<script setup lang="ts">
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  text: string
  href: string
  active?: boolean
  showChildIcon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  showChildIcon: false
})

const emit = defineEmits<{
  (e: 'itemClick', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-vertical-nav', emit)

const handleClick = () => {
  emitRplEvent('itemClick', {
    action: 'click',
    text: props.text,
    value: props.href
  })
}
</script>

<template>
  <RplLink
    :url="href"
    :class="{
      'rpl-vertical-nav__item': true,
      'rpl-vertical-nav__item--active': active,
      'rpl-vertical-nav__link': true,
      'rpl-u-focusable-block': true
    }"
    @click="handleClick"
  >
    <span v-if="showChildIcon" class="rpl-icon--child"></span>
    <span>{{ text }}</span>
  </RplLink>
</template>
