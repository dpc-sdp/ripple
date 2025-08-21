import type { Meta, StoryObj } from '@storybook/vue3'
import RplKeyDatesCard from './RplKeyDatesCard.vue'

type ExtendedKeyDatesCard = Partial<typeof RplKeyDatesCard> & {
  number: 1 | 2 | 4 | 8
}

export default {
  title: 'Core/Navigation/Card',
  component: RplKeyDatesCard,
  argTypes: {
    number: {
      control: { type: 'select' },
      options: [1, 2, 4, 8]
    }
  }
} satisfies Meta<ExtendedKeyDatesCard>

type Story = StoryObj<ExtendedKeyDatesCard>

export const KeyDates: Story = {
  args: {
    number: 1,
    title: 'Key calendar dates',
    ctaTitle: 'Find all public holidays',
    url: 'https://business.vic.gov.au/business-information/public-holidays/victorian-public-holidays-2022',
    items: [
      {
        title: 'Friday 23 September',
        subtitle: 'Friday before the AFL Grand Final',
        content:
          'Friday before AFL Grand Final typically falls on the last Friday in September.'
      },
      {
        title: 'Tuesday 1 November',
        subtitle: 'Melbourne Cup',
        content:
          'Public holiday across Victoria unless an alternate local holiday has been arranged by a non-metro council.'
      }
    ]
  },
  render: (args) => ({
    components: { RplKeyDatesCard },
    setup() {
      return { args }
    },
    template: `
      <div class="rpl-storybook__page rpl-grid">
        <RplKeyDatesCard
          v-for="index of args.number"
          :key="index"
          v-bind="args"
          class="rpl-col-12 rpl-col-6-m rpl-col-4-l"
        />
      </div>
    `
  })
}
