import type { Meta, StoryObj } from '@storybook/vue3'
import RplLayoutSkipLink from './RplLayoutSkipLink.vue'

export default {
  title: 'Core/Layout/Skip links',
  component: RplLayoutSkipLink,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof RplLayoutSkipLink>

type Story = StoryObj<typeof RplLayoutSkipLink>

export const StandAlone: Story = {
  render: () => ({
    components: { RplLayoutSkipLink },
    template: `
      <RplLayoutSkipLink target-id="main-content">Skip to main content</RplLayoutSkipLink>
      <p class="rpl-type-p rpl-u-padding-5">Use tab key to see skip link</p>
    `
  })
}
