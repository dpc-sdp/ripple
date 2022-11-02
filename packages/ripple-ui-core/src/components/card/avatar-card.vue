<script lang="ts">
export default { name: 'RplAvatarCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplCardElements, RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'
import RplImage from '../image/image.vue'

interface Props {
  el?: typeof RplCardElements[number]
  image: string
  title: string
  url?: string
}

withDefaults(defineProps<Props>(), {
  el: 'div',
  url: undefined
})

const titleClasses = computed(() => RplCardTitleClasses)

const { container, trigger } = useAccessibleContainer()
</script>

<template>
  <RplCard ref="container" :href="url" :el="el" type="avatar">
    <template #upper>
      <RplImage
        class="rpl-card__media rpl-card__media--avatar"
        :src="image"
        alt=""
        circle
      />
    </template>
    <template v-if="$slots.meta" #meta>
      <div class="rpl-card__meta">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="trigger" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
