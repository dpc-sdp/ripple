<template>
  <RplForm
    id="tide-search-filter-form"
    class="rpl-u-margin-t-6"
    @submit="handleFilterSubmit"
  >
    <div class="rpl-grid rpl-grid--no-row-gap tide-search-filters">
      <div
        v-for="filter in filterInputs"
        :key="filter.id"
        class="rpl-col-12 rpl-col-6-m"
      >
        <component
          :is="filter.component"
          :id="filter.id"
          :name="filter.id"
          :modelValue="filterFormValues[filter.id]"
          v-bind="filter.props"
          :options="
            filter.props.dynamicOptions?.length
              ? filter.props.dynamicOptions
              : filter.props.options
          "
        ></component>
      </div>
    </div>
    <RplFormActions
      v-if="submitLabel"
      :label="submitLabel"
      :resetLabel="resetLabel"
      :displayResetButton="resetLabel"
      @reset="handleFilterReset"
    />
  </RplForm>
</template>

<script setup lang="ts">
import { FilterFormModel } from 'ripple-tide-search/types'

type CollectionFilter = {
  component: string
  props: Record<string, any>
}

interface Props {
  filterInputs: CollectionFilter[]
  filterFormValues: FilterFormModel
  submitLabel?: string | boolean
  resetLabel?: string | boolean
}

const emit = defineEmits<{
  (e: 'submit', payload: FilterFormModel[]): void
  (e: 'reset'): void
}>()

withDefaults(defineProps<Props>(), {
  submitLabel: 'Apply search filters',
  resetLabel: 'Clear search filters'
})

const handleFilterReset = () => {
  emit('reset')
}

const handleFilterSubmit = (formValues) => {
  emit('submit', formValues.data)
}
</script>
