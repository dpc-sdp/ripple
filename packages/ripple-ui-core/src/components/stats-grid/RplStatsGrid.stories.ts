import type { Meta, StoryObj } from '@storybook/vue3'
import RplStatsGrid from './RplStatsGrid.vue'
import RplStatsGridItem from './RplStatsGridItem.vue'
import RplContent from '../content/RplContent.vue'
import { bpMin } from '../../lib/breakpoints'

const Template = (args: any) => ({
  components: { RplStatsGrid, RplStatsGridItem, RplContent },
  setup() {
    return { args }
  },
  template: `
    <RplStatsGrid :variant="args.variant">
      <RplStatsGridItem v-for="item in args.items" :value="item.stat">
        <span v-html="item.label" />
      </RplStatsGridItem>
    </RplStatsGrid>
  `
})

type ExtendedStatsGrid = Partial<typeof RplStatsGrid> & {
  items: { stat: string; label: string }[]
}

export default {
  title: 'Core/Containers/Stats grid',
  component: RplStatsGrid,
  render: Template,
  parameters: {
    chromatic: {
      viewports: [bpMin.s - 100, bpMin.s, bpMin.m, bpMin.l, bpMin.xl]
    }
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['onLight', 'onDark']
    }
  },
  args: {
    items: [
      { stat: 'One long stat', label: 'Descriptive label' },
      { stat: '6000', label: 'Descriptive label' },
      { stat: '22%', label: 'Descriptive label' },
      { stat: '$3,000,000', label: 'Descriptive label' },
      { stat: '4 Hours', label: 'Descriptive label' },
      { stat: '555', label: 'Descriptive label' },
      { stat: 'One more longer statistic', label: 'Descriptive label' },
      {
        stat: '7,500,000,000',
        label: 'Descriptive label this one should fill the mobile width'
      }
    ]
  }
} satisfies Meta<ExtendedStatsGrid>

type Story = StoryObj<ExtendedStatsGrid>

export const OnLight: Story = {
  args: {
    variant: 'onLight'
  }
}

export const OnDark: Story = {
  args: {
    variant: 'onDark'
  },
  parameters: {
    background: 'gray'
  }
}
