<script lang="ts">
export default { name: 'RplContactUs' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplContactUsDetailsArray, RplContactUsItemArray } from './constants'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'

defineProps({
  title: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: 'Contact us'
  },
  address: {
    type: Object as PropType<typeof RplContactUsDetailsArray[]>,
    default: () => RplContactUsDetailsArray
  },
  items: {
    type: Array as PropType<typeof RplContactUsItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-contact-us">
    <h3 v-if="title" class="rpl-u-margin-b-3 rpl-type-label-large">
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
    <ul v-if="items.length > 0" class="rpl-contact-us__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        class="rpl-contact-us__item"
      >
        <RplTextLink
          :url="item.url"
          :theme="false"
          class="rpl-contact-us__link rpl-u-focusable"
        >
          <RplIcon
            v-if="item.icon"
            class="rpl-contact-us__icon"
            :name="item.icon"
          ></RplIcon>
          <span class="rpl-type-label-small">{{
            item.label
          }}</span>
        </RplTextLink>
      </li>
    </ul>
  </div>
</template>

<style src="./contact-us.css" />
