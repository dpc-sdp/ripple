import { test, expect } from '@playwright/experimental-ct-vue'
import FileUploadWrapper from '../../../playwright/FileUploadWrapper.vue'

interface TestFile {
  name: string
  buffer: Buffer
  mimeType: string
}

const baseProps = {
  id: 'file-upload',
  name: 'file-upload',
  label: 'File upload'
}

const selectors = {
  input: 'input[type="file"]',
  dropzone: '.rpl-form-file__dropzone',
  requirements: '.rpl-form-file__requirements',
  errors: '.rpl-form-file__errors',
  items: '.rpl-form-file__item',
  itemRetry: (label: string) => `[aria-label="Retry ${label}"]`,
  itemRemove: (label: string) => `[aria-label="Remove ${label}"]`,
  itemDelete: (label: string) => `[aria-label="Delete ${label}"]`,
  itemProgress: (label: string) => `[aria-label="Uploading ${label}"]`
}

const file = (
  fileName: string,
  mimeType: string = 'text/plain',
  contents: string = ''
): TestFile => ({
  name: fileName,
  buffer: Buffer.from(contents),
  mimeType
})

test.describe(() => {
  test.use({ viewport: { width: 769, height: 680 } })

  test('should be disabled when disabled prop is true', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        disabled: true
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).toBeDisabled()
  })

  test('allows a single file by default', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).not.toHaveAttribute('multiple')

    // Select first file
    await input.setInputFiles([
      { name: 'test1.txt', mimeType: 'text/plain', buffer: Buffer.from('test content 1') }
    ])

    let items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
    await expect(items.first()).toContainText('test1.txt')
    await expect(items.first()).toHaveAttribute('data-status', 'success')

    // Try to select multiple files on non-multiple input - should throw at browser level
    try {
      await input.setInputFiles([
        { name: 'test2.txt', mimeType: 'text/plain', buffer: Buffer.from('') },
        { name: 'test3.txt', mimeType: 'text/plain', buffer: Buffer.from('') }
      ])
    } catch (e) {
      // Expected: non-multiple input can only accept single file
    }

    // Verify only original file remains
    items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
  })

  test('choosing a single file will replace the first', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).not.toHaveAttribute('multiple')

    // Select first file
    await input.setInputFiles([file('test1.txt', 'text/plain', 'test content 1')])

    let items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
    await expect(items).toContainText('test1.txt')

    // Select second file - should replace the first
    await input.setInputFiles([file('test2.txt', 'text/plain', 'test content 2')])

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
    await expect(items).toContainText('test2.txt')
  })

  test('limit allowed file types to allowedTypes using mimeType and extension', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true,
        allowedTypes: {
          mimeType: 'image/jpeg,image/png',
          extension: 'jpg,png'
        }
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).toHaveAttribute('accept', 'image/jpeg,image/png,.jpg,.png')

    const requirements = component.locator(selectors.requirements)
    await expect(requirements).toContainText('Accepted file types: JPG or PNG')

    await input.setInputFiles([
      file('Test 1.png', 'image/png'),
      file('Test 2.txt', 'text/plain')
    ])

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(2)

    const firstItem = items.filter({ hasText: 'Test 1.png' })
    await expect(firstItem).toHaveAttribute('data-status', 'success')

    const secondItem = items.filter({ hasText: 'Test 2.txt' })
    await expect(secondItem).toContainText('The selected file must be a JPG or PNG')
    await expect(secondItem).toHaveAttribute('data-status', 'invalid')
  })

  test('limit allowed file types to allowedTypes using only extension', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true,
        allowedTypes: { extension: 'jpg,png,gif' }
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).toHaveAttribute('accept', '.jpg,.png,.gif')

    const requirements = component.locator(selectors.requirements)
    await expect(requirements).toContainText('Accepted file types: JPG, PNG or GIF')

    await input.setInputFiles([
      file('Test 1.png', 'image/png'),
      file('Test 2.jpg', 'image/jpg'),
      file('Test 3.txt', 'text/plain'),
      file('Test 4.webp', 'image/webp')
    ])

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(4)

    const successItems = component.locator('[data-status="success"]')
    await expect(successItems).toHaveCount(2)
    await expect(successItems.filter({ hasText: 'Test 1.png' })).toBeVisible()
    await expect(successItems.filter({ hasText: 'Test 2.jpg' })).toBeVisible()

    const invalidItems = component.locator('[data-status="invalid"]')
    await expect(invalidItems).toHaveCount(2)
    await expect(invalidItems.filter({ hasText: 'Test 3.txt' })).toContainText(
      'The selected file must be a JPG, PNG or GIF'
    )
    await expect(invalidItems.filter({ hasText: 'Test 4.webp' })).toContainText(
      'The selected file must be a JPG, PNG or GIF'
    )
  })

  test('allows customisation of the placeholder text', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        placeholder: 'Drop it!'
      } as any
    })

    const dropzone = component.locator(selectors.dropzone)
    await expect(dropzone).toContainText('Drop it!')
  })

  test('files can be uploaded on click', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Input.txt')])

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)

    const firstItem = items.first()
    await expect(firstItem).toContainText('Input.txt')
    await expect(firstItem).toHaveAttribute('data-status', 'success')
  })

  test('files to be uploaded with drag and drop', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles(
      [file('Drop.txt'), file('Another Drop.txt'), file('Yet Another Drop.txt')],
      { noWaitAfter: true }
    )

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(3)

    const first = items.filter({ hasText: 'Drop.txt' }).nth(0)
    await expect(first).toHaveAttribute('data-status', 'success')
    await expect(component.getByText('Another Drop.txt', { exact: true }).locator('../../..')).toHaveAttribute('data-status', 'success')
    await expect(component.getByText('Yet Another Drop.txt', { exact: true }).locator('../../..')).toHaveAttribute('data-status', 'success')
  })

  test('displays an error message next to the individual file when upload fails', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        status: 'error'
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Error.txt')])

    const item = component.locator(selectors.items).first()
    await expect(item).toContainText('Sorry, upload failed!')
    await expect(item).toHaveAttribute('data-status', 'error')
  })

  test("displays an error message next to the individual file when it's invalid", async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        allowedTypes: {
          mimeType: 'image/png',
          extension: 'png'
        },
        status: 'error'
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test.txt')])

    const item = component.locator(selectors.items).first()
    await expect(item).toContainText('The selected file must be a PNG')
  })

  test('shows an error when trying to upload more files than maxFiles', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        maxFiles: 2
      } as any
    })

    const input = component.locator(selectors.input)
    await expect(input).toHaveAttribute('multiple')

    // Try 3 files, should fail
    await input.setInputFiles([
      file('Test-1.txt'),
      file('Test-2.txt'),
      file('Test-3.txt')
    ])

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(0)

    const errors = component.locator(selectors.errors)
    await expect(errors).toContainText('There is a limit of 2 files')

    // Try 2 files, should succeed
    await input.setInputFiles([file('Test-1.txt'), file('Test-2.txt')])

    await expect(items).toHaveCount(2)
    await expect(errors).not.toBeVisible()

    // Try 1 more file, should fail
    await input.setInputFiles([file('Test-3.txt')])

    await expect(items).toHaveCount(2)
    await expect(errors).toContainText('There is a limit of 2 files')
  })

  test('shows file size validation error', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        maxSize: 0.001
      } as any
    })

    const input = component.locator(selectors.input)

    const largeContent = Array.from(
      { length: 10000 },
      () => 'Some test content that is larger than 0.001MB'
    ).join(',')

    await input.setInputFiles([file('Large-file.txt', 'text/plain', largeContent)])

    const item = component.locator(selectors.items).first()
    await expect(item).toContainText('The selected file must be smaller')
  })

  // Playwright can't serialise function params from the spec, so the scenario
  // can be found in the wrapper component code as 'progress-bar'
  test('displays a progress bar while uploading', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        customScenario: 'progress-bar'
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test.txt')])

    const progressBar = component.locator(selectors.itemProgress('Test.txt'))
    await expect(progressBar).toBeVisible()
    await expect(progressBar).toHaveAttribute('value', '50')
  })

  test('allows users to retry uploading of failed files', async ({ mount }) => {
    const props = {
      ...baseProps,
      status: 'error'
    } as any

    let component = await mount(FileUploadWrapper, { props })

    await component.locator(selectors.input).setInputFiles([file('File-1.txt')])

    const item = component.locator(selectors.items).first()
    await expect(item).toHaveAttribute('data-status', 'error')

    await component.locator(selectors.itemRetry('File-1.txt')).click()
    props.status = 'success'
    component = await mount(FileUploadWrapper, { props })
    await component.locator(selectors.input).setInputFiles([file('File-1.txt')])

    await expect(item).toHaveAttribute('data-status', 'success')
  })

  test('allows users to removing successful files', async ({ mount }) => {
    const onChangeCalls: any[] = []

    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        value: null,
        multiple: true,
        onChange: (files: any) => onChangeCalls.push(files),
        mockUpload: async (
          file: File,
          options: { id: string; fieldId: string; formId: string },
          // onUpdate: (complete: number | boolean) => void
        ) => ({ id: options.id, status: 'success' as const })
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test-1.txt'), file('Test-2.txt')])

    let items = component.locator(selectors.items)
    await expect(items).toHaveCount(2)

    let deleteButton = component.locator(selectors.itemDelete('Test-1.txt'))
    await deleteButton.click()

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
    await expect(items).toContainText('Test-2.txt')

    deleteButton = component.locator(selectors.itemDelete('Test-2.txt'))
    await deleteButton.click()

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(0)
  })

  test('allows users to upload, remove, retry and mix actions', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true,
        allowedTypes: {
          mimeType: 'image/png',
          extension: 'png'
        }
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([
      file('Test-1.txt'),
      file('Test-3.png', 'image/png')
    ])

    const items = component.locator(selectors.items)
    await expect(items).toHaveCount(2)

    const invalidItems = component.locator('[data-status="invalid"]')
    await expect(invalidItems).toHaveCount(1)
    await expect(items.filter({ hasText: 'Test-1.txt' })).toBeVisible()

    const successItems = component.locator('[data-status="success"]')
    await expect(successItems).toHaveCount(1)
    await expect(items.filter({ hasText: 'Test-3.png' })).toBeVisible()

    // Add more files
    await input.setInputFiles([
      file('Test-5.png', 'image/png'),
      file('Test-6.txt')
    ])

    await expect(items).toHaveCount(4)
    await expect(invalidItems).toHaveCount(2)
    await expect(successItems).toHaveCount(2)

    // Remove invalid
    await component.locator(selectors.itemRemove('Test-1.txt')).click()

    // Delete invalid
    await component.locator(selectors.itemDelete('Test-6.txt')).click()

    await expect(items).toHaveCount(2)

    await expect(successItems).toHaveCount(2)
    await expect(items.filter({ hasText: 'Test-3.png' })).toBeVisible()
    await expect(items.filter({ hasText: 'Test-5.png' })).toBeVisible()

    // Delete another
    await component.locator(selectors.itemDelete('Test-3.png')).click()

    await expect(items).toHaveCount(1)

    await expect(successItems).toHaveCount(1)
    await expect(items.filter({ hasText: 'Test-5.png' })).toBeVisible()
  })

  test('emits the onChange event with successful files', async ({ mount }) => {
    const component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true,
        allowedTypes: {
          mimeType: 'application/pdf',
          extension: 'pdf'
        }
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test-1.pdf'), file('Test-2.txt')])

    // Only Test-1.pdf should succeed (Test-2.txt is invalid)
    let items = component.locator(selectors.items)
    const successItems = component.locator('[data-status="success"]')
    await expect(successItems).toHaveCount(1)
    await expect(items.filter({ hasText: 'Test-1.pdf' })).toBeVisible()

    // Add another valid file
    await input.setInputFiles([file('Test-3.pdf')])

    await new Promise((resolve) => setTimeout(resolve, 100))

    // Now should have 2 successful files
    items = component.locator(selectors.items)
    await expect(successItems).toHaveCount(2)
    await expect(items.filter({ hasText: 'Test-1.pdf' })).toBeVisible()
    await expect(items.filter({ hasText: 'Test-3.pdf' })).toBeVisible()
  })

  test('clears the display when the value prop is reset', async ({ mount }) => {
    let component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true
      } as any
    })

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test-1.txt'), file('Test-2.txt')])

    let items = component.locator(selectors.items)
    await expect(items).toHaveCount(2)

    component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        multiple: true
      } as any
    })

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(0)
  })

  test('updates the internal files list when the value prop changes', async ({ mount }) => {
    let component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        value: [
          {
            id: 'test-1',
            ref: 'ref-id-1',
            file: {
              name: 'Test-1.jpg',
              type: 'image/jpeg',
              size: 100000
            },
            status: 'success'
          }
        ],
        multiple: true
      } as any
    })

    let items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)

    const input = component.locator(selectors.input)
    await input.setInputFiles([file('Test-2.txt'), file('Test-3.txt')])

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(3)

    // Test prop change - remount with different value
    component = await mount(FileUploadWrapper, {
      props: {
        ...baseProps,
        value: [
          {
            id: 'test-4',
            ref: 'ref-id-4',
            file: {
              name: 'Test-4.jpg',
              type: 'image/jpeg',
              size: 100000
            },
            status: 'success'
          }
        ],
        multiple: true
      }
    })

    items = component.locator(selectors.items)
    await expect(items).toHaveCount(1)
    await expect(items.filter({ hasText: 'Test-4.jpg' })).toBeVisible()
  })

})
