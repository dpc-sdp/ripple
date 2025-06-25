import type { Meta, StoryObj } from '@storybook/vue3'
import RplPageLinks from './RplPageLinks.vue'
import RplPageLinksItem from './RplPageLinksItem.vue'

const Template = (args: any) => ({
  components: { RplPageLinks, RplPageLinksItem },
  setup() {
    return { args }
  },
  template: `
    <div class="rpl-storybook__page">
      <RplPageLinks>
        <RplPageLinksItem v-if="args.prev" direction="prev" v-bind="args.prev">
          {{ args.prev.description }}
        </RplPageLinksItem>
        <RplPageLinksItem v-if="args.next" direction="next" v-bind="args.next">
          {{ args.next.description }}
        </RplPageLinksItem>
      </RplPageLinks>
    </div>`
})

type ExtendedPageLinksProps = Partial<typeof RplPageLinks> &
  Partial<typeof RplPageLinksItem>

export default {
  title: 'Core/Navigation/Page links',
  component: RplPageLinks,
  render: Template
} satisfies Meta<ExtendedPageLinksProps>

type Story = StoryObj<ExtendedPageLinksProps>

export const PageLinks: Story = {
  args: {
    prev: { description: 'Check out this page', url: '#page' },
    next: { description: 'Another page to look at', url: '#another-page' }
  }
}

export const ExampleCount: Story = {
  name: 'Example/Count',
  args: {
    prev: { description: '2 of 5', url: '#page' },
    next: { description: '4 of 5', url: '#another-page' }
  }
}

export const ExampleFinalPage: Story = {
  name: 'Example/Final page',
  args: {
    prev: { description: 'The title of a page', url: '#page' }
  }
}

export const ExampleDescriptions: Story = {
  name: 'Example/Descriptions',
  args: {
    prev: {
      label: 'Custom label',
      description: 'Check out this page',
      url: '#page'
    },
    next: {
      label: 'Another custom label',
      description:
        'Another page to look at like the others, but this one has an incredibly over-long description that should break a typical line with its outrageously dense verbiage',
      url: '#another-page'
    }
  }
}
