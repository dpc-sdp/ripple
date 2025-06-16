import type { Meta, StoryObj } from '@storybook/vue3'
import RplPagination from './RplPagination.vue'

export default {
  title: 'Core/Navigation/Pagination',
  component: RplPagination,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['complex', 'simple']
    }
  },
  args: {
    label: 'Page navigation',
    totalPages: 20,
    currentPage: 1,
    surroundingPages: 3
  }
} satisfies Meta<typeof RplPagination>

type Story = StoryObj<typeof RplPagination>

export const Complex: Story = {
  args: { currentPage: 10 }
}

export const ComplexFirstPage: Story = {
  name: 'Complex/First page',
  args: { currentPage: 1 }
}

export const ComplexLastPage: Story = {
  name: 'Complex/Last page',
  args: { currentPage: 20 }
}

export const Simple: Story = {
  args: {
    variant: 'simple',
    totalPages: 3
  }
}

export const SimpleTally: Story = {
  name: 'Simple/Tally',
  args: {
    variant: 'simple',
    showTally: true,
    totalPages: 5
  }
}
