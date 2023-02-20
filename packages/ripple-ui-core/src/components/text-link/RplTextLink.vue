<script setup lang="ts">
import { ref, Ref } from 'vue'

import { rplEventBus } from '../../index'
rplEventBus.register('rpl-text-link/click')

interface Props {
  url: string
  text?: string
}

defineProps<Props>()

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}

const link: Ref = ref(null)

defineExpose({ link })
</script>

<template>
  <a
    ref="link"
    class="rpl-text-link rpl-u-focusable-inline"
    :href="url"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>

<style src="./RplTextLink.css" />
