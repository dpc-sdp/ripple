<script setup lang="ts">
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
</script>

<template>
  <RplLink
    ref="link"
    class="rpl-text-link rpl-u-focusable-inline"
    :url="url"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </RplLink>
</template>

<style src="./RplTextLink.css" />
