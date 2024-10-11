<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { format, parse, isMatch, isValid } from 'date-fns'
import RplFormInput from '../RplFormInput/RplFormInput.vue'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter.js'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

interface InternalDate {
  from: string
  to: string
}

interface Props {
  id: string
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  variant?: 'default' | 'reverse'
  value?: InternalDate
  onChange: (value: string | string[]) => void
  dateFormat?: string
  min?: string
  max?: string
  ariaDescribedby?: string
  pii?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  invalid: false,
  label: undefined,
  value: undefined,
  variant: 'default',
  dateFormat: 'yyyy-mm-dd',
  min: '',
  max: '',
  ariaDescribedby: '',
  pii: true
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date-range', emit)

// Check the incoming value and format to yyyy-mm-dd if supplied in another format
const ingestValue = (range?: InternalDate): InternalDate | null => {
  if (!range) {
    return { from: '', to: '' }
  }

  const dateFrom = parse(range.from, props.dateFormat, new Date())
  const dateTo = parse(range.to, props.dateFormat, new Date())

  return {
    from: range.from && isValid(dateFrom) ? format(dateFrom, 'yyyy-mm-dd') : '',
    to: range.to && isValid(dateTo) ? format(dateTo, 'yyyy-mm-dd') : ''
  }
}

const ingestedValue = ingestValue(props.value)

// Populate the initial state
const internalFrom = ref<string>(ingestedValue.from)
const internalTo = ref<string>(ingestedValue.to)

// Then watch for any external changes
watch(
  () => props.value,
  (newValue) => {
    const { from, to } = ingestValue(newValue)

    internalFrom.value = from
    internalTo.value = to
  }
)

const handleChangeFrom = (e) => {
  internalFrom.value = e.target.value
  commitValue(e.target.value, internalTo.value)
}

const handleChangeTo = (e) => {
  internalTo.value = e.target.value
  commitValue(internalFrom.value, e.target.value)
}

const commitValue = (from: string, to: string) => {
  if (from && !isMatch(from, props.dateFormat)) {
    from = format(parse(from, 'yyyy-mm-dd', new Date()), props.dateFormat)
  }
  if (to && !isMatch(to, props.dateFormat)) {
    to = format(parse(to, 'yyyy-mm-dd', new Date()), props.dateFormat)
  }

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', { from, to })
}

const fromMax = computed(() => internalTo.value || props.max)
const toMin = computed(() => internalFrom.value || props.min)

const handleUpdate = (event) => {
  const eventValue =
    internalFrom.value || internalTo.value
      ? `${internalFrom.value || null},${internalTo.value || null}`
      : ''
  emitRplEvent(
    'update',
    {
      ...event,
      id: props.id,
      label: props?.label,
      value: sanitisePIIField(props.pii, eventValue)
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-form-date-range">
    <div class="rpl-form-date-range__option">
      <label :for="`${id}__from`" class="rpl-u-visually-hidden">From</label>
      <RplFormInput
        :id="`${id}__from`"
        :name="`${id}__from`"
        :variant="variant"
        type="date"
        :value="internalFrom"
        :disabled="disabled"
        :required="required"
        :invalid="invalid"
        :aria-describedby="ariaDescribedby"
        :global-events="false"
        :min="min"
        :max="fromMax"
        @update="handleUpdate"
        @input="handleChangeFrom"
      />
    </div>
    <div class="rpl-form-date-range__option">
      <label :for="`${id}__to`" class="rpl-u-visually-hidden">To</label>
      <RplFormInput
        :id="`${id}__to`"
        :name="`${id}__to`"
        :variant="variant"
        type="date"
        :value="internalTo"
        :disabled="disabled"
        :required="required"
        :invalid="invalid"
        :aria-describedby="ariaDescribedby"
        :global-events="false"
        :min="toMin"
        :max="max"
        @update="handleUpdate"
        @input="handleChangeTo"
      />
    </div>
  </div>
</template>

<style src="./RplFormDateRange.css"></style>
