<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core'
import { computed } from 'vue'
interface Props {
  id: string
  disabled: boolean
  className: string
  label?: string
  variant: 'filled' | 'outlined' | 'white' | 'elevated' | 'destructive'
  name: string
  type: 'submit' | 'reset' | 'button'
  prefixIcon: string
  suffixIcon: string
}


const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  className: 'rpl-form__input',
  label: undefined
})

const iconPosition = computed(() => {
  if (props.prefixIcon) {
    return 'left'
  }
  if (props.suffixIcon) {
    return 'right'
  }
  return undefined
})
</script>
<template>
  <RplButton :id="id" :variant="variant || 'filled'" theme="default" :type="type || 'submit'" :disabled="disabled"
    :icon-name="prefixIcon || suffixIcon" :icon-position="iconPosition" :class="{
      'rpl-u-margin-t-4': true
    }">
    {{ label }}
  </RplButton>
</template>
