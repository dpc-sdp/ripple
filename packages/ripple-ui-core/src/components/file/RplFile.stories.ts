import type { Meta, StoryObj } from '@storybook/vue3'
import RplFile from './RplFile.vue'

export default {
  title: 'Core/Containers/File',
  component: RplFile,
  args: {
    name: 'This is an example of a document title',
    url: 'https://vic.gov.au/test',
    size: '1.5mb',
    extension: 'pdf'
  }
} satisfies Meta<typeof RplFile>

type Story = StoryObj<typeof RplFile>

export const Default: Story = {
  args: {
    name: 'An example of a document title that is a little longer'
  }
}

export const WithDate: Story = {
  args: {
    updated: 'July 17, 2022'
  }
}

export const WithCaption: Story = {
  args: {
    caption:
      'And this is example of a longer description of the document, this one seems very descriptive.'
  }
}
