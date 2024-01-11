<script setup lang="ts">
import { RplButton } from '@dpc-sdp/ripple-ui-core/vue'
import { reset } from '@formkit/vue'
import { computed, inject } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

interface Props {
  id: string
  disabled?: boolean
  className?: string
  label?: string
  resetLabel?: string
  variant?: 'filled' | 'outlined' | 'white' | 'elevated' | 'destructive'
  prefixIcon?: string
  suffixIcon?: string
  displayResetButton?: boolean
  globalEvents?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'submit',
  variant: 'filled',
  className: 'rpl-form__input',
  label: 'Submit',
  resetLabel: 'Clear form',
  displayResetButton: false,
  prefixIcon: undefined,
  suffixIcon: undefined,
  disabled: false,
  globalEvents: true
})

const emit = defineEmits<{
  (e: 'reset', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-actions', emit)

const iconPosition = computed(() => {
  if (props.prefixIcon) {
    return 'left'
  }
  if (props.suffixIcon) {
    return 'right'
  }
  return undefined
})

const form: object = inject('form')
const isFormSubmitting: any = inject('isFormSubmitting')

const handleReset = () => {
  reset(form.id)

  emitRplEvent(
    'reset',
    {
      action: 'click',
      text: props?.resetLabel,
      contextId: form?.id,
      contextName: form?.name
    },
    { global: props.globalEvents }
  )
}
</script>
<template>
  <div class="rpl-form-actions rpl-u-screen-only">
    <RplButton
      :id="id"
      :variant="variant"
      type="submit"
      :disabled="disabled"
      :icon-name="prefixIcon || suffixIcon"
      :icon-position="iconPosition"
      :busy="isFormSubmitting"
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
      {{ resetLabel }}
    </RplButton>
  </div>
</template>

<style src="./RplFormActions.css" />
