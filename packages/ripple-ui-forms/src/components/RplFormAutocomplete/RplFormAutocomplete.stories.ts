import { ref } from 'vue'
import { action } from 'storybook/actions'
import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormAutocomplete from './RplFormAutocomplete.vue'
import { RplButton } from '@dpc-sdp/ripple-ui-core/vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'

const mockSuggestionsHandler = async (inputValue: string) => {
  const sports = [
    { id: '1', label: 'Australian Rules Football' },
    { id: '2', label: 'Baseball' },
    { id: '3', label: 'Basketball' },
    { id: '4', label: 'Cricket' },
    { id: '5', label: 'Football' },
    { id: '6', label: 'Hockey' },
    { id: '7', label: 'Field Hockey' },
    { id: '8', label: 'Ice Hockey' }
  ]

  if (!inputValue) {
    return []
  }

  return sports.filter((sport) =>
    sport.label.toLowerCase().includes(inputValue.toLowerCase())
  )
}

const mockSuggestionValueHandler = async (option: any) => {
  const detailedSportsInfo = {
    '1': {
      id: '1',
      label: 'Australian Rules Football',
      description:
        'A contact sport played between two teams of eighteen players on an oval-shaped field.'
    },
    '2': {
      id: '2',
      label: 'Baseball',
      description:
        'A bat-and-ball game played between two opposing teams who take turns batting and fielding.'
    },
    '3': {
      id: '3',
      label: 'Basketball',
      description:
        'A team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.'
    },
    '4': {
      id: '4',
      label: 'Cricket',
      description:
        'A bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard pitch.'
    },
    '5': {
      id: '5',
      label: 'Football',
      description:
        'A family of team sports that involve, to varying degrees, kicking a ball to score a goal.'
    },
    '6': {
      id: '6',
      label: 'Hockey',
      description:
        "A sport in which two teams play against each other by trying to maneuver a ball or a puck into the opponent's goal using a hockey stick."
    },
    '7': {
      id: '7',
      label: 'Field Hockey',
      description:
        'A team sport of the hockey family played on grass, watered turf, artificial turf or synthetic field, as well as an indoor boarded surface.'
    },
    '8': {
      id: '8',
      label: 'Ice Hockey',
      description:
        "A contact team sport played on ice, in which two teams of skaters use their sticks to shoot a vulcanized rubber puck into their opponent's net to score points."
    }
  }

  return detailedSportsInfo[option.id]
}

const Template = (args: any) => ({
  components: { RplFormAutocomplete, RplButton, StorybookInputFixture },
  setup() {
    const currentValue = ref(args.value || null)

    const getSuggestionsHandler = mockSuggestionsHandler
    const getSuggestionValueHandler = mockSuggestionValueHandler

    const handleChange = (value: any) => (currentValue.value = value)

    return {
      args,
      getSuggestionsHandler,
      getSuggestionValueHandler,
      handleChange,
      currentValue
    }
  },
  template: `
      <RplButton class="rpl-u-margin-b-6">Button above to test keyboard behaviour (not part of autocomplete)</RplButton>
       <StorybookInputFixture :showFormValue="true" :invalid="args.invalid" :labelId="args.labelId" :fieldId="args.id" :value="currentValue">
        <RplFormAutocomplete
          v-bind="args"
          :value="currentValue"
          @onChange="handleChange"
          :getSuggestions="getSuggestionsHandler"
          :getSuggestionValue="getSuggestionValueHandler"
          actionLabel="Do something"
          :showAction="true"
        />
      </StorybookInputFixture>
      <RplButton class="rpl-u-margin-t-6">Button below to test keyboard behaviour (not part of autocomplete)</RplButton>
    `
})

export default {
  title: 'Forms/Autocomplete',
  component: RplFormAutocomplete,
  render: Template,
  args: {
    placeholder: 'Select',
    labelId: 'example-label-id'
  }
} satisfies Meta<typeof RplFormAutocomplete>

type Story = StoryObj<typeof RplFormAutocomplete>

export const FreeTextStory: Story = {
  name: 'free text',
  args: {
    id: 'free-text',
    isFreeText: true
  }
}

export const ObjectStory: Story = {
  name: 'object value',
  args: {
    id: 'object-value',
    isFreeText: false
  }
}
