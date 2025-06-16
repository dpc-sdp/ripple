import RplTextLink from './RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

export default {
  title: 'Core/Navigation/Text link',
  component: RplTextLink,
  args: {
    url: 'https://www.vic.gov.au/non-visited'
  }
} satisfies Meta<typeof RplTextLink>

type Story = StoryObj<typeof RplTextLink>

const Template = (args: any) => ({
  components: { RplTextLink },
  setup() {
    return { args }
  },
  template:
    '<p class="sb-container rpl-type-p">This para contains a <RplTextLink @click.prevent="() => null" v-bind="args">{{ args.text }}</RplTextLink> in the middle.</p>'
})

export const Default: Story = {
  args: {
    text: 'link'
  },
  render: Template
}

export const ContentAccent: Story = {
  name: 'Example/Content/Accent',
  args: {
    text: 'voilà'
  },
  render: Template
}

export const ContentEmoji: Story = {
  name: 'Example/Content/Emoji',
  args: {
    text: '😍'
  },
  render: Template
}

export const ContentTarget: Story = {
  name: 'Example/Content/Target',
  render: (args: any) => ({
    components: { RplTextLink },
    setup() {
      return { args }
    },
    template: `<p class="sb-container rpl-type-p">This para contains a <RplTextLink v-bind="args" target="_blank">link that opens in a new window</RplTextLink> in the middle.</p>`
  })
}

export const ComponentIcon: Story = {
  name: 'Example/Component/Icon',
  render: (args: any) => ({
    components: { RplTextLink, RplIcon },
    setup() {
      return { args }
    },
    template: `<p class="sb-container rpl-type-p">This para contains an <RplTextLink v-bind="args"><RplIcon name="icon-pin" title="download icon"></RplIcon></RplTextLink> in the middle.</p>`
  })
}
