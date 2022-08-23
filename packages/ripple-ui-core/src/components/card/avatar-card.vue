<script lang="ts">
export default { name: 'RplAvatarCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplPropEl, RplPropStringRequired } from '../../lib/constants'
import { RplCardTitleClasses } from './constants'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'

import RplCard from './card.vue'
import RplTag from '../tag/tag.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  el: RplPropEl,
  image: RplPropStringRequired,
  meta: RplPropStringRequired,
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
  <RplCard ref="container" :href="url" :el="el" type="avatar">
    <template #upper>
      <img
        class="rpl-card__media rpl-card__media--avatar"
        :src="image"
        alt=""
      />
    </template>
    <template #meta>
      <div class="rpl-card__meta">
        <RplTag :label="meta" :variant="`neutral`" />
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
