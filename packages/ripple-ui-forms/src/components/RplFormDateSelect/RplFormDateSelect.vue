<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { watch, ref, computed, type Ref } from 'vue'
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
  value?: string
  onChange: (value: string | string[]) => void
  onUpdate?: (value: string | string[]) => void
  dateFormat?: string
  ariaDescribedby?: string
  pii?: boolean
  range?: Ref
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  label: undefined,
  value: undefined,
  onUpdate: undefined,
  dateFormat: 'yyyy-MM-dd',
  ariaDescribedby: '',
  pii: true,
  range: ref()
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-date', emit)

const internalDate = props.range || ref()

if (props.value && props.range === undefined) {
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
  placeholder: 'dd/mm/yyyy',
  dayNames: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  locale: 'en-AU',
  offset: '0',
  hideOffsetDates: true,
  autoApply: true,
  partialRange: true,
  modelAuto: true,
  textInput: true,
  actionRow: {
    showPreview: false
  }
}

watch(
  () => internalDate.value,
  (updated) => {
    if (updated && !props.onUpdate) {
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
  if (props.onUpdate) {
    return
  }
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
</script>

<template>
  <div class="rpl-form-date-select">
    <label v-if="label" :for="id" class="rpl-form-label rpl-type-h4-fixed">{{
      label
    }}</label>
    <VueDatePicker
      v-model="internalDate"
      v-bind="params"
      @update="onUpdate || handleUpdate"
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
