import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
import RplAcknowledgementTwig from './RplAcknowledgement.twig'

export default {
  title: 'HTML Components/Containers/Acknowledgement',
  render: (args) => renderTwig(RplAcknowledgementTwig, args),
  argTypes: {
    message: {
      control: 'text',
      description: 'The acknowledgement message to display'
    },
    aboriginalFlagUrl: {
      control: 'text',
      description: 'URL to the Aboriginal flag image'
    },
    torresStraitIslanderFlagUrl: {
      control: 'text',
      description: 'URL to the Torres Strait Islander flag image'
    }
  }
} satisfies Meta

type Story = StoryObj

export const Default: Story = {
  args: {}
}

export const CustomText: Story = {
  args: {
    message:
      'We acknowledge Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land.'
  }
}
