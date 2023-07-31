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
  title: 'On this page',
  items: () => []
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-in-page-navigation', emit)

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
  <div class="rpl-in-page-navigation">
    <h3 class="rpl-in-page-navigation__title rpl-type-h3">
      {{ title }}
    </h3>
    <RplList
      :items="items"
      item-class="rpl-type-p-small"
      @item-click="handleClick"
    ></RplList>
  </div>
</template>

<style src="./RplInPageNavigation.css" />
