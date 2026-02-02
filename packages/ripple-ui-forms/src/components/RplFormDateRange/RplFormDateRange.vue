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
  fromLabel?: string
  toLabel?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  variant?: 'default' | 'reverse'
  display?: 'inline' | 'block'
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
  fromLabel: 'From',
  toLabel: 'To',
  value: undefined,
  variant: 'default',
  display: 'inline',
  dateFormat: 'yyyy-MM-dd',
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

const INPUT_FORMAT = 'yyyy-MM-dd'

// Check the incoming value and format to yyyy-MM-dd if supplied in another format
const parseIncomingValue = (value?: string): string => {
  if (typeof value !== 'string' || value === '') {
    return ''
  }

  const parsedValue = parse(value, props.dateFormat, new Date())

  return isValid(parsedValue) ? format(parsedValue, INPUT_FORMAT) : ''
}

const ingestValue = (range?: InternalDate): InternalDate => ({
  from: parseIncomingValue(range?.from),
  to: parseIncomingValue(range?.to)
})

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

function isValidDateValue(value: string): boolean {
  if (typeof value !== 'string' || value === '') {
    return true
  }
  return isValid(parse(value, INPUT_FORMAT, new Date()))
}

const handleChangeFrom = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (isValidDateValue(value)) {
    internalFrom.value = value
    commitValue(value, internalTo.value)
  }
}

const handleChangeTo = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  if (isValidDateValue(value)) {
    internalTo.value = value
    commitValue(internalFrom.value, value)
  }
}

const commitValue = (from: string, to: string) => {
  if (from && !isMatch(from, props.dateFormat)) {
    from = format(parse(from, INPUT_FORMAT, new Date()), props.dateFormat)
  }
  if (to && !isMatch(to, props.dateFormat)) {
    to = format(parse(to, INPUT_FORMAT, new Date()), props.dateFormat)
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

const labelClasses = computed(() => ({
  'rpl-form-date-range__label': true,
  'rpl-type-label-small': true,
  'rpl-u-margin-b-2': props.display === 'block',
  'rpl-u-visually-hidden': props.display === 'inline'
}))
</script>

<template>
  <div :class="`rpl-form-date-range rpl-form-date-range--${display}`">
    <div class="rpl-form-date-range__option">
      <label :for="`${id}__from`" :class="labelClasses">{{ fromLabel }}</label>
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
      <label :for="`${id}__to`" :class="labelClasses">{{ toLabel }}</label>
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
