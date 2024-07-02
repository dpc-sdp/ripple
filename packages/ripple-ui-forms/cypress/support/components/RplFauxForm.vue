<script setup lang="ts">
import { ref } from 'vue'
import { RplIconSprite } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  component: any
  componentProps: any
}

const props = defineProps<Props>()

const value = ref(props.componentProps?.value)

const handleChange = (val: string) => (value.value = val)
</script>

<template>
  <div class="rpl-faux-form">
    <RplIconSprite style="display: none" />
    <component
      :is="component"
      v-bind="componentProps"
      :value="value"
      @onChange="handleChange"
    />
  </div>
</template>

<style>
.rpl-faux-form {
  padding: var(--rpl-sp-5);
}
</style>
