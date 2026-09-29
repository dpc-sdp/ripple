import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  rplIconColours,
  rplIconSizes,
  RplCoreIconNames
} from '@dpc-sdp/ripple-ui-shared/contracts'
import { RplIcon } from './RplIcon'
import { RplCustomIconNames } from './generated/index.tsx'

const meta = {
  title: 'Components/Icon',
  component: RplIcon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [...RplCoreIconNames, ...RplCustomIconNames]
    },
    size: {
      control: { type: 'select' },
      options: rplIconSizes
    },
    colour: {
      control: { type: 'select' },
      options: rplIconColours
    },
    padded: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta<typeof RplIcon>

export default meta
type Story = StoryObj<typeof meta>

export const SpriteIcon: Story = {
  args: {
    name: 'icon-information-circle-filled',
    size: 'm',
    colour: 'information',
    title: 'Information'
  }
}

export const CustomInlineIcon: Story = {
  args: {
    name: 'icon-add',
    size: 'm',
    colour: 'text',
    title: 'Add'
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: RplCustomIconNames
    }
  }
}

export const ModifiersGallery: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      <RplIcon name='icon-cancel' size='xs' colour='error' title='Cancel' />
      <RplIcon name='icon-cancel' size='s' colour='error' title='Cancel' />
      <RplIcon name='icon-cancel' size='m' colour='error' title='Cancel' />
      <RplIcon name='icon-cancel' size='l' colour='error' title='Cancel' />
      <RplIcon
        name='icon-loading'
        size='m'
        colour='warning'
        padded
        title='Loading'
      />
    </div>
  )
}
