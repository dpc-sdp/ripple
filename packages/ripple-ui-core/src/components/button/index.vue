<script setup lang="ts">
import { PropType } from 'vue'
import './button.css'

defineProps({
  /*
  When someone installs and imports our MyButton.vue component form our library,
  Volar should offer "primary" and "secondary" autocompletions for it
  */
  theme: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary'>,
    default: 'primary'
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <button type="button" :className="`rpl-button rpl-button--${theme}`">
    I'm a button, my prop is {{ label }} TESTS
  </button>
</template>
