<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { rplEventBus } from './../../index'
rplEventBus.register('rpl-button/click')

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
    required: false,
    default: 'Submit'
  },
  disabled: Boolean
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}
</script>

<template>
  <button
    type="button"
    :className="`rpl-button rpl-button--${theme}${
      disabled ? ' rpl-button--disabled' : ''
    }`"
    :disabled="disabled"
    @click="onClick()"
  >
    <slot> I'm a button, my label is {{ label }} </slot>
  </button>
</template>

<style src="./button.css" />
