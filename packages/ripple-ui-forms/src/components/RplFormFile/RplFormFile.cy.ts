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
  itemRetry: '.rpl-form-file__item-retry',
  itemRemove: '.rpl-form-file__item-remove',
  progress: '.rpl-form-file__item-progress'
}

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
    const _id = ref ? `${ref}-${file.name.toLowerCase()}` : id

    return Promise.resolve({ id: _id, status, error })
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
    cy.get(_.requirements).should('contain', 'Maximum files: 1')

    select([
      file('test1.txt', 'test content 1'),
      file('test2.txt', 'test content 2')
    ])

    cy.get(_.errors).should('contain', 'There is a limit of 1 file.')
    cy.get(_.items).should('have.length', 0)

    expect(handleUpload).to.not.have.been.called
  })

  it('limit allowed files types to allowedTypes', () => {
    const handleUpload = upload()

    mount({
      handleUpload,
      multiple: true,
      allowedTypes: [
        { mimeType: 'image/jpeg', extension: 'jpg' },
        { mimeType: 'image/png', extension: 'png' }
      ]
    })

    cy.get(_.input).should('have.attr', 'accept', 'image/jpeg,image/png')
    cy.get(_.requirements).should('contain', 'Accepted file types: JPG, PNG')

    drop([
      file('Test 1.png', 'image/png'),
      file('Test 2.txt', 'text/plain')]
    )

    cy.get(_.items).should('have.length', 2)
    cy.get(_.items).eq(0)
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

    mount({ handleUpload })

    drop(file('Drop.txt'))

    cy.get(_.items).should('have.length', 1)
    cy.get(_.items)
      .eq(0)
      .should('contain', 'Drop.txt')
      .should('have.attr', 'data-status', 'success')

    cy.then(() => expect(handleUpload).to.have.been.calledOnce)
  })

  it('displays an error message next to the individual file when upload fails', () => {
    const handleUpload = upload({ status: 'error', error: 'Sorry, upload failed!' })

    mount({ handleUpload })

    select(file('Error.txt'))

    cy.get(_.items)
      .eq(0)
      .should('contain', 'Sorry, upload failed!')
      .should('have.attr', 'data-status', 'error')
  })

  it('displays an error message next to the individual file when it\'s invalid', () => {
    const handleUpload = upload()

    mount({
      handleUpload,
      allowedTypes: [{ mimeType: 'image/png', extension: 'png' }]
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

  it('calls onChange function with uploaded file ids', () => {
    const onChange = cy.stub()
    const handleUpload = upload({ ref: 'ref' })

    mount({ onChange, handleUpload, multiple: true })

    select(file('Test.txt'))

    cy.then(() =>
      expect(onChange).to.have.been.calledWith(['ref-test.txt'])
    )

    select(file('Another.txt'))

    cy.then(() =>
      expect(onChange).to.have.been.calledWith(['ref-test.txt', 'ref-another.txt'])
    )
  })

  it('shows an error when trying to upload more files than maxFiles', () => {
    const handleUpload = upload()

    mount({ handleUpload, maxFiles: 2 })

    cy.get(_.input).should('have.attr', 'multiple')
    cy.get(_.requirements).should('contain', 'Maximum files: 2')

    select([
      file('Test-1.txt'),
      file('Test-2.txt'),
      file('Test-3.txt')
    ])

    cy.get(_.items).should('have.length', 0)
    cy.get(_.errors).should('contain', 'There is a limit of 2 files')

    cy.then(() => expect(handleUpload).not.to.have.been.called)

    select([
      file('Test-1.txt'),
      file('Test-2.txt')
    ])

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
        Array.from({ length: 10000 }, () => 'Some test content that is larger than 0.001MB').join(',')
      )
    )

    cy.get(_.items).eq(0).should('contain', 'File is too large')

    cy.then(() => expect(handleUpload).not.to.have.been.called)
  })

  it('displays a progress bar while uploading', () => {
    const handleUpload = cy
      .stub()
      .callsFake(
        (id: string, file: File, onProgress: (progress: number) => void) => {
          onProgress(50)
          return new Promise((resolve) => {
            setTimeout(() => {
              onProgress(100)
              resolve({ id: 'file-1', status: 'success' })
            }, 200)
          })
        }
      )

    mount({ handleUpload })

    select(file('Test.txt'))

    cy.get(_.progress).should('exist').should('contain', '50%')

    cy.wait(400).then(() => {
      cy.get(_.progress).should('not.exist')
    })
  })

  it('allows users to retry uploading of failed files', () => {
    let callCount = 0
    const handleUpload = cy.stub().callsFake(() => {
      callCount++
      if (callCount === 1) {
        return Promise.resolve({
          id: 'file-1',
          status: 'error'
        })
      }
      return Promise.resolve({ id: 'file-1', status: 'success' })
    })

    mount({ handleUpload })

    select(file('File-1.txt'))

    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'error')

    cy.get(_.itemRetry).click()

    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'success')

    cy.then(() => expect(handleUpload).to.have.been.calledTwice)
  })

  it('allows users to removing files', () => {
    const onChange = cy.stub()
    const handleUpload = upload({ ref: 'server-id' })

    mount({ onChange, handleUpload, multiple: true })

    select([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 2)

    cy.get(_.itemRemove).eq(0).click()

    cy.then(() => expect(onChange).to.have.been.calledWith(['server-id-test-2.txt']))

    cy.get(_.items).should('have.length', 1).should('contain', 'Test-2.txt')

    cy.get(_.itemRemove).eq(0).click()

    cy.get(_.items).should('have.length', 0)

    cy.then(() => expect(onChange).to.have.been.calledWith([]))
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
        value: []
      }
    })

    drop([file('Test-1.txt'), file('Test-2.txt')])

    cy.get(_.items).should('have.length', 2)
    cy.get(_.items).eq(0).should('have.attr', 'data-status', 'success')
    cy.get(_.items).eq(1).should('have.attr', 'data-status', 'success')

    cy.get('@vue').then((wrapper: any) => {
      wrapper
        .setProps({
          value: ['ref-id-test-1.txt', 'ref-id-test-2.txt']
        })
        .then(() => wrapper.setProps({ value: null }))
    })

    cy.get(_.items).should('have.length', 0)
  })
})
