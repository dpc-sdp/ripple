import type { Meta, StoryObj } from '@storybook/vue3'
import RplSocialShare from './RplSocialShare.vue'
import { RplSocialShareNetworks } from './constants'

export default {
  title: 'Core/Navigation/Social share',
  component: RplSocialShare,
  args: {
    pagetitle: 'Sample page title',
    url: 'https://www.vic.gov.au/sample-page'
  }
} satisfies Meta<typeof RplSocialShare>

type Story = StoryObj<typeof RplSocialShare>

export const SocialShare: Story = {}

export const WithMore: Story = {
  args: {
    networks: Object.keys(RplSocialShareNetworks)
  }
}

export const WithEmail: Story = {
  args: {
    email: {
      subject: 'The email subject',
      body: 'The email content.'
    }
  }
}
