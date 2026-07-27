import type { Meta, StoryObj } from '@storybook/react-vite'
import { type RplAccordionProps } from '@dpc-sdp/ripple-ui-shared/contracts'
import RplAccordion from './RplAccordion'
import RplAccordionItem from './RplAccordionItem'
const meta = {
  title: 'Components/Accordion',
  component: RplAccordion,
  subcomponents: { RplAccordionItem }
} satisfies Meta<typeof RplAccordion>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'accordion-1',
    numbered: false
  },
  render: (args) => (
    <RplAccordion {...args}>
      <RplAccordionItem id='1' title='test 1'>
        <p>This is the content here</p>
        <h4>headings start at h4</h4>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </RplAccordionItem>
      <RplAccordionItem id='2' title='test 2'>
        <p>This is content in the second item</p>
      </RplAccordionItem>
      <RplAccordionItem id='3' />
    </RplAccordion>
  )
}
