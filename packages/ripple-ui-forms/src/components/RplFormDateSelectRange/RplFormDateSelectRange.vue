<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { differenceInDays, addDays, format, parse } from 'date-fns'

import RplFormDateSelect from '../RplFormDateSelect/RplFormDateSelect.vue'

interface Props {
  id: string
  name: string
  label?: string
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
  value: undefined,
  variant: 'default',
  dateFormat: 'dd/MM/yyyy',
  ariaDescribedby: '',
  pii: true
})

// Initial prefill and then store state
const strDateFrom = ref()
strDateFrom.value = props.value?.from
  ? format(
      parse(props.value.from, props.dateFormat, new Date()),
      props.dateFormat
    )
  : ''
const strDateTo = ref()
strDateTo.value = props.value?.to
  ? format(
      parse(props.value.to, props.dateFormat, new Date()),
      props.dateFormat
    )
  : ''

const dateFrom = computed(() =>
  parse(strDateFrom.value, props.dateFormat, new Date())
)
const dateTo = computed(() =>
  parse(strDateTo.value, props.dateFormat, new Date())
)

// Manage state of highlighted fields
const highlightedRange = computed(() => {
  const days = []
  const between =
    strDateFrom.value && strDateTo.value
      ? differenceInDays(dateTo.value, dateFrom.value)
      : 0

  // Start date
  if (between) {
    days.push(format(dateFrom.value, props.dateFormat))
  }
  for (let i = 1; i <= between; i++) {
    days.push(format(addDays(dateFrom.value, i), props.dateFormat))
  }
  // End date if not included in diff
  if (between) {
    if (days[days.length - 1] !== strDateTo.value) {
      days.push(strDateTo)
    }
  }
  return days
}) as any
</script>

<template>
  <div class="rpl-form-date-select-range rpl-form-date-range">
    <RplFormDateSelect
      :id="`${id}-from`"
      :disabled="disabled"
      :range="highlightedRange"
      :name="`${id}-from`"
      :value="strDateFrom"
      :maxDate="strDateTo"
      sublabel="From"
      class="rpl-form-date-range--block"
      @update:value="(val) => (strDateFrom = val)"
      @change="onChange"
    />
    <RplFormDateSelect
      :id="`${id}-to`"
      :disabled="disabled"
      :range="highlightedRange"
      :name="`${id}-to`"
      :value="strDateTo"
      :minDate="strDateFrom"
      sublabel="To"
      class="rpl-form-date-range--block"
      @update:value="(val) => (strDateTo = val)"
      @change="onChange"
    />
  </div>
</template>

<style src="./RplFormDateSelectRange.css"></style>
