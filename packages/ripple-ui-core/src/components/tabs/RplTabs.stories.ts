import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import RplTabs from './RplTabs.vue'

const Template = (args: any) => ({
  components: { RplTabs },
  setup() {
    const activeTab = ref('default')
    const handleTabChange = ({ key }: { key: string }) =>
      (activeTab.value = key)
    return { args, activeTab, handleTabChange }
  },
  template: `
    <RplTabs v-bind="args" :activeTab="args?.activeTab || activeTab" @toggleTab="handleTabChange" />
    <div id="panel-default"></div>
    <div id="panel-extra"></div>
    <div id="panel-more"></div>`
})

export default {
  title: 'Core/Navigation/Tabs',
  component: RplTabs,
  render: Template,
  argTypes: {
    activeTab: {
      control: { type: 'text' }
    },
    mode: {
      control: 'radio',
      options: ['horizontal', 'vertical']
    }
  },
  args: {
    tabs: [
      { title: 'Default', key: 'default' },
      { title: 'Extra', key: 'extra' },
      { title: 'More', key: 'more', icon: 'pin' }
    ]
  }
} satisfies Meta<typeof RplTabs>

type Story = StoryObj<typeof RplTabs>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    mode: 'horizontal'
  }
}

export const Vertical: Story = {
  args: {
    mode: 'vertical'
  }
}

export const HtmlTitles: Story = {
  name: 'HTML titles',
  args: {
    tabs: [
      { title: 'Some <em>italic</em> text', key: 'default' },
      { title: 'Some <sup>sup</sup> text', key: 'extra' },
      { title: 'More', key: 'more', icon: 'pin' }
    ],
    mode: 'horizontal'
  }
}
