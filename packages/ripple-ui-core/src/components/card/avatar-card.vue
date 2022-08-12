<script lang="ts">
export default { name: 'RplAvatarCard' }
</script>

<script setup lang="ts">
import RplCard from './card.vue'
import RplTag from '../tag/tag.vue'

defineProps({
  image: {
    type: String,
    required: true
  },
  meta: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  url: {
    type: [String, undefined],
    default: undefined
  }
})
</script>

<template>
  <RplCard :href="url" type="avatar">
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
      <h3
        class="rpl-card__cta rpl-type-h3 rpl-u-focusable"
        role="button"
        tabindex="0"
      >
        {{ title }}
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
