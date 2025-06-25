import type { Meta, StoryObj } from '@storybook/vue3'
import RplAccordion from './RplAccordion.vue'
import RplAccordionItem from './RplAccordionItem.vue'
import SAMPLE from './fixtures/default.js'

type ExtendedAccordionProps = Partial<typeof RplAccordion> & {
  item: Partial<typeof RplAccordionItem>
}

export default {
  title: 'Core/Containers/Accordion',
  component: RplAccordion
} satisfies Meta<typeof RplAccordion>

type Story = StoryObj<ExtendedAccordionProps>

export const Accordion: Story = {
  args: {
    id: 'example',
    items: SAMPLE,
    numbered: false
  }
}

export const AccordionNumbered: Story = {
  args: {
    id: 'example-numbered',
    items: SAMPLE,
    numbered: true
  }
}

export const AccordionWithSlots: Story = {
  args: {
    id: 'example-slots'
  },
  render: (args) => ({
    components: { RplAccordion, RplAccordionItem },
    setup() {
      return { args }
    },
    template: `
      <RplAccordion :id="args.id">
        <RplAccordionItem id="item1" v-bind="args.item">
          <template #title>
            Title content here
          </template>
          <p>Body content here</p>
        </RplAccordionItem>
        <RplAccordionItem id="item2" :active="true" v-bind="args.item">
          <template #title>
            Title content here
          </template>
          <p>Body content here</p>
        </RplAccordionItem>
      </RplAccordion>
    `
  })
}
