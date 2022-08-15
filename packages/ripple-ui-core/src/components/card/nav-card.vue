<script lang="ts">
export default { name: 'RplNavCard' }
</script>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { RplCardElements } from './constants'
import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

const props = defineProps({
  el: {
    type: String as PropType<typeof RplCardElements[number]>,
    default: 'div'
  },
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

const callToAction = ref(null)
const navigate = () => {
  callToAction.value.triggerClick()
}
</script>

<template>
  <RplCard :href="url" type="nav" :el="el" @click="navigate">
    <template v-if="image" #upper>
      <img :class="imgClasses" :src="image" alt="" />
    </template>
    <template #meta>
      <div class="rpl-card__meta">
        <slot name="meta"></slot>
      </div>
    </template>
    <template #title>
      <h3 :class="titleClasses">
        <RplTextLink ref="callToAction" :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot></slot>
  </RplCard>
</template>
