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
    type: [String, Boolean] as PropType<RplTheme | boolean>,
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
    :class="`rpl-text-link${
      theme ? ' rpl-text-link--' + theme : ''
    } rpl-u-focusable`"
    :href="url"
    @click="onClick()"
  >
    <slot />
  </a>
</template>

<style src="./text-link.css" />
