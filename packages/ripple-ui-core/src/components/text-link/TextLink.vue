<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import type { RplTheme } from './../../types/ripple'
import { RplPropUrl } from './../global/stories/props'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

const props = defineProps({
  ...RplPropUrl,
  theme: {
    type: String as PropType<RplTheme>,
    default: 'primary'
  },
  inactive: {
    type: Boolean,
    default: false
  },
  class: {
    type: String,
    default: ''
  }
})

const classes = computed(() => {
  const cl = ['rpl-text-link', `rpl-text-link--${props.theme}`, props.class]
  if (props.inactive) {
    cl.push('rpl-text-link--inactive')
  }
  return cl.join(' ')
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}
</script>

<template>
  <a :className="classes" :href="url" @click="onClick()">
    <slot />
  </a>
</template>

<style src="./text-link.css" />
