<script lang="ts">
export default { name: 'RplCallToAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

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

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard
    ref="container"
    type="call-to-action"
    class="rpl-card--inset"
    :el="el"
  >
    <template v-if="image" #upper>
      <img class="rpl-card__media rpl-card__media--inset" :src="image" alt="" />
    </template>
    <template #title>
      <h3 :class="titleClasses">{{ title }}</h3>
    </template>
    <slot></slot>
    <RplButton
      ref="trigger"
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
