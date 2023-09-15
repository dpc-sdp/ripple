<template>
  <div class="rpl-form__outer tide-search-sort-options" data-invalid="false">
    <div class="rpl-form__wrapper">
      <RplFormLabel for="search-listing-sort-options">Sort by</RplFormLabel>
      <div class="rpl-form__inner">
        <RplFormDropdown
          id="search-listing-sort-options"
          name="search-listing-sort-options"
          label="Sort by"
          labelId="search-listing-sort-options-label"
          :options="dropdownOptions"
          :value="currentValue"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TideSearchListingSortOption } from '../types'
import { computed } from 'vue'

interface Props {
  sortOptions: TideSearchListingSortOption[]
  currentValue: string | null
}

const props = defineProps<Props>()

const emit = defineEmits(['change'])

const dropdownOptions = computed(() => {
  return (props.sortOptions || []).map((option) => {
    return {
      id: option.id,
      label: option.label,
      value: option.id
    }
  })
})

const handleChange = (value) => {
  emit('change', value)
}
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-sort-options .rpl-form__wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--rpl-sp-4);
}

.tide-search-sort-options .rpl-form-label {
  margin-bottom: 0;
}

.tide-search-sort-options .rpl-form__inner {
  flex-grow: 1;

  @media (--rpl-bp-m) {
    flex-grow: 0;
    width: 300px;
  }
}
</style>
