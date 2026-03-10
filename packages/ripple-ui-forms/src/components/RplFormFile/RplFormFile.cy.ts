import RplFormFile from './RplFormFile.vue'

type TestFile = {
  contents: any
  fileName: string
  mimeType: string
}

const baseProps = {
  id: 'file-upload',
  name: 'file-upload',
  label: 'File upload'
}

const _ = {
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

const itemStatus = (status: string) =>
  `.rpl-form-file__item[data-status="${status}"]`

const file = (
  fileName: string,
  mimeType: string = 'text/plain',
  contents: string = ''
): TestFile => ({
  contents: Cypress.Buffer.from(contents),
  fileName,
  mimeType
})

const mount = (overrideProps: Record<string, any> = {}) => {
  return cy.mount(RplFormFile, { props: { ...baseProps, ...overrideProps } })
}

const select = (file: TestFile | TestFile[]) => {
  cy.get(_.input).selectFile(file, { force: true })
}

const drop = (file: TestFile | TestFile[]) => {
  cy.get(_.input).selectFile(file, { action: 'drag-drop' })
}

const upload = (options?: {
  ref?: string
  status?: 'error' | 'success'
  error?: string
}) => {
  let { ref = null, status = 'success', error = null } = options || {}

  return cy.stub().callsFake((id: string, file: File) => {
    const _ref = ref ? `${ref}-${file.name.toLowerCase()}` : id

    return Promise.resolve({ ref: _ref, status, error })
  })
}

describe('RplFormFile', () => {
  beforeEach(() => {
    cy.viewport(769, 680)
  })

  it('should be disabled when disabled prop is true', () => {
    mount({ disabled: true })

    cy.get(_.input).should('be.disabled')
  })

  it('allows a single file by default', () => {
    const handleUpload = upload()

    mount({ handleUpload })

    cy.get(_.input).should('not.have.attr', 'multiple')

    select([
      file('test1.txt', 'test content 1'),
      file('test2.txt', 'test content 2')
    ])

    cy.get(_.errors).should('contain', 'There is a limit of 1 file.')
    cy.get(_.items).should('have.length', 0)

    expect(handleUpload).to.not.have.been.called
  })

  it('choosing a single single file will replace the first', () => {
    const handleUpload = upload()

    mount({ handleUpload })

    cy.get(_.input).should('not.have.attr', 'multiple')

    select(file('test1.txt', 'test content 1'))

    cy.get(_.items).should('have.length', 1).should('contain', 'test1.txt')

    select(file('test2.txt', 'test content 2'))

    cy.get(_.items).should('have.length', 1).should('contain', 'test2.txt')
  })

  it('limit allowed files types to allowedTypes using mimeType and extension', () => {
    const handleUpload = upload()

    mount({
      handleUpload,
      multiple: true,
      allowedTypes: {
        mimeType: 'image/jpeg,image/png',
        extension: 'jpg,png'
      }
    })

    cy.get(_.input).should(
      'have.attr',
      'accept',
      'image/jpeg,image/png,.jpg,.png'
    )
    cy.get(_.requirements).should('contain', 'Accepted file types: JPG, PNG')

    select([file('Test 1.png', 'image/png'), file('Test 2.txt', 'text/plain')])

    cy.get(_.items).should('have.length', 2)
    cy.get(_.items)
      .eq(0)
      .should('contain', 'Test 1.png')
      .should('have.attr', 'data-status', 'success')

    cy.get(_.items)
      .eq(1)
      .should(
        'contain',
        'File is not in a supported format, please remove this file and select a JPG, PNG'
      )
      .should('have.attr', 'data-status', 'invalid')

    expect(handleUpload).to.not.have.been.calledOnce
  })

  it('limit allowed files types to allowedTypes using only extension', () => {
    const handleUpload = upload()

    mount({
      handleUpload,
      multiple: true,
      allowedTypes: { extension: 'jpg,png,gif' }
    })

    cy.get(_.input).should('have.attr', 'accept', '.jpg,.png,.gif')
    cy.get(_.requirements).should(
      'contain',
      'Accepted file types: JPG, PNG, GIF'
    )

    select([
      file('Test 1.png', 'image/png'),
      file('Test 2.jpg', 'image/jpg'),
      file('Test 3.txt', 'text/plain'),
      file('Test 4.webp', 'image/webp')
    ])

    cy.get(_.items).should('have.length', 4)
    cy.get(itemStatus('success'))
      .should('have.length', 2)
      .should('contain', 'Test 1.png')
      .should('contain', 'Test 2.jpg')

    cy.get(itemStatus('invalid'))
      .should('have.length', 2)
      .should('contain', 'Test 3.txt')
      .should('contain', 'Test 4.webp')
      .should(
        'contain',
        'File is not in a supported format, please remove this file and select a JPG, PNG, GIF'
      )

    expect(handleUpload).to.not.have.been.calledTwice
  })

  it('allows customisation of the placeholder text', () => {
    mount({ placeholder: 'Drop it!' })

    cy.get(_.dropzone).contains('Drop it!')
  })

  it('files can be uploaded on click', () => {
    const handleUpload = upload()

    mount({ handleUpload })

    select(file('Input.txt'))

    cy.get(_.items).should('have.length', 1)
    cy.get(_.items)
      .eq(0)
      .should('contain', 'Input.txt')
      .should('have.attr', 'data-status', 'success')

    cy.then(() => expect(handleUpload).to.have.been.calledOnce)
  })

  it('files to be uploaded with drag and drop', () => {
    const handleUpload = upload()

    mount({ handleUpload, multiple: true })

    drop([
      file('Drop.txt'),
      file('Another Drop.txt'),
      file('Yet Another Drop.txt')
    ])

    cy.get(_.items).should('have.length', 3)
    cy.get(_.items)
      .should('contain', 'Drop.txt')
      .should('contain', 'Another Drop.txt')
      .should('contain', 'Yet Another Drop.txt')
      .should('have.attr', 'data-status', 'success')

    cy.then(() => expect(handleUpload).to.have.callCount(3))
  })

  it('displays an error message next to the individual file when upload fails', () => {
    const handleUpload = upload({
      status: 'error',
      error: 'Sorry, upload failed!'
    })

    mount({ handleUpload })

    select(file('Error.txt'))

    cy.get(_.items)
      .eq(0)
      .should('contain', 'Sorry, upload failed!')
      .should('have.attr', 'data-status', 'error')
  })

  it("displays an error message next to the individual file when it's invalid", () => {
    const handleUpload = upload()

    mount({
      handleUpload,
      allowedTypes: {
        mimeType: 'image/png',
        extension: 'png'
      }
    })

    select(file('Test.txt'))

    cy.get(_.items)
      .eq(0)
      .should(
        'contain',
        'File is not in a supported format, please remove this file and select a PNG'
      )

    cy.then(() => expect(handleUpload).not.to.have.been.called)
  })

  it('shows an error when trying to upload more files than maxFiles', () => {
    const handleUpload = upload()

    mount({ handleUpload, maxFiles: 2 })

    cy.get(_.input).should('have.attr', 'multiple')

    select([file('Test-1.txt'), file('Test-2.txt'), file('Test-3.txt')])

    cy.get(_.items).should('have.length', 0)
    cy.get(_.errors).should('contain', 'There is a limit of 2 files')

    cy.then(() => expect(handleUpload).not.to.have.been.called)

    select([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 2)
    cy.get(_.errors).should('not.exist')

    select(file('Test-3.txt'))

    cy.get(_.items).should('have.length', 2)
    cy.get(_.errors).should('contain', 'There is a limit of 2 files')

    cy.then(() => expect(handleUpload).to.have.been.calledTwice)
  })

  it('shows file size validation error', () => {
    const handleUpload = upload()

    mount({ handleUpload, maxSize: 0.001 })

    select(
      file(
        'Large-file.txt',
        'text/plain',
        Array.from(
          { length: 10000 },
          () => 'Some test content that is larger than 0.001MB'
        ).join(',')
      )
    )

    cy.get(_.items).eq(0).should('contain', 'File is too large')

    cy.then(() => expect(handleUpload).not.to.have.been.called)
  })

  it('displays a progress bar while uploading', () => {
    const handleUpload = cy
      .stub()
      .callsFake(
        (id: string, file: File, onUpdate: (complete: number) => void) => {
          setTimeout(() => onUpdate(50), 100)
          return new Promise((resolve) => {
            setTimeout(() => {
              onUpdate(100)
              resolve({ ref: 'file-1-sever-ref', status: 'success' })
            }, 200)
          })
        }
      )

    mount({ handleUpload })

    select(file('Test.txt'))

    cy.get(_.itemProgress('Test.txt'))
      .should('exist')
      .should('have.attr', 'value', '50')

    cy.wait(300).then(() => {
      cy.get(_.itemProgress('Test.txt')).should('not.exist')
    })
  })

  it('allows users to retry uploading of failed files', () => {
    let callCount = 0
    const handleUpload = cy.stub().callsFake(() => {
      callCount++
      if (callCount === 1) {
        return Promise.resolve({
          ref: 'file-1',
          status: 'error'
        })
      }
      return Promise.resolve({ ref: 'file-1', status: 'success' })
    })

    mount({ handleUpload })

    select(file('File-1.txt'))

    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'error')

    cy.get(_.itemRetry('File-1.txt')).click()

    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'success')

    cy.then(() => expect(handleUpload).to.have.been.calledTwice)
  })

  it('allows users to removing successful files', () => {
    const onChange = cy.spy()
    const handleUpload = upload({ ref: 'server-id' })

    mount({ onChange, handleUpload, multiple: true })

    select([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 2)

    cy.get(_.itemDelete('Test-1.txt')).click()

    cy.get(_.items).should('have.length', 1).should('contain', 'Test-2.txt')

    cy.get(_.itemDelete('Test-2.txt')).click()

    cy.get(_.items).should('have.length', 0)

    cy.then(() => expect(onChange).to.have.been.calledWith([]))
  })

  it('allows users to upload, remove, retry and mix actions', () => {
    let callCount = 0
    const handleUpload = cy.stub().callsFake(() => {
      callCount++
      if (callCount === 1) {
        return Promise.resolve({
          status: 'error'
        })
      }
      return Promise.resolve({ status: 'success' })
    })

    mount({
      handleUpload,
      multiple: true,
      allowedTypes: {
        mimeType: 'image/png',
        extension: 'png'
      }
    })

    select([
      file('Test-1.txt'),
      file('Test-2.png', 'image/png'),
      file('Test-3.png', 'image/png')
    ])

    cy.get(_.items).should('have.length', 3)

    cy.get(itemStatus('invalid'))
      .should('have.length', 1)
      .should('contain', 'Test-1.txt')

    cy.get(itemStatus('error'))
      .should('have.length', 1)
      .should('contain', 'Test-2.png')

    cy.get(itemStatus('success'))
      .should('have.length', 1)
      .should('contain', 'Test-3.png')

    drop([file('Test-5.png', 'image/png'), file('Test-6.txt')])

    cy.get(_.items).should('have.length', 5)

    cy.get(itemStatus('invalid')).should('have.length', 2)
    cy.get(itemStatus('error')).should('have.length', 1)
    cy.get(itemStatus('success')).should('have.length', 2)

    cy.get(_.itemRemove('Test-1.txt')).click()
    cy.get(_.itemRetry('Test-2.png')).click()
    cy.get(_.itemDelete('Test-6.txt')).click()

    cy.get(_.items).should('have.length', 3)
    cy.get(itemStatus('success'))
      .should('have.length', 3)
      .should('contain', 'Test-2.png')
      .should('contain', 'Test-3.png')
      .should('contain', 'Test-5.png')

    cy.get(_.itemDelete('Test-3.png')).click()

    cy.get(_.items).should('have.length', 2)
    cy.get(itemStatus('success'))
      .should('have.length', 2)
      .should('contain', 'Test-2.png')
      .should('contain', 'Test-5.png')
  })

  it('emits the onChange event with successful files', () => {
    const onChange = cy.spy().as('onChange')
    const handleUpload = upload({ ref: 'server-id' })

    mount({
      onChange,
      handleUpload,
      multiple: true,
      allowedTypes: {
        mimeType: 'application/pdf',
        extension: 'pdf'
      }
    })

    select([file('Test-1.pdf'), file('Test-2.txt')])

    cy.then(() => {
      expect(onChange).to.have.been.calledWithMatch([
        {
          id: Cypress.sinon.match.string,
          ref: 'server-id-test-1.pdf',
          file: {
            name: 'Test-1.pdf',
            type: 'text/plain',
            size: 0
          }
        }
      ])
    })

    select([file('Test-3.pdf')])

    cy.then(() =>
      expect(onChange).to.have.been.calledWithMatch([
        {
          id: Cypress.sinon.match.string,
          ref: 'server-id-test-1.pdf',
          file: {
            name: 'Test-1.pdf',
            type: 'text/plain',
            size: 0
          }
        },
        {
          id: Cypress.sinon.match.string,
          ref: 'server-id-test-3.pdf',
          file: {
            name: 'Test-3.pdf',
            type: 'text/plain',
            size: 0
          }
        }
      ])
    )
  })

  it('clears the display when the value prop is reset', () => {
    const handleUpload = upload({ ref: 'server-id' })

    mount({ handleUpload, multiple: true })

    cy.mountComponent(RplFormFile, {
      props: {
        ...baseProps,
        onChange: (files: any) => {
          cy.get('@vue').then((wrapper: any) =>
            wrapper.setProps({ value: files })
          )
        },
        handleUpload,
        multiple: true
      }
    })

    select([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 2)
    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'success')
    cy.get(_.items).eq(1).should('have.attr', 'data-status', 'success')

    cy.get('@vue').then((wrapper: any) => {
      wrapper.setProps({ value: null })
    })

    cy.get(_.items).should('have.length', 0)
  })

  it('updates the internal files list when the value prop changes', () => {
    const handleUpload = upload({ ref: 'ref-id' })
    const onChange = cy.stub().as('onChange')

    cy.mountComponent(RplFormFile, {
      props: {
        ...baseProps,
        onChange,
        handleUpload,
        multiple: true,
        value: [
          {
            ref: 'ref-id-1',
            file: {
              name: 'Test-1.jpg',
              type: 'image/jpeg',
              size: 100000
            }
          }
        ]
      }
    })

    cy.get(_.items).should('have.length', 1)
    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'success')

    drop([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 3)
    cy.get(_.items).eq(1).should('have.attr', 'data-status', 'success')
    cy.get(_.items).eq(2).should('have.attr', 'data-status', 'success')

    cy.get('@vue').then((wrapper: any) => {
      wrapper.setProps({
        value: [
          {
            ref: 'ref-id-4',
            file: {
              name: 'Test-4.jpg',
              type: 'image/jpeg',
              size: 100000
            }
          }
        ]
      })
    })

    cy.get(_.items).should('have.length', 4)
    cy.get(_.items).eq(3).should('have.attr', 'data-status', 'success')

    cy.get('@vue').then((wrapper: any) => {
      wrapper.setProps({ value: null })
    })

    cy.get(_.items).should('have.length', 0)
  })
})
