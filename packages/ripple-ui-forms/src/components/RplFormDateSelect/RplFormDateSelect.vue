<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { format, parse } from 'date-fns'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter.js'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

type DatePart = 'day' | 'month' | 'year'

interface Props {
  id: string
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean | DatePart[]
  variant?: 'default' | 'reverse'
  value?: string
  onChange: (value: string | string[]) => void
  dateFormat: string
  ariaDescribedby?: string
  pii?: boolean
  range?: Ref
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  label: undefined,
  value: undefined,
  variant: 'default',
  dateFormat: 'yyyy-MM-dd',
  ariaDescribedby: '',
  pii: true,
  range: undefined
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date', emit)

const internalDate = props.range || ref()

if (props.value) {
  internalDate.value = parse(props.value, props.dateFormat, new Date())
  useFormkitFriendlyEventEmitter(
    props,
    emit,
    'onChange',
    format(internalDate.value, props.dateFormat)
  )
}

const internalDateString = computed(() =>
  format(internalDate.value, props.dateFormat)
)

const params = {
  enableTimePicker: false,
  disabled: props.disabled,
  name: props.name,
  range: props.range !== undefined,
  id: props.id,
  format: 'd/MM/yyyy',
  dayNames: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  locale: 'en-AU',
  offset: '0',
  autoApply: true,
  actionRow: {
    showPreview: false
  }
}

watch(
  () => internalDate.value,
  (updated) => {
    if (updated) {
      useFormkitFriendlyEventEmitter(
        props,
        emit,
        'onChange',
        internalDateString.value
      )
    }
  }
)

const handleUpdate = (event) => {
  emitRplEvent(
    'update',
    {
      ...event,
      id: props.id,
      label: props?.label,
      value: sanitisePIIField(props.pii, props?.value)
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-form-date-select">
    <VueDatePicker
      v-model="internalDate"
      v-bind="params"
      @update="handleUpdate"
    >
      <template #action-row></template>
    </VueDatePicker>
  </div>
</template>

<style src="./RplFormDateSelect.css"></style>
