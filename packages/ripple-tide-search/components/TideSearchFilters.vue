<template>
  <RplForm
    v-if="staticFacetOptions !== null"
    id="tide-search-filter-form"
    v-model:model-value="filterFormModel"
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
          :name="filter.field"
          v-bind="filter.props"
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
import { ref } from 'vue'

type FacetOptionType = {
  id: string
  label: string
  value: string
}

type CollectionFilter = {
  component: string
  props: Record<string, any>
}

interface Props {
  staticFacetOptions: null | Record<string, FacetOptionType[]>
  filterInputs: CollectionFilter[]
  filterFormValues: FilterFormModel[]
  submitLabel?: string | boolean
  resetLabel?: string | boolean
}

const emit = defineEmits<{
  (e: 'submit', payload: FilterFormModel[]): void
  (e: 'reset'): void
}>()

const props = withDefaults(defineProps<Props>(), {
  submitLabel: 'Apply search filters',
  resetLabel: 'Clear search filters'
})

const filterFormModel = ref(props.filterFormValues)

function handleFilterReset() {
  emit('reset')
}

function handleFilterSubmit() {
  emit('submit', filterFormModel.value)
}
</script>
