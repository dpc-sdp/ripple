<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core'
import { reset } from '@formkit/vue'
import { computed, inject } from 'vue'
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
  displayResetButton: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  className: 'rpl-form__input',
  label: 'Submit',
  displayResetButton: false
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

const formId: string = inject('formId')

const handleReset = () => {
  reset(formId)
}
</script>
<template>
  <div class="rpl-form-actions">
    <RplButton
      :id="id"
      :variant="variant || 'filled'"
      :type="type || 'submit'"
      :disabled="disabled"
      :icon-name="prefixIcon || suffixIcon"
      :icon-position="iconPosition"
    >
      {{ label }}
    </RplButton>
    <RplButton
      v-if="displayResetButton"
      variant="white"
      type="reset"
      :disabled="disabled"
      class="rpl-form-actions__reset"
      iconName="icon-cancel-circle-filled"
      iconPosition="left"
      @click.prevent="handleReset"
    >
      Clear form
    </RplButton>
  </div>
</template>

<style src="./RplFormActions.css" />
