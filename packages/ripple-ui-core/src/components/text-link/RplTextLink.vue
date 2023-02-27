<script setup lang="ts">
import { ref, Ref } from 'vue'
import { rplEventBus } from '../../index'
import usePrintUrl from '../../composables/usePrintUrl'

rplEventBus.register('rpl-text-link/click')

interface Props {
  url: string
  text?: string
}

const props = defineProps<Props>()

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-text-link/click', payload)
}

const link: Ref = ref(null)

defineExpose({ link })

const printUrl = usePrintUrl(props.url)
</script>

<template>
  <a
    ref="link"
    class="rpl-text-link rpl-u-focusable-inline"
    :href="url"
    :data-print-url="printUrl"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>

<style src="./RplTextLink.css" />
