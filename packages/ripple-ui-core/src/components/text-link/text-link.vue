<script lang="ts">
export default { name: 'RplTextLink' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { RplPropUrl } from '../../lib/constants'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

defineProps({
  url: RplPropUrl
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}

const link = ref(null)
const triggerClick = () => {
  link.value.click()
}

defineExpose({ triggerClick })
</script>

<template>
  <a
    ref="link"
    class="rpl-text-link rpl-u-focusable rpl-u-focusable--inline"
    :href="url"
    @click="onClick()"
  >
    <slot />
  </a>
</template>

<style src="./text-link.css" />
