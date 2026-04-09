import type { Meta, StoryObj } from '@storybook/html'
import { renderTwig } from '../../../utils/twig-renderer'
// @ts-ignore - Vite handles this
import template from './RplAccordion.twig'
import './RplAccordion.ts'
import SAMPLE from '../fixtures/default.js'

export default {
  title: 'HTML Components/Containers/Accordion',
  argTypes: {
    numbered: {
      control: { type: 'boolean' }
    },
    displayToggleAll: {
      control: { type: 'boolean' }
    },
    items: {
      control: { type: 'object' }
    }
  },
  args: {
    id: 'example-html',
    items: SAMPLE,
    numbered: false,
    displayToggleAll: true
  },
  render: (args: any) => renderTwig(template, args)
} satisfies Meta

type Story = StoryObj

export const Accordion: Story = {}

export const AccordionNumbered: Story = {
  name: 'Accordion/Numbered',
  args: {
    id: 'example-numbered-html',
    numbered: true
  }
}

export const AccordionWithActiveItem: Story = {
  name: 'Accordion/With Active Item',
  args: {
    id: 'example-active-html',
    items: SAMPLE.map((item, index) => ({
      ...item,
      active: index === 1
    }))
  }
}

export const AccordionWithoutToggleAll: Story = {
  name: 'Accordion/Without Toggle All',
  args: {
    id: 'example-without-toggle-all-html',
    displayToggleAll: false
  }
}
