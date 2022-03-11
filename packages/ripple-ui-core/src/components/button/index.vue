<script lang="ts">
export default {
  name: 'RplButton'
}
</script>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  /*
  When someone installs and imports our MyButton.vue component form our library,
  Volar should offer "primary" and "secondary" autocompletions for it
  */
  theme: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
  },
  label: {
    type: String,
    required: true
  },
  disabled: Boolean
})
</script>

<template>
  <button
    type="button"
    :className="`rpl-button rpl-button--${theme}${
      disabled ? ' rpl-button--disabled' : ''
    }`"
    :disabled="disabled"
  >
    I'm a button, my label is {{ label }}
  </button>
</template>

<style src="./button.css" />
