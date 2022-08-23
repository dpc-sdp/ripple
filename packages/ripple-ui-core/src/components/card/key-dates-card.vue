<script lang="ts">
export default { name: 'RplKeyDatesCard' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardItemArray } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  ctaTitle: RplPropStringRequired,
  el: RplPropEl,
  items: {
    type: Array as PropType<typeof RplCardItemArray[]>,
    default: () => []
  },
  title: {
    type: String,
    default: 'Key calendar dates'
  },
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" type="key-dates" :highlight="true" :el="el">
    <template #title>
      <h3 class="rpl-type-h3-fixed">{{ title }}</h3>
    </template>
    <template #default>
      <ol v-if="items.length > 0" class="rpl-card__keydates">
        <li
          v-for="(item, index) of items"
          :key="index"
          class="rpl-card__keydate"
        >
          <h3 class="rpl-type-h3-highlight-fixed">{{ item.title }}</h3>
          <h4 class="rpl-type-h4-fixed">{{ item.subtitle }}</h4>
          <p class="rpl-type-p-small">{{ item.content }}</p>
        </li>
      </ol>
    </template>
    <template #lower>
      <RplTextLink ref="trigger" class="rpl-card__cta" :url="url">{{
        ctaTitle
      }}</RplTextLink>
    </template>
  </RplCard>
</template>
