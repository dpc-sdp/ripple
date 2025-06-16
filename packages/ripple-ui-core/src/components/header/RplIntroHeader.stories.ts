import type { Meta, StoryObj } from '@storybook/vue3'
import RplIntroHeader from './RplIntroHeader.vue'
import RplContent from '../content/RplContent.vue'
import { RplIconNames } from '../icon/constants'

const Template = (args: any) => ({
  components: { RplIntroHeader, RplContent },
  setup() {
    return { args }
  },
  template: `
    <RplIntroHeader v-bind="args">
      <RplContent :html="args.content" />
    </RplIntroHeader>`
})

export default {
  title: 'Core/Containers/Header',
  component: RplIntroHeader,
  render: Template,
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    iconName: {
      control: { type: 'select' },
      options: RplIconNames
    }
  },
  args: {
    title: 'The intro title',
    content:
      '<p>In do dolore dolore sint ipsum est est, commodo ex laborum Lorem ut deserunt dolore ullamco.</p>'
  }
} satisfies Meta<typeof RplIntroHeader>

type Story = StoryObj<typeof RplIntroHeader>

export const Intro: Story = {}

export const IntroWithIcon: Story = {
  name: 'Intro/With icon',
  args: {
    iconName: 'icon-exclamation-circle-filled'
  }
}

export const IntroWithLinks: Story = {
  name: 'Intro/With links',
  args: {
    iconName: 'icon-information-circle-filled',
    links: {
      title: 'Want to know more',
      items: [
        { text: 'First links', url: '#first', icon: 'icon-arrow-right' },
        { text: 'Second link', url: '#second', icon: 'icon-arrow-right' },
        { text: 'A third link', url: '#third', icon: 'icon-arrow-right' }
      ]
    }
  }
}

export const WithButton: Story = {
  name: 'Intro/With button',
  args: {
    iconName: 'icon-information-circle-filled',
    links: {
      items: [{ text: 'First button', url: '#first' }],
      type: 'button'
    }
  }
}
