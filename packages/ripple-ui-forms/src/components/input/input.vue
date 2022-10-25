<script setup lang="ts">
import { computed } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  disabled?: boolean
  className: string
  value: string
  type: string
  name: string
  handlers?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/ban-types
  onInput: Function
  prefixIcon?: string | undefined
  suffixIcon?: string | undefined
  maxlength?: string
}


const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  className: 'rpl-form__input',
  prefixIcon: undefined,
  suffixIcon: undefined,
  maxlength: undefined,
  disabled: false
})

const classes = computed(() => {
  return {
    [`${props.className}`]: props.className,
    [`${props.className}--type-${props.type}`]: props.type,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--with-prefix-icon`]: props.prefixIcon,
    [`${props.className}--with-suffix-icon`]: props.suffixIcon,
  }
})
/*
TODO - Wire up event bus handling
function handleInput(e) {
  props.handlers.DOMInput(e.target.value)
}
 */

</script>

<template>
  <div :class="classes">
    <RplIcon v-if="prefixIcon" :name="prefixIcon" :class="`${props.className}-icon ${props.className}-icon__prefix`">
    </RplIcon>
    <input :id="id" :type="type" :disabled="disabled" v-bind="$attrs" :name="name" :value="value" :maxlength="maxlength"
      @blur="handlers?.blur" @input="handlers.DOMInput" />
    <RplIcon v-if="suffixIcon" :name="suffixIcon" :class="`${props.className}-icon ${props.className}-icon__suffix`">
    </RplIcon>
  </div>
</template>

<style src="./input.css">

</style>
