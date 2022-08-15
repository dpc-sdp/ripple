<script lang="ts">
export default { name: 'RplPromoCard' }
</script>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { RplCardElements } from './constants'
import RplCard from './card.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
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
  return 'rpl-card__cta rpl-type-h3 rpl-u-focusable rpl-u-focusable--inline'
})

const callToAction = ref(null)
const navigate = () => {
  callToAction.value.triggerClick()
}
</script>

<template>
  <RplCard type="promo" :highlight="highlight" :el="el" @click="navigate">
    <template v-if="image" #upper>
      <img class="rpl-card__media" :src="image" alt="" />
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
