import type { Meta, StoryObj } from '@storybook/vue3'
import RplSummaryList from './RplSummaryList.vue'
import { bpMin } from '../../lib/breakpoints'

export default {
  title: 'Core/Containers/Summary List',
  component: RplSummaryList
} satisfies Meta<typeof RplSummaryList>

type Story = StoryObj<typeof RplSummaryList>

export const Default: Story = {
  args: {
    name: 'A summary list',
    items: [
      {
        id: 'first_name',
        label: 'First name',
        value: 'John'
      },
      {
        id: 'last_name',
        label: 'Last name',
        value: 'Doe'
      },
      {
        id: 'information',
        label: 'Information',
        value:
          'Exercitation non cillum pariatur minim et ex elit adipisicing velit consequat ipsum occaecat et Lorem. Anim ad nostrud eiusmod.'
      }
    ]
  }
}

export const WithSlots: Story = {
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    title: 'Summary list about...',
    displayAction: true,
    items: [
      {
        id: 'name',
        label: 'Name',
        value: 'Melbourne High School'
      },
      {
        id: 'location',
        label: 'Location',
        value: '13 West Road'
      },
      {
        id: 'information',
        label: 'Information',
        value:
          'Exercitation non cillum pariatur minim et ex elit adipisicing velit consequat ipsum occaecat et Lorem. Anim ad nostrud eiusmod.'
      }
    ]
  },
  render: (args) => ({
    components: { RplSummaryList },
    setup() {
      return { args }
    },
    template: `
      <RplSummaryList :title="args.title" :displayAction="args.displayAction" :items="args.items">
        <template #label="{ item: { label } }">
          <em>{{label}}</em>
        </template>
        <template #value="{ item: { value } }">
          <mark>{{value}}</mark>
        </template>
        <template #action="{ item: { id } }">
          <a v-if="id === 'location' || id === 'information'" class="rpl-text-link rpl-u-focusable-inline" href="#">
            <span v-if="id === 'location'">Get directions</span>
            <span v-else-if="id === 'information'">Find out more</span>
          </a>
        </template>
      </RplSummaryList>
    `
  })
}
