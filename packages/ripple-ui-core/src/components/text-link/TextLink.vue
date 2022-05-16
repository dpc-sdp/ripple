<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import type { RplTheme } from './../../types/ripple'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

const props = defineProps({
  theme: {
    type: String as PropType<RplTheme>,
    default: 'primary'
  },
  url: {
    type: String,
    default: '#'
  },
  inactive: {
    type: Boolean,
    default: false
  }
})

const classes = computed(() => {
  const cl = ['rpl-text-link', `rpl-text-link--${props.theme}`]
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
    <span>sdf</span>
    <slot />
  </a>
</template>

<style src="./text-link.css" />
