<template>
  <RplForm
    id="tide-search-filter-form"
    :title="title"
    @submit="handleFilterSubmit"
  >
    <div class="rpl-u-margin-t-4 rpl-u-margin-b-4">
      <div class="rpl-grid tide-search-filters" style="--local-grid-cols: 12">
        <div
          v-for="filter in filterInputs"
          :key="filter.id"
          :class="`rpl-col-12 ${
            filter?.columns ? filter.columns : 'rpl-col-6-m'
          }`"
        >
          <component
            :is="filter.component"
            :id="filter.id"
            :name="filter.id"
            :modelValue="filterFormValues[filter.id]"
            v-bind="filter.props"
            :options="
              filter.props?.dynamicOptions?.length
                ? filter.props.dynamicOptions
                : filter.props?.options
            "
          ></component>
        </div>
      </div>
      <RplFormActions
        v-if="submitLabel"
        id="tide-search-filter-form-actions"
        :label="submitLabel"
        :resetLabel="resetLabel"
        :displayResetButton="!!resetLabel"
        @reset="handleFilterReset"
      />
    </div>
  </RplForm>
</template>

<script setup lang="ts">
type CollectionFilter = {
  component: string
  props: Record<string, any>
}

interface Props {
  title: string
  filterInputs: CollectionFilter[]
  filterFormValues: Record<string, any>
  submitLabel?: string | boolean
  resetLabel?: string | boolean
}

const emit = defineEmits<{
  (e: 'submit', payload: Record<string, any>): void
  (e: 'reset'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Apply search filters',
  resetLabel: 'Clear search filters'
})

const handleFilterReset = () => {
  emit('reset')
}

const handleFilterSubmit = (formValues) => {
  emit('submit', {
    text: props.submitLabel,
    value: formValues.data,
    type: 'button'
  })
}
</script>
