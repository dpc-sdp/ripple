<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import type { RplTheme } from './../../types/ripple'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

defineProps({
  theme: {
    type: String as PropType<RplTheme>,
    default: 'primary'
  },
  url: {
    type: String,
    default: '#'
  }
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}
</script>

<template>
  <a
    :className="`rpl-text-link rpl-text-link--${theme}`"
    :href="url"
    @click="onClick()"
  >
    <slot />
  </a>
</template>

<style src="./text-link.css" />
