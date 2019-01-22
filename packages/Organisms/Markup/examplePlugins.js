/*
 * These are examples of plugins and how they are implemented.
 * These are meant for example only. Plugins should be passed to RplMArkup component as plugins prop or in rplOptions.markupPlugins
*/

const pluginButton = function () {
  // Button
  this.find('.button').map((i, el) => {
    const $button = this.find(el)
    const buttonHref = $button.attr('href')
    const buttonText = $button.text()
    let theme = 'primary'
    if ($button.hasClass('button--secondary')) {
      theme = 'secondary'
    }
    const button = `<rpl-button href="${buttonHref}" theme="${theme}">${buttonText}</rpl-button>`
    return $button.replaceWith(button)
  })
}

const pluginTables = function () {
  // Wrap tables with a div.
  const wrapperClass = 'table-container'
  this.find('table').map(el => {
    const $table = this.find(el)
    const markup = `<div class="${wrapperClass}">${$table}</table>`
    return $table.replaceWith(markup)
  })
}

const pluginEmbeddedDocument = function () {
  this.find('.embedded-entity--media--document, .embedded-entity .media--type-document').map((i, el) => {
    const $root = this.find(el)
    const url = $root.find('a').attr('href')
    const fileName = $root.find('.file--title').text()
    const fileSize = $root.find('.file--size').text()
    const caption = $root.find('figcaption').text()
    let fileType = ''
    const fileTypeClasses = $root.find('.file').attr('class')
    if (fileTypeClasses) {
      fileTypeClasses.split(' ').filter(cls => cls.includes('file--mime') || cls.includes('file--x')).forEach(mimeType => {
        if (fileType === '') {
          switch (mimeType) {
            case 'file--mime-application-zip':
              fileType = 'zip'
              break
            case 'file--mime-application-msword':
              fileType = 'doc'
              break
            case 'file--x-office-document':
            case 'file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document':
              fileType = 'docx'
              break
            case 'file--x-office-spreadsheet':
            case 'file--mime-application-vnd-ms-excel':
              fileType = 'xlsx'
              break
            case 'file--mime-text-plain':
              fileType = 'txt'
              break
            case 'file--mime-text-csv':
              fileType = 'csv'
              break
          }
        }
      })
    }

    if (fileType === '') {
      fileType = $root.find('.file--type').text().toLowerCase()
    }

    if (url && fileName && fileSize && fileType) {
      const documentlink = `<rpl-document-link name="${fileName}" extension="${fileType}" filesize="${fileSize}" url="${url}" caption="${caption}"></rpl-document-link>`
      return $root.replaceWith(documentlink)
    }
    return $root
  })
}

const pluginLinks = function () {
  this.find('a').map((i, el) => {
    const $a = this.find(el)
    const href = $a.attr('href')
    const text = $a.text()
    let theme = 'primary'
    const a = `<rpl-text-link href="${href}" theme="${theme}" text="${text}"></rpl-text-link>`
    return $a.replaceWith(a)
  })
}

export default [
  pluginButton,
  pluginTables,
  pluginEmbeddedDocument,
  pluginLinks
]
