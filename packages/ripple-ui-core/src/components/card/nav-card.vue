<script lang="ts">
export default { name: 'RplNavCard' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplCard from './card.vue'

const props = defineProps({
  image: {
    type: [String, undefined],
    default: undefined
  },
  highlight: {
    type: Boolean,
    default: false
  },
  inset: {
    type: Boolean,
    default: true
  },
  meta: {
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
  const classes = [
    'rpl-card__cta',
    'rpl-u-focusable',
    'rpl-u-focusable--inline'
  ]
  classes.push(props.highlight ? 'rpl-type-h3-highlight' : 'rpl-type-h3')
  return classes.join(' ')
})

const imgClasses = computed(() => {
  const classes = ['rpl-card__media']
  if (props.inset) classes.push('rpl-card__media--inset')
  return classes.join(' ')
})
</script>

<template>
  <RplCard :href="url" type="nav">
    <template v-if="image" #upper>
      <img :class="imgClasses" :src="image" alt="" />
    </template>
    <template #meta>
      <div class="rpl-card__meta">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses" role="button" tabindex="0">
        {{ title }}
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
