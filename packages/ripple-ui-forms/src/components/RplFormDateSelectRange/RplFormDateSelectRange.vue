<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { differenceInDays, addDays, format } from 'date-fns'

import RplFormDateSelect from '../RplFormDateSelect/RplFormDateSelect.vue'

interface Props {
  id: string
  name: string
  label?: string
  disabled?: boolean
  required?: boolean
  invalid?: boolean
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

const dateFrom = ref()
const dateTo = ref()

const highlightedRange = computed(() => {
  const days = []
  const between =
    dateFrom.value && dateTo.value
      ? differenceInDays(dateTo.value, dateFrom.value)
      : 0

  // Start date
  if (between) {
    days.push(format(dateFrom.value, props.dateFormat))
  }
  for (let i = 1; i <= between; i++) {
    days.push(format(addDays(dateFrom.value, i), props.dateFormat))
  }
  if (between) {
    const dateToString = format(dateTo.value, props.dateFormat)
    if (days[days.length - 1] !== dateToString) {
      days.push(dateToString)
    }
  }

  return days
}) as any
</script>

<template>
  <div class="rpl-form-date-select-range rpl-form-date-range">
    <RplFormDateSelect
      :id="`${id}-from`"
      :range="highlightedRange"
      :name="`${id}-from`"
      :max="dateTo"
      sublabel="From"
      class="rpl-form-date-range--block"
      @update:value="(val) => (dateFrom = val)"
      @change="onChange"
    />
    <RplFormDateSelect
      :id="`${id}-to`"
      :range="highlightedRange"
      :name="`${id}-to`"
      :min="dateFrom"
      sublabel="To"
      class="rpl-form-date-range--block"
      @update:value="(val) => (dateTo = val)"
      @change="onChange"
    />
  </div>
</template>

<style src="./RplFormDateSelectRange.css"></style>
