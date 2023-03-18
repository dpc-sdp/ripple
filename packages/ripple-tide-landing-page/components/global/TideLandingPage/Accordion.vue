<script setup lang="ts">
import { RplAccordion } from '#components'
import { inject } from 'vue'
const props = defineProps<{
  id: string
  title: string
  numbered: boolean
  items: Array<any>
}>()

const $rplEvent = inject('$rplEvent')

const onEvent = (e, payload) =>
  $rplEvent.emit(`rpl-accordion/${e}`, {
    ...payload,
    name: props.title
  })
</script>

<template>
  <RplAccordion
    :id="id"
    :items="items"
    :numbered="numbered"
    @toggle-all="(payload) => onEvent('toggleAll', payload)"
    @toggle-item="(payload) => onEvent('toggleItem', payload)"
  />
</template>
