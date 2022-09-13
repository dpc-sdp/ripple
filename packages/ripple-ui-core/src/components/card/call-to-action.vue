<script lang="ts">
export default { name: 'RplCallToAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { RplButtonThemes, RplButtonVariants } from '../button/constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplButton from '../button/button.vue'

interface Props {
  el?: typeof RplCardElements[number]
  image?: string
  title: string
  url?: string
  theme?: typeof RplButtonThemes[number]
  variant?: typeof RplButtonVariants[number]
}

withDefaults(defineProps<Props>(), {
  el: 'div',
  image: undefined,
  url: undefined,
  theme: 'default',
  variant: 'filled'
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
      :variant="variant"
      :theme="theme"
      label="Call to action"
    ></RplButton>
  </RplCard>
</template>
