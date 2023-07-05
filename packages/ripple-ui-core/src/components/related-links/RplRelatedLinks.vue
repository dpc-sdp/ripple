<script setup lang="ts">
import { IRplListItemArray } from '../list/constants'
import RplList from '../list/RplList.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title?: string
  items?: IRplListItemArray[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Related links',
  items: () => []
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-related-links', emit)

const handleClick = (event) => {
  emitRplEvent(
    'navigate',
    {
      ...event,
      label: props.title
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-related-links">
    <div class="rpl-related-links__heading rpl-type-label-large">
      {{ title }}
    </div>
    <RplList
      :items="items"
      container-class="rpl-related-links__list"
      item-class="rpl-related-links__item rpl-type-p"
      @item-click="handleClick"
    >
    </RplList>
  </div>
</template>

<style src="./RplRelatedLinks.css" />
