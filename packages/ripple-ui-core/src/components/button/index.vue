<script lang="ts">
export default { name: 'RplButton' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import Icon from '../icon/icon.vue'
import { rplEventBus } from './../../index'
rplEventBus.register('rpl-button/click')

const props = defineProps({
  /*
  When someone installs and imports our MyButton.vue component form our library,
  Volar should offer "primary" and "secondary" autocompletions for it
  */
  type: {
    type: String as PropType<'solid' | 'outline' | 'flat'>,
    default: 'primary'
  },
  theme: {
    type: String as PropType<'core' | 'accent' | 'neutral'>,
    default: 'core'
  },
  iconName: {
    type: String,
    default: ''
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
    required: false,
    default: 'Submit'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const directionClass = computed(() => {
  return props.iconPosition === 'left' ? 'rpl-button--reverse' : ''
})

const onClick = (payload?: any) => {
  rplEventBus.emit('rpl-button/click', payload)
}
</script>

<template>
  <button
    type="button"
    :className="`rpl-button  rpl-button--${theme}  ${directionClass}`"
    :disabled="disabled"
    @click="onClick()"
  >
    <span v-if="label" className="rpl-button__label">
      {{ label }}
    </span>
    <span v-if="iconName" className="rpl-button__icon">
      <Icon :name="iconName"></Icon>
    </span>
  </button>
</template>

<style src="./button.css" />
