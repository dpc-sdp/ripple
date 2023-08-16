---
to: src/components/demo/RplDemo.vue
---
<script setup lang="ts">
import { useRippleEvent, rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: '123'
})

const emit = defineEmits<{
  (
    e: 'toggleAll',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()
// Example of using event bus
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { emitRplEvent } = useRippleEvent('rpl-demo', emit)
</script>

<template>
  <div class="rpl-demo">
    <h3>This component is a demo and should be deleted</h3>
    <!-- TODO: implement your component! -->
  </div>
</template>

<style src="./RplDemo.css" />
