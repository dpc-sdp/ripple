import type { Meta, StoryObj } from '@storybook/vue3'
import RplPageAction from './RplPageAction.vue'
import RplDocument from '../document/RplDocument.vue'
import RplFile from '../file/RplFile.vue'
import RplIcon from '../icon/RplIcon.vue'

const Template = (args: any) => {
  return {
    components: { RplPageAction, RplDocument, RplFile, RplIcon },
    setup() {
      return { args }
    },
    template: `
      <RplPageAction>
        <template v-if="args.upper" #upper>
          ${args.upper}
        </template>
        ${args.default ? args.default : ''}
      </RplPageAction>
    `
  }
}

type ExtendedPageActionProps = Partial<typeof RplPageAction> &
  Partial<typeof RplFile>

export default {
  title: 'Core/Containers/Page action',
  component: RplPageAction,
  render: Template
} satisfies Meta<typeof RplPageAction>

type Story = StoryObj<ExtendedPageActionProps>

const sampleUpper = `<RplDocument url="https://vic.gov.au/#print">
  <template #icon>
    <RplIcon name="icon-print-lined" size="l" colour="default" />
  </template>
  <template #name>
    Print document
  </template>
</RplDocument>`

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    name: 'The document title',
    url: 'https://vic.gov.au/',
    size: '1.5mb',
    extension: 'pdf',
    upper: sampleUpper,
    default: `<RplFile v-bind="args" /><RplFile v-bind="args" /><RplFile v-bind="args" />`
  }
}

export const OnlyDocuments: Story = {
  args: {
    name: 'Another document title',
    url: 'https://vic.gov.au/',
    size: '0.5mb',
    extension: 'csv',
    default: `<RplFile v-bind="args" /><RplFile v-bind="args" /><RplFile v-bind="args" />`
  }
}

export const OnlyPrint: Story = {
  args: {
    upper: sampleUpper
  }
}
