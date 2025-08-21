import type { Meta, StoryObj } from '@storybook/vue3'
import RplDescriptionList from './RplDescriptionList.vue'
import RplDescriptionListItem from './RplDescriptionListItem.vue'
import RplTextLink from '../text-link/RplTextLink.vue'

export default {
  title: 'Core/Containers/Description list',
  component: RplDescriptionList,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'icon']
    }
  }
} satisfies Meta<typeof RplDescriptionList>

type Story = StoryObj<typeof RplDescriptionList>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    items: [
      { term: 'Author:', description: 'Department of Premier and Cabinet' },
      { term: 'Date:', description: 'November 2021' }
    ]
  }
}

export const DefaultLongTitle: Story = {
  name: 'Default / Long title',
  args: {
    items: [
      { term: 'Author:', description: 'Department of Premier and Cabinet' },
      { term: 'Date:', description: 'November 2021' },
      {
        term: 'Content:',
        description:
          'This is a line of text to use for testing extreme long-title edge cases: it is so long that it will not only fill, but also overflow, the entire width of an ordinary device.'
      }
    ]
  }
}

export const DefaultWithIcons: Story = {
  name: 'Default / With icons',
  args: {
    items: [
      {
        term: 'Date:',
        description: '17th of November 2021',
        iconName: 'icon-exclamation-circle-filled'
      },
      {
        term: 'Author:',
        description: 'Department of Premier and Cabinet',
        iconName: 'icon-user-circle-filled'
      },
      {
        term: 'Content:',
        description: 'And here is some interesting content.',
        iconName: 'icon-document'
      }
    ]
  }
}

export const Inline: Story = {
  args: {
    inline: true,
    items: [
      { term: 'Author:', description: 'Department of Premier and Cabinet' },
      { term: 'Date:', description: 'November 2021' }
    ]
  }
}

export const InlineLongTitle: Story = {
  name: 'Inline / Long title',
  args: {
    inline: true,
    items: [
      { term: 'Author:', description: 'Department of Premier and Cabinet' },
      { term: 'Date:', description: 'November 2021' },
      {
        term: 'Content:',
        description:
          'This is a line of text to use for testing extreme long-title edge cases: it is so long that it will not only fill, but also overflow, the entire width of an ordinary device.'
      }
    ]
  }
}

export const InlineWithIcons: Story = {
  name: 'Inline / With icons',
  args: {
    inline: true,
    items: [
      {
        term: 'Closes:',
        description: '2nd of June 2023',
        iconName: 'icon-exclamation-circle-filled',
        iconColour: 'warning'
      },
      {
        term: 'Admission:',
        description: 'Entry is free',
        iconName: 'icon-check-circle-filled',
        iconColour: 'success'
      },
      {
        term: 'Content:',
        description:
          'This is a line of text to use for testing extreme long-title edge cases: it is so long that it will not only fill, but also overflow, the entire width of an ordinary device.',
        iconName: 'icon-document'
      }
    ]
  }
}

export const WithLink: Story = {
  render: (args) => ({
    components: { RplDescriptionList, RplDescriptionListItem, RplTextLink },
    setup() {
      return { args }
    },
    template: `<RplDescriptionList v-bind="args">
      <RplDescriptionListItem term="Name:">Nils Olav</RplDescriptionListItem>
      <RplDescriptionListItem term="Species:">Penguin</RplDescriptionListItem>
      <RplDescriptionListItem term="Website:">Learn <RplTextLink url="#">more about Nils</RplTextLink></RplDescriptionListItem>
    </RplDescriptionList>`
  })
}

export const IconsOnly: Story = {
  args: {
    variant: 'icon',
    items: [
      {
        term: 'Closes:',
        description: '2nd of June 2023',
        iconName: 'icon-exclamation-circle-filled',
        iconColour: 'warning'
      },
      {
        term: 'Admission:',
        description: 'Entry is free before 9am',
        iconName: 'icon-check-circle-filled',
        iconColour: 'success'
      }
    ]
  }
}
