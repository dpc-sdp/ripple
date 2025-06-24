<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { format, parse, isValid } from 'date-fns'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter.js'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

interface Props {
  id: string
  name: string
  sublabel?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  value?: string
  minDate?: string
  maxDate?: string
  onChange: (value: string | string[]) => void
  dateFormat?: string
  ariaDescribedby?: string
  pii?: boolean
  range?: string[]
  rangedMode?: string
  rangedState?: {
    from?: string
    to?: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  sublabel: undefined,
  value: undefined,
  minDate: undefined,
  maxDate: undefined,
  dateFormat: 'd/MM/yyyy',
  ariaDescribedby: '',
  pii: true,
  range: undefined,
  rangedMode: undefined,
  rangedState: () => ({
    from: '',
    to: ''
  })
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
  (e: 'update:value', value: string): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date', emit)

const highlightedRange = computed(() =>
  props.range?.map((val) => parse(val, props.dateFormat, new Date()))
)

const rangeLimits = computed(() => {
  if (
    highlightedRange.value &&
    (highlightedRange.value?.length > 1 ||
      (highlightedRange.value?.length === 2 &&
        highlightedRange.value[0] === highlightedRange.value[1]))
  ) {
    return {
      start: highlightedRange.value[0],
      end: highlightedRange.value[highlightedRange.value.length - 1]
    }
  }

  return undefined
})

const markers = computed(() => {
  if (!rangeLimits.value) {
    return undefined
  }

  const markerArray = []
  if (rangeLimits.value.start) {
    markerArray.push({
      date: rangeLimits.value.start,
      type: 'line'
    })
  }
  if (rangeLimits.value.end) {
    markerArray.push({
      date: rangeLimits.value.end,
      type: 'dot'
    })
  }

  return markerArray
})

const internalDate: Date | undefined = ref()

// Emit event for range control to manage highlight state
watch(internalDate, (newValue) => {
  emit(
    'update:value',
    isValid(newValue) ? format(newValue, props.dateFormat) : ''
  )
  useFormkitFriendlyEventEmitter(
    props,
    emit,
    'onChange',
    internalDateString.value
  )
})

const internalDateString = computed(() => {
  // Range mode
  if (props.rangedMode) {
    return {
      from: props.rangedState.from ? props.rangedState.from : undefined,
      to: props.rangedState.to ? props.rangedState.to : undefined
    }
  }

  // Single date mode, date has been selected
  if (internalDate.value) {
    return isValid(internalDate.value)
      ? format(internalDate.value, props.dateFormat)
      : ''
  }

  // Prefilled value
  if (props.value) {
    return props.value
  }

  return ''
})

// Prefill value
if (props.value) {
  internalDate.value = parse(props.value, props.dateFormat, new Date())
  useFormkitFriendlyEventEmitter(
    props,
    emit,
    'onChange',
    internalDateString.value
  )
}

// Update from range
watch(
  () => props.value,
  (updated) => {
    if (updated) {
      internalDate.value = parse(props.value, props.dateFormat, new Date())
      useFormkitFriendlyEventEmitter(
        props,
        emit,
        'onChange',
        internalDateString.value
      )
    }
  }
)

// Vue-datepicker config
const params = computed(() => ({
  enableTimePicker: false,
  disabled: props.disabled,
  name: props.name,
  id: props.id,
  format: 'd/MM/yyyy',
  placeholder: 'dd/mm/yyyy',
  dayNames: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  locale: 'en-AU',
  offset: '0',
  hideOffsetDates: true,
  highlight:
    highlightedRange?.value?.length > 1 ? highlightedRange.value : undefined,
  markers: highlightedRange?.value?.length > 1 ? markers?.value : undefined,
  minDate:
    highlightedRange.value?.length > 0 &&
    props.minDate !== '' &&
    props.minDate !== undefined
      ? parse(props.minDate, props.dateFormat, new Date())
      : null,
  maxDate:
    highlightedRange.value?.length > 0 &&
    props.maxDate !== '' &&
    props.maxDate !== undefined
      ? parse(props.maxDate, props.dateFormat, new Date())
      : null,
  startDate: internalDate.value ? internalDate.value : undefined,
  autoApply: true,
  textInput: true,
  actionRow: {
    showPreview: false
  }
}))

watch(internalDate, (updated) => {
  if (updated) {
    useFormkitFriendlyEventEmitter(
      updated,
      emit,
      'onChange',
      internalDateString.value
    )
  }
})

const handleUpdate = (event) => {
  emitRplEvent(
    'update',
    {
      ...event,
      id: props.id,
      label: `${props.label ? props.label : ''}${props.sublabel ? ' - ' + props.sublabel : ''}`,
      value: sanitisePIIField(props.pii, props?.value)
    },
    { global: true }
  )
}

// Vue-datepicker custom month/year selection
type UpdateMonthYear = (month: number, year: number) => void

const updateMonth = (
  event: InputEvent,
  updateMonthYear: UpdateMonthYear,
  year: number
) => {
  updateMonthYear(+(event.target as HTMLSelectElement).value, year)
}

const updateYear = (
  event: InputEvent,
  updateMonthYear: UpdateMonthYear,
  month: number
) => {
  updateMonthYear(month, +(event.target as HTMLSelectElement).value)
}

// Class helper
const classes = computed(() => [
  'rpl-form-date-select',
  highlightedRange.value?.length > 0
    ? 'rpl-form-date-select--highlighted'
    : null
])
</script>

<template>
  <div :class="classes">
    <label v-if="sublabel" :for="id" class="rpl-form-label rpl-type-h4-fixed">{{
      sublabel
    }}</label>
    <VueDatePicker
      v-model="internalDate"
      v-bind="params"
      @update="handleUpdate"
    >
      <template
        #month-year="{
          month,
          year,
          months,
          years,
          updateMonthYear,
          handleMonthYearChange
        }"
      >
        <span class="custom-icon" @click="handleMonthYearChange(false)">
          <RplIcon size="xs" name="icon-chevron-left" />
        </span>
        <div class="custom-month-year-component">
          <select
            class="select-input"
            :value="month"
            @change="
              updateMonth(
                $event as InputEvent,
                updateMonthYear as UpdateMonthYear,
                year
              )
            "
          >
            <option v-for="m in months" :key="m.value" :value="m.value">
              {{ m.text }}
            </option>
          </select>
          <select
            class="select-input"
            :value="year"
            @change="
              updateYear(
                $event as InputEvent,
                updateMonthYear as UpdateMonthYear,
                month
              )
            "
          >
            <option v-for="y in years" :key="y.value" :value="y.value">
              {{ y.text }}
            </option>
          </select>
        </div>
        <span class="custom-icon" @click="handleMonthYearChange(true)">
          <RplIcon size="xs" name="icon-chevron-right" />
        </span>
      </template>
      <template #input-icon>
        <RplIcon name="icon-calendar-lined" />
      </template>
      <template #action-row></template>
    </VueDatePicker>
  </div>
</template>

<style src="./RplFormDateSelect.css"></style>
