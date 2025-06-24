<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { differenceInDays, addDays, format, parse, isValid } from 'date-fns'

import RplFormDateSelect from '../RplFormDateSelect/RplFormDateSelect.vue'

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
  value?: {
    from: string
    to: string
  }
  onChange: (value: string | string[]) => void
  dateFormat?: string
  ariaDescribedby?: string
  pii?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  invalid: false,
  label: undefined,
  fromLabel: undefined,
  toLabel: undefined,
  value: undefined,
  variant: 'default',
  dateFormat: 'd/MM/yyyy',
  ariaDescribedby: '',
  pii: true
})

// Initial prefill and parse to date object
const strDateFrom = ref(props.value?.from || '')
const dateFrom = computed(() =>
  strDateFrom.value
    ? parse(strDateFrom.value, props.dateFormat, new Date())
    : undefined
)

const strDateTo = ref(props.value?.to || '')
const dateTo = computed(() =>
  strDateTo.value
    ? parse(strDateTo.value, props.dateFormat, new Date())
    : undefined
)

watch(props, (updated) => {
  if (updated) {
    strDateFrom.value = props.value?.from || ''
    strDateTo.value = props.value?.to || ''
  }
})

// Manage state of highlighted fields
const highlightedRange = computed(() => {
  const days = []

  // Start date
  if (isValid(dateFrom.value)) {
    days.push(format(dateFrom.value, props.dateFormat))
  }

  // If both dates are valid, calculate the range
  if (isValid(dateFrom.value) && isValid(dateTo.value)) {
    const between = differenceInDays(dateTo.value, dateFrom.value)

    for (let i = 1; i <= between; i++) {
      days.push(format(addDays(dateFrom.value, i), props.dateFormat))
    }
  }

  // End date
  if (isValid(dateTo.value)) {
    if (
      days.length === 0 ||
      (days.length > 0 &&
        days[days.length - 1] !== format(dateTo.value, props.dateFormat))
    ) {
      days.push(format(dateTo.value, props.dateFormat))
    }
  }

  return days
})
</script>

<template>
  <div class="rpl-form-date-select-range rpl-form-date-range">
    <RplFormDateSelect
      :id="`${id}-from`"
      :disabled="disabled"
      :range="highlightedRange"
      :rangedMode="`start`"
      :name="`${id}-from`"
      :value="strDateFrom"
      :maxDate="strDateTo"
      :sublabel="fromLabel || 'From'"
      class="rpl-form-date-range--block"
      @update:value="(val) => (strDateFrom = val)"
      @change="onChange"
    />
    <RplFormDateSelect
      :id="`${id}-to`"
      :disabled="disabled"
      :range="highlightedRange"
      :rangedMode="`end`"
      :name="`${id}-to`"
      :value="strDateTo"
      :minDate="strDateFrom"
      :sublabel="toLabel || 'To'"
      class="rpl-form-date-range--block"
      @update:value="(val) => (strDateTo = val)"
      @change="onChange"
    />
  </div>
</template>

<style src="./RplFormDateSelectRange.css"></style>
