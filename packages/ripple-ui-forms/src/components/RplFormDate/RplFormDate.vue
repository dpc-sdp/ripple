<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { format, isMatch, isValid, parse } from 'date-fns'
import RplFormInput from '../RplFormInput/RplFormInput.vue'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter.js'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'

type DatePart = 'day' | 'month' | 'year'
interface InternalDate {
  day: string
  month: string
  year: string
}

interface Props {
  id: string
  name: string
  label?: string
  disabled?: boolean
  required: boolean
  invalid?: boolean | DatePart[]
  variant?: 'default' | 'reverse'
  value?: string
  onChange: (value: string | string[]) => void
  dateFormat: string
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
  dateFormat: 'yyyy-MM-dd',
  ariaDescribedby: '',
  pii: true
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date', emit)

const ingestValue = (dateStr: string): InternalDate | null => {
  // An empty external value is valid, so we should clear all the inputs
  if (!dateStr) {
    return {
      day: '',
      month: '',
      year: ''
    }
  }

  const date = parse(dateStr, props.dateFormat, new Date())
  const matchesFormat = isMatch(dateStr, props.dateFormat)

  // If the external value is not a valid date, then we return null to
  // signify that the text inputs should remain unchanged
  if (!matchesFormat || !isValid(date)) {
    return null
  }

  // If the external value is a valid date, then we should update the inputs
  // to reflect the new value
  return {
    day: `${date.getDate()}`,
    month: `${date.getMonth() + 1}`,
    year: `${date.getFullYear()}`
  }
}

// INCOMING VALUES:
// The actual value of the field (in formkit for example) will be some kind of
// standardised date string (usually ISO), so we need to seperate the value into
// day, month and year values to be displayed in the each of the text fields.
// It get's tricky though, you need to ensure that if the incoming value is invalid
// that the users input does not get wiped away.
const ingestedValue = ingestValue(props.value)

// Populate the initial state on first render
const internalDay = ref<string>(ingestedValue ? ingestedValue.day : '')
const internalMonth = ref<string>(ingestedValue ? ingestedValue.month : '')
const internalYear = ref<string>(ingestedValue ? ingestedValue.year : '')

// Then make sure that any time the external value changes that we are properly
// injesting the new value.
watch(
  () => props.value,
  (newValue) => {
    const ingestedValue = ingestValue(newValue)

    if (ingestedValue) {
      internalDay.value = `${ingestedValue.day}`
      internalMonth.value = `${ingestedValue.month}`
      internalYear.value = `${ingestedValue.year}`
    }
  }
)

const handleChangeDay = (e) => {
  internalDay.value = e.target.value
  commitValue(e.target.value, internalMonth.value, internalYear.value)
}

const handleChangeMonth = (e) => {
  internalMonth.value = e.target.value
  commitValue(internalDay.value, e.target.value, internalYear.value)
}

const handleChangeYear = (e) => {
  internalYear.value = e.target.value
  commitValue(internalDay.value, internalMonth.value, e.target.value)
}

// OUTGOING VALUES:
// Anytime the user changes one of the inputs, we need to transform the seperate
// input values into a single formatted date string.
//   - If the user has entered a valid date, the outputted format is determined by
//     the 'dateFormat' prop.
//   - If the user has entered an invalid date, then a special string is outputted
//     in the format: 'Invalid date: <day>-<month>-<year>'.
//     For example 'Invalid date: 54-asd-2022'
//
// The reasoning for this special invalid date format is:
//   - Makes it very clear the date is invalid and that it shouldn't be parsed as
//     a date. Many 'invalid' date values will be parsed without throwing errors and
//     this could cause strange bugs without realising (e.g. 'asd-2-23' will successfully
//     parse as 'Fri Feb 23 2001')
//   - Including the raw user inputted values in the string allows error messages to
//     to target specific fields if neccasary.
const commitValue = (dayStr, monthStr, yearStr) => {
  const commitInvalid = () => {
    useFormkitFriendlyEventEmitter(
      props,
      emit,
      'onChange',
      `Invalid date: ${dayStr}-${monthStr}-${yearStr}`
    )
  }

  // All fields are empty, so just output an empty string
  if (!dayStr && !monthStr && !yearStr) {
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', '')
    return
  }

  // At least of the fields are empty, so this is invalid
  if (!dayStr || !monthStr || !yearStr) {
    commitInvalid()
    return
  }

  const day = /^[0-9]{1,2}$/.test(dayStr.trim()) ? parseInt(dayStr) : null
  const month = /^[0-9]{1,2}$/.test(monthStr.trim())
    ? parseInt(monthStr) - 1
    : null
  const year = /^[0-9]{4}$/.test(yearStr.trim()) ? parseInt(yearStr) : null

  // Exit here if the user inputted something other than DD MM YYYY into
  // any of the fields.
  if (day === null || month === null || year === null) {
    commitInvalid()
    return
  }

  const newDate = new Date(year, month, day)

  // Here we ensure that the user has inputted a day/month/year combination that actually
  // exists, rather than something like `99/99/9999` or `32/04/1999`
  // Javascript Dates will accept a value like '99/99/9999' and just overflow it to a value
  // like 'Aug 15 2034', so here we are double checking that the js date matches the day/month/year
  // that we originally gave it.
  if (
    newDate.getFullYear() !== year ||
    newDate.getMonth() !== month ||
    newDate.getDate() !== day
  ) {
    commitInvalid()
    return
  }

  if (!isValid(newDate)) {
    commitInvalid()
    return
  }

  const newValue = format(newDate, props.dateFormat)

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
}

const isPartInvalid = (part: DatePart) => {
  if (typeof props.invalid === 'boolean') {
    return props.invalid
  }

  if (Array.isArray(props.invalid) && props.invalid.includes(part)) {
    return true
  }

  return false
}

const handleUpdate = (event) => {
  emitRplEvent(
    'update',
    {
      ...event,
      id: props.id,
      label: props?.label
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-form-date">
    <div class="rpl-form-date__part">
      <label
        :for="`${id}__day`"
        class="rpl-form-date__part-label rpl-type-label-small"
      >
        Day
      </label>
      <RplFormInput
        :id="`${id}__day`"
        :name="`${id}__day`"
        :data-rpl-focus-input="id"
        centered-text
        :variant="variant"
        placeholder="DD"
        :value="internalDay"
        :disabled="disabled"
        :required="required"
        :invalid="isPartInvalid('day')"
        :aria-describedby="ariaDescribedby"
        :global-events="false"
        @update="handleUpdate"
        @input="handleChangeDay"
      />
    </div>
    <div class="rpl-form-date__part">
      <label
        :for="`${id}__month`"
        class="rpl-form-date__part-label rpl-type-label-small"
      >
        Month
      </label>
      <RplFormInput
        :id="`${id}__month`"
        :name="`${id}__month`"
        centered-text
        :variant="variant"
        placeholder="MM"
        :value="internalMonth"
        :disabled="disabled"
        :required="required"
        :invalid="isPartInvalid('month')"
        :aria-describedby="ariaDescribedby"
        :global-events="false"
        @update="handleUpdate"
        @input="handleChangeMonth"
      />
    </div>
    <div class="rpl-form-date__part">
      <label
        :for="`${id}__year`"
        class="rpl-form-date__part-label rpl-type-label-small"
      >
        Year
      </label>
      <RplFormInput
        :id="`${id}__year`"
        :name="`${id}__year`"
        centered-text
        :variant="variant"
        placeholder="YYYY"
        :value="internalYear"
        :disabled="disabled"
        :required="required"
        :invalid="isPartInvalid('day')"
        :aria-describedby="ariaDescribedby"
        :global-events="false"
        @update="handleUpdate"
        @input="handleChangeYear"
      />
    </div>
  </div>
</template>

<style src="./RplFormDate.css"></style>
