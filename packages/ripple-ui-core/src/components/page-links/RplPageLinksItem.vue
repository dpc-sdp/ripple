<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'

interface Props {
  direction: 'prev' | 'next'
  label?: string
  url: string
}

defineProps<Props>()
</script>

<template>
  <div class="rpl-page-links__item">
    <RplTextLink
      :url="url"
      class="rpl-page-links__link rpl-type-p"
      v-bind="$attrs"
    >
      <RplIcon
        :name="direction === 'prev' ? 'icon-arrow-left' : 'icon-arrow-right'"
        colour="default"
        class="rpl-page-links__link-icon"
      />
      <span class="rpl-page-links__link-label rpl-type-weight-bold">
        {{ label || (direction === 'prev' ? 'Previous' : 'Next') }}
      </span>
      <span v-if="$slots.default" class="rpl-page-links__link-text">
        <slot />
      </span>
    </RplTextLink>
  </div>
</template>
