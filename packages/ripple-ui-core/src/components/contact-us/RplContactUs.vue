<script setup lang="ts">
import type { IRplListItemArray } from '../list/constants'
import RplList from '../list/RplList.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface IRplContactUsDetails {
  name: string
  department: string
  street: string
}

interface Props {
  title?: string | boolean
  address?: IRplContactUsDetails
  items?: IRplListItemArray[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Contact us',
  address: null,
  items: () => []
})

const emit = defineEmits<{
  (e: 'itemClick', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-contact-us', emit)

const handleClick = (event) => {
  emitRplEvent(
    'itemClick',
    {
      ...event,
      label: typeof props.title === 'string' ? props.title : null
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-contact-us">
    <h3 v-if="title" class="rpl-contact-us__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div v-if="address" class="rpl-contact-us__details rpl-type-p">
      <p>
        <template v-if="address.name"
          >{{ address.name }}<br v-if="address.department || address.street"
        /></template>
        <template v-if="address.department"
          >{{ address.department }}<br v-if="address.street"
        /></template>
        <template v-if="address.street">{{ address.street }}</template>
      </p>
    </div>
    <RplList
      :items="items"
      class="rpl-type-p"
      @item-click="handleClick"
    ></RplList>
  </div>
</template>

<style src="./RplContactUs.css" />
