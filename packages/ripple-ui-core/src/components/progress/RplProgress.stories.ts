import type { Meta, StoryObj } from '@storybook/vue3'
import RplProgress from './RplProgress.vue'
import { bpMin } from '../../lib/breakpoints'

export default {
  title: 'Core/Containers/Progress',
  component: RplProgress,
  args: {
    id: 'progress-id',
    title: 'Heading text',
    steps: [
      { id: 'step1', label: 'Step label 1' },
      { id: 'step2', label: 'Step label 2' },
      { id: 'step3', label: 'Step label 3' },
      { id: 'step4', label: 'Step label 4' }
    ]
  }
} satisfies Meta<typeof RplProgress>

type Story = StoryObj<typeof RplProgress>

export const NoActiveStep: Story = {
  args: { currentStepId: null }
}

export const FirstStepActive: Story = {
  name: '1st step active',
  args: { currentStepId: 'step1' }
}

export const SecondStepActive: Story = {
  name: '2nd step active',
  args: { currentStepId: 'step2' }
}

export const ThirdStepActive: Story = {
  name: '3rd step active',
  args: { currentStepId: 'step3' }
}

export const FourthStepActive: Story = {
  name: '4th step active',
  args: { currentStepId: 'step4' }
}

export const LongLabel: Story = {
  args: {
    currentStepId: 'step1',
    steps: [
      { id: 'step1', label: 'Step 1' },
      {
        id: 'step2',
        label:
          'Step 2 with very long label for demonstration purposes, the label should wrap nicely across multiple lines'
      },
      { id: 'step3', label: 'Step 3' }
    ]
  }
}

export const ExpandableAuto: Story = {
  name: 'Expandable only on smaller screens (breakpoint driven)',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    currentStepId: 'step1',
    autoExpandable: true
  }
}

export const ExpandablePropDriven: Story = {
  name: 'Expandable (prop driven)',
  args: {
    currentStepId: 'step1',
    expandable: true
  }
}

export const InitiallyExpanded: Story = {
  args: {
    currentStepId: 'step1',
    expandable: true,
    initiallyExpanded: true
  }
}
