<script lang="ts">
export default { name: 'RplPageLinksItem' }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import { RplLink } from '../../lib/constants'
import { RplIconNames } from '../icon/constants'
import { computed, useSlots } from 'vue'

interface Props {
  link: RplLink
  label: string
  iconName: typeof RplIconNames[number]
}

defineProps<Props>()

const slots = useSlots()

const classes = computed(() => ({
  'rpl-page-links__item': true,
  'rpl-page-links__item--text': slots.default
}))
</script>

<template>
  <div :class="classes">
    <RplTextLink v-if="link" :url="link.url" class="rpl-page-links__link">
      <RplIcon :name="iconName" class="rpl-page-links__link-icon" />
      <span
        class="rpl-page-links__link-label rpl-type-label rpl-type-weight-bold"
        :data-label="label"
      >
        <span>{{ label }}</span>
      </span>
      <span v-if="$slots.default" class="rpl-type-p rpl-page-links__link-text">
        <slot />
      </span>
    </RplTextLink>
  </div>
</template>
