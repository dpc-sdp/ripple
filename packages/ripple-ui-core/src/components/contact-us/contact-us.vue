<script lang="ts">
export default { name: 'RplContactUs' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplContactUsDetailsArray } from './constants'
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

defineProps({
  title: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: 'Contact us'
  },
  address: {
    type: Object as PropType<typeof RplContactUsDetailsArray>,
    default: () => RplContactUsDetailsArray
  },
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  }
})
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
    <RplList :items="items" class="rpl-type-p"></RplList>
  </div>
</template>

<style src="./contact-us.css" />
