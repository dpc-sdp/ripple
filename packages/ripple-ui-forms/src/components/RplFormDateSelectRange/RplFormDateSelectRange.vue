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

import RplFormDateSelect from '../RplFormDateSelect/RplFormDateSelect.vue'

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
  dateFormat?: string
  ariaDescribedby?: string
  pii?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  label: undefined,
  value: undefined,
  variant: 'default',
  dateFormat: 'yyyy-MM-dd',
  ariaDescribedby: '',
  pii: true
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date', emit)

const internalDate = ref()

const internalDateString = computed(() => [
  format(internalDate.value[0], props.dateFormat),
  format(internalDate.value[1], props.dateFormat)
])

if (props.value) {
  internalDate.value = [
    parse(props.value[0], props.dateFormat, new Date()),
    parse(props.value[1], props.dateFormat, new Date())
  ]
  useFormkitFriendlyEventEmitter(
    props,
    emit,
    'onChange',
    internalDateString.value
  )
}

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
</script>

<template>
  <div class="rpl-form-date-select-range rpl-form-date-range">
    <RplFormDateSelect
      :id="`${id}-from`"
      :range="internalDate"
      :name="`${id}-from`"
      label="From"
      class="rpl-form-date-range--block"
      :onUpdate="handleUpdate"
      @change="onChange"
    />
    <RplFormDateSelect
      :id="`${id}-to`"
      :range="internalDate"
      :name="`${id}-to`"
      label="To"
      class="rpl-form-date-range--block"
      :onUpdate="handleUpdate"
      @change="onChange"
    />
  </div>
</template>

<style src="./RplFormDateSelectRange.css"></style>
