<script setup lang="ts">
import { computed } from 'vue'
import RplFormAutocomplete from '../../ripple-ui-forms/src/components/RplFormAutocomplete/RplFormAutocomplete.vue'

const baseSuggestions = [
  { id: 'apple', label: 'Apple' },
  { id: 'banana', label: 'Banana' },
  { id: 'cherry', label: 'Cherry' },
  { id: 'date', label: 'Date' },
  { id: 'elderberry', label: 'Elderberry' },
  { id: 'fig', label: 'Fig' },
  { id: 'grape', label: 'Grape' }
]

// Predefined custom scenarios for testing
const scenarios: {
  [key: string]: any
} = {
  'label-value': {
    suggestions: [
      { code: 'au', name: 'Australia' },
      { code: 'at', name: 'Austria' }
    ],
    getOptionId: (item: any) => item.code ?? item.id,
    renderSuggestionLabel: (item: any) => item.name ? `Country: ${item.name}` : item.label,
    renderValueLabel: (item: any) => item.name ? `Country - ${item.name}` : item.label
  },
  'no-results-slot': true,
  'suggestions-slot': {
    suggestions: [
      { id: '1', label: 'One' }
    ]
  }
}

interface Props {
  id: string
  labelId: string
  placeholder: string
  showNoResults?: boolean
  isFreeText?: boolean
  disabled?: boolean
  iconPosition?: 'none' | 'left'
  showAction?: boolean
  actionLabel?: string
  customScenario?: string
  getOptionId?: typeof scenarios.getOptionId
  renderSuggestionLabel?: typeof scenarios.renderSuggestionLabel
  renderValueLabel?: typeof scenarios.renderValueLabel
}

const props = withDefaults(defineProps<Props>(), {
  showNoResults: false,
  isFreeText: false,
  disabled: false,
  iconPosition: 'none',
  showAction: false,
  actionLabel: 'Action',
  customScenario: undefined,
  getOptionId: (opt: any) => opt.id,
  renderSuggestionLabel: (item: any) => item?.label,
  renderValueLabel: (item: any) => item?.label
})

const emit = defineEmits<{
  onChange: [value: any]
  onSelectOption: [value: any]
  onActionClick: []
}>()

// Fetch happens in browser, not Node
const getSuggestions = (input: string) => {
  switch (props.customScenario) {
    case 'label-value': {
      return Promise.resolve(scenarios['label-value'].suggestions)
    }
    case 'no-results-slot': {
      return Promise.resolve([])
    }
    case 'suggestions-slot': {
      return Promise.resolve(scenarios['suggestions-slot'].suggestions)
    }
    default: {
      const filtered = baseSuggestions.filter((f) =>
        f.label.toLowerCase().includes(input.toLowerCase())
      )
      return Promise.resolve(filtered)
    }
  }
}

const getOptionId = computed(() => {
  switch (props.customScenario) {
    case 'label-value': {
      return scenarios['label-value'].getOptionId
    }
    default: {
      return undefined
    }
  }
})

const renderSuggestionLabel = computed(() => {
  switch (props.customScenario) {
    case 'label-value': {
      return scenarios['label-value'].renderSuggestionLabel
    }
    default: {
      return undefined
    }
  }
})

const renderValueLabel = computed(() => {
  switch (props.customScenario) {
    case 'label-value': {
      return scenarios['label-value'].renderValueLabel
    }
    default: {
      return props.renderValueLabel
    }
  }
})

</script>

<template>
  <RplFormAutocomplete
    :id="id"
    :label-id="labelId"
    :placeholder="placeholder"
    :get-suggestions="getSuggestions"
    :show-no-results="showNoResults"
    :is-free-text="isFreeText"
    :disabled="disabled"
    :icon-position="iconPosition"
    :show-action="showAction"
    :action-label="actionLabel"
    :get-option-id="getOptionId"
    :render-suggestion-label="renderSuggestionLabel"
    :render-value-label="renderValueLabel"
    @onChange="emit('onChange', $event)"
    @onSelectOption="emit('onSelectOption', $event)"
    @onActionClick="emit('onActionClick')"
  >
    <template v-if="customScenario == 'no-results-slot'" #noresults>
      <div class="rpl-form-autocomplete__menu">
        <span class="rpl-form-autocomplete__menu-noresults">
          <div class="custom-no-results">Nothing to see here</div>
        </span>
      </div>
    </template>
    <template v-if="customScenario == 'suggestions-slot'" #suggestion="sugg">
      My custom {{ sugg.option.option.label }}
    </template>
  </RplFormAutocomplete>
</template>
