<script lang="ts">
export default { name: 'RplPageLinksItem' }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import { RplLink } from '../../lib/constants'
import { RplIconNames } from '../icon/constants'

interface Props {
  link: RplLink
  label: string
  iconName: typeof RplIconNames[number]
}

defineProps<Props>()
</script>

<template>
  <div class="rpl-page-links__item">
    <RplTextLink
      v-if="link"
      :url="link.url"
      class="rpl-page-links__link rpl-type-p"
    >
      <RplIcon
        :name="iconName"
        colour="default"
        class="rpl-page-links__link-icon"
      />
      <span class="rpl-page-links__link-label rpl-type-weight-bold">
        {{ label }}
      </span>
      <span v-if="$slots.default" class="rpl-page-links__link-text">
        <slot />
      </span>
    </RplTextLink>
  </div>
</template>
