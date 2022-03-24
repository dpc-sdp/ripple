<script lang="ts">
export default {
  name: 'RplButton'
}
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import Icon from '../icon/icon.vue'

const props = defineProps({
  /*
  When someone installs and imports our MyButton.vue component form our library,
  Volar should offer "primary" and "secondary" autocompletions for it
  */
  theme: {
    type: String as PropType<'primary' | 'secondary' | 'tertiary'>,
    default: 'primary'
  },
  iconName: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String as PropType<'left' | 'right'>,
    default: 'right'
  },
  size: {
    type: String as PropType<'default' | 'large'>,
    default: 'default'
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const directionClass = computed(() => {
  return props.iconPosition === 'left' ? 'rpl-button--reverse' : ''
})
</script>

<template>
  <button
    type="button"
    :className="`rpl-button  rpl-button--${theme}  ${directionClass}`"
    :disabled="disabled"
  >
    <span
      v-if="label"
      className="rpl-button__label"
    >
      {{ label }}
    </span>
    <span
      v-if="iconName"
      className="rpl-button__icon"
    >
      <Icon :name="iconName"></Icon>
    </span>
  </button>
</template>

<style src="./button.css" />
