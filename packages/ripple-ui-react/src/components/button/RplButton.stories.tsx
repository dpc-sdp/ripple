import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	buttonElements,
	buttonVariants,
	rplButtonDefaults,
	type RplButtonProps
} from '@dpc-sdp/ripple-ui-shared/contracts'

import { RplButton } from './RplButton'

const meta = {
	title: 'Components/Button',
	component: RplButton,
	argTypes: {
		el: {
			control: { type: 'select' },
			options: buttonElements
		},
		variant: {
			control: { type: 'select' },
			options: buttonVariants
		}
	}
} satisfies Meta<typeof RplButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		...(rplButtonDefaults as RplButtonProps),
		label: 'Click me'
	}
}
