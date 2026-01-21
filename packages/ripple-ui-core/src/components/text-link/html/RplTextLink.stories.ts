import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
// @ts-ignore - Vite handles this
import template from './RplTextLink.twig'

export default {
  title: 'HTML Components/Navigation/Text link',
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: 'The URL for the link'
    },
    text: {
      control: 'text',
      description: 'The link text content'
    },
    target: {
      control: 'text',
      description: 'Link target attribute (e.g., "_blank")'
    },
    rel: {
      control: 'text',
      description: 'Link rel attribute (e.g., "noopener noreferrer")'
    },
    title: {
      control: 'text',
      description: 'Link title attribute'
    },
    class: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    url: 'https://www.vic.gov.au',
    text: 'link'
  }
} satisfies Meta

type Story = StoryObj

const Template = (args: any) => {
  return `<p class="sb-container rpl-type-p">This para contains a ${renderTwig(template, args)} in the middle.</p>`
}

export const Default: Story = {
  render: Template
}

export const ExampleContentAccent: Story = {
  name: 'Example/Content/Accent',
  args: {
    text: 'voilà'
  },
  render: Template
}

export const ExampleContentEmoji: Story = {
  name: 'Example/Content/Emoji',
  args: {
    text: '😍'
  },
  render: Template
}

export const ExampleContentTarget: Story = {
  name: 'Example/Content/Target',
  args: {
    text: 'link that opens in a new window',
    target: '_blank'
  },
  render: Template
}

export const WithIcon: Story = {
  name: 'Example/Component/Icon',
  args: {
    text: `<span class="rpl-icon rpl-icon--size-s">
      <svg role="presentation">
        <use xlink:href="#icon-pin"></use>
      </svg>
    </span>`
  },
  render: Template
}
