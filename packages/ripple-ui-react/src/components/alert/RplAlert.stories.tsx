import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  alertVariants,
  rplAlertDefaults,
  type RplAlertProps
} from '@dpc-sdp/ripple-ui-shared/contracts'

import { RplAlert } from './RplAlert'

const meta = {
  title: 'Components/Alert',
  component: RplAlert,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: alertVariants
    }
  }
} satisfies Meta<typeof RplAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    ...(rplAlertDefaults as RplAlertProps),
    alertId: 'alert-1',
    message: 'An informative message.',
    linkText: 'Find out more',
    linkUrl: '/'
  }
}
