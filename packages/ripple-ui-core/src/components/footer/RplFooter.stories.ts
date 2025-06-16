import { svgPlaceholder } from 'ripple-storybook/utils'
import RplFooter from './RplFooter.vue'
import { RplFooterVariants } from './constants'
import { RplFooterLinks, RplFooterLinksSingleLevel } from './fixtures/sample'
import { bpMin } from '../../lib/breakpoints'
import type { Meta, StoryObj } from '@storybook/vue3'

export default {
  title: 'Core/Navigation/Footer',
  component: RplFooter,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [bpMin.s - 100, bpMin.s, bpMin.m, bpMin.l, bpMin.xl]
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: RplFooterVariants
    }
  },
  args: {
    variant: 'default',
    nav: RplFooterLinks,
    links: [
      { text: 'Privacy', url: '#' },
      { text: 'Disclaimer', url: '#' },
      { text: 'Terms of use', url: '#' },
      { text: 'Sitemap', url: '#' },
      { text: 'Accessibility Statement', url: '#' },
      { text: 'Help', url: '#' }
    ],
    credit: 'Image credit: image metadata slash credit goes here.',
    copyright: '© Copyright State Government of Victoria',
    logos: [
      {
        src: svgPlaceholder({ width: 200, height: 80 }),
        alt: 'Landscape',
        url: '#'
      }
    ]
  }
} satisfies Meta<typeof RplFooter>

type Story = StoryObj<typeof RplFooter>

export const Default: Story = {
  args: { variant: 'default' }
}

export const Neutral: Story = {
  args: { variant: 'neutral' }
}

export const SingleLevel: Story = {
  args: { nav: RplFooterLinksSingleLevel }
}
