<script lang="ts">
export default { name: 'RplCallToAction' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useContainerTrigger } from '../../composables/useContainerTrigger'

import RplCard from './card.vue'
import RplButton from '../button/button.vue'

defineProps({
  el: RplPropEl,
  image: {
    type: [String, undefined],
    default: undefined
  },
  title: RplPropStringRequired,
  url: {
    type: [String, undefined],
    default: undefined
  }
})

const titleClasses = computed(() => RplCardTitleClasses)

const card = ref(null)
const callToAction = ref(null)
useContainerTrigger(card, callToAction)
</script>

<template>
  <RplCard ref="card" type="call-to-action" class="rpl-card--inset" :el="el">
    <template v-if="image" #upper>
      <img class="rpl-card__media rpl-card__media--inset" :src="image" alt="" />
    </template>
    <template #title>
      <h3 :class="titleClasses">{{ title }}</h3>
    </template>
    <slot></slot>
    <RplButton
      ref="callToAction"
      el="a"
      :url="url"
      role="button"
      tabindex="0"
      variant="filled"
      theme="default"
      label="Call to action"
    ></RplButton>
  </RplCard>
</template>
