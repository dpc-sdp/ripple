<script lang="ts">
export default { name: 'RplCallToAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplCard from './card.vue'
import RplButton from '../button/button.vue'

defineProps({
  image: {
    type: [String, undefined],
    default: undefined
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

const titleClasses = computed(() => {
  return 'rpl-card__cta rpl-type-h3 rpl-u-focusable rpl-u-focusable--inline'
})
</script>

<template>
  <RplCard :href="url" type="call-to-action" class="rpl-card--inset">
    <template v-if="image" #upper>
      <img class="rpl-card__media rpl-card__media--inset" :src="image" alt="" />
    </template>
    <template #title>
      <h3 :class="titleClasses">
        {{ title }}
      </h3>
    </template>
    <slot></slot>
    <RplButton
      role="button"
      tabindex="0"
      variant="filled"
      theme="default"
      label="Call to action"
    ></RplButton>
  </RplCard>
</template>
