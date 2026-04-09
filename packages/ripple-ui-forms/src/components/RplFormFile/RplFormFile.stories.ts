import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import RplFormFile from './RplFormFile.vue'
import StorybookInputFixture from './../StorybookInputFixture/StorybookInputFixture.vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import '../RplForm/RplForm.css'
import { bpMin } from '@dpc-sdp/ripple-ui-core'

// Mock upload handler that simulates progress
const createMockUploadHandler = (
  uploadDuration = 2000,
  status: string = 'success'
) => {
  return (
    file: File,
    options: { id: string },
    onUpdate: (complete: number) => void
  ): Promise<{ ref?: string; status: string; error?: string }> => {
    const randomSpeed = Math.random() * 15 + 1

    return new Promise((resolve) => {
      let complete = 0

      const uploadInterval = setInterval(() => {
        complete += 10

        if (complete === 100) {
          clearInterval(uploadInterval)

          const statuses = {
            error: {
              status: 'error',
              error: 'The selected file could not be uploaded – try again'
            },
            success: {
              ref: `${options.id}_success`,
              status: 'success'
            }
          }

          if (status === 'error') {
            resolve(statuses.error)
          } else if (status === 'success') {
            resolve(statuses.success)
          } else if (status === 'both') {
            const success = Math.floor(Math.random() * 2)
            resolve(success ? statuses.success : statuses.error)
          }
        }

        onUpdate(complete)
      }, uploadDuration / randomSpeed)
    })
  }
}

const Template = (args: any) => ({
  components: { RplFormFile, StorybookInputFixture },
  setup() {
    const currentValue = ref(args.value || [])

    const uploadHandler = args.createHandler || createMockUploadHandler()
    const handleChange = (value: any) => (currentValue.value = value)

    return { args, uploadHandler, handleChange, currentValue }
  },
  template: `
    <StorybookInputFixture :invalid="args.invalid" :labelId="args.labelId" :fieldId="args.id" :value="currentValue">
      <RplFormFile v-bind="args" :value="currentValue" :handle-upload="uploadHandler" :on-change="handleChange" />
    </StorybookInputFixture>`
})

type ExtendedFormFile = Partial<typeof RplFormFile> & {
  createHandler: any
}

export default {
  title: 'Forms/File',
  component: RplFormFile,
  render: Template,
  args: {
    name: 'example-name',
    id: 'example-id'
  }
} satisfies Meta<ExtendedFormFile>

type Story = StoryObj<ExtendedFormFile>

export const DefaultStory: Story = {
  name: 'Default',
  args: {}
}

export const Inactive: Story = {
  args: {
    disabled: true,
    multiple: true
  }
}

export const SingleFileOnly: Story = {
  args: {
    multiple: false,
    maxFiles: 1
  }
}

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    maxFiles: 3
  }
}

export const WithFileRestrictions: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    allowedTypes: {
      mimeType: 'image/jpeg,image/png,application/pdf',
      extension: 'jpg,png,pdf'
    }
  }
}

export const WithSizeLimit: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    maxSize: 2,
    allowedTypes: {
      mimeType: 'image/jpeg,image/png,application/pdf',
      extension: 'jpg,png,pdf'
    }
  }
}

export const SlowUpload: Story = {
  args: {
    multiple: true,
    createHandler: createMockUploadHandler(5000)
  }
}

export const UploadError: Story = {
  args: {
    multiple: true,
    createHandler: createMockUploadHandler(2000, 'error')
  }
}

export const RandomSuccess: Story = {
  args: {
    multiple: true,
    allowedTypes: {
      mimeType: 'image/jpeg',
      extension: 'jpg'
    },
    createHandler: createMockUploadHandler(2000, 'both')
  }
}

export const Invalid: Story = {
  args: {
    invalid: true,
    multiple: true
  }
}

export const WithPlaceholder: Story = {
  args: {
    multiple: true,
    maxFiles: 5,
    placeholder: 'Drop <em>files</em> here',
    allowedTypes: { extension: 'jpg,jpeg,png,webp' }
  }
}

export const WithPreUploadedFiles: Story = {
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    multiple: true,
    maxFiles: 3,
    allowedTypes: { extension: 'jpg,jpeg,png,webp' },
    value: [
      {
        ref: 'ref-id-1',
        file: {
          name: 'Test-1.jpg',
          size: 100000
        }
      },
      {
        ref: 'ref-id-2',
        file: {
          name: 'Test-2.jpg'
        }
      }
    ]
  }
}
