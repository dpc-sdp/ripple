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

interface Props {
  id: string
  name: string
  sublabel?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  value?:
    | string
    | {
        from: string
        to: string
      }
  minDate?: string
  maxDate?: string
  onChange: (value: string | string[]) => void
  dateFormat?: string
  ariaDescribedby?: string
  pii?: boolean
  range?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  sublabel: undefined,
  value: undefined,
  minDate: undefined,
  maxDate: undefined,
  dateFormat: 'dd/MM/yyyy',
  ariaDescribedby: '',
  pii: true,
  range: undefined
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

const markers = computed(() =>
  highlightedRange.value?.length > 0
    ? [
        {
          date: highlightedRange.value[0],
          type: 'line'
        },
        {
          date: highlightedRange.value[highlightedRange.value.length - 1],
          type: 'dot'
        }
      ]
    : undefined
)

const internalDate = ref()

// Emit event for range control to manage highlight state
watch(internalDate, (newValue) => {
  emit('update:value', format(newValue, props.dateFormat))
})

const internalDateString = computed(() => {
  if (markers?.value?.length === 2) {
    return {
      from: format(markers.value[0].date, props.dateFormat),
      to: format(markers.value[1].date, props.dateFormat)
    }
  }
  if (internalDate.value) {
    return format(internalDate.value, props.dateFormat)
  } else if (props.value) {
    return props.value
  }
  return ''
})

// Prefill value
if (props.value) {
  if (props.maxDate) {
    internalDate.value = markers.value[0].date
  } else if (props.minDate) {
    internalDate.value = markers.value[1].date
  } else {
    internalDate.value = parse(
      props.value as string,
      props.dateFormat,
      new Date()
    )
  }
  useFormkitFriendlyEventEmitter(
    props,
    emit,
    'onChange',
    internalDateString.value
  )
}

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
  highlight: highlightedRange?.value,
  markers: markers?.value,
  minDate: props.minDate
    ? parse(props.minDate, props.dateFormat, new Date())
    : undefined,
  maxDate: props.maxDate
    ? parse(props.maxDate, props.dateFormat, new Date())
    : undefined,
  autoApply: true,
  textInput: true,
  actionRow: {
    showPreview: false
  }
}))

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
