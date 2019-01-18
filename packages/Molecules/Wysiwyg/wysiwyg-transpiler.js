import cheerio from 'cheerio'

// Create plugins for each embedded components and add them into plugins array below.
// A plugin is doing the HTML replace job, find the Tide component in HTML and replace the dom to vue template.
// This is backward compatible as original css way will keep working unless the component is changed into Ripple component.
// Depends on how hard the plugins replacing is, we may or may not do all of the below list.
// TODO list:
// - blockquote
// - callout
// - document links
// - links
// - external links
// - image
// - video
// - audio
// - table
// - map
// - iframe

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

// TODO: We need to create callout component in Ripple first to make below working.
// const pluginCallout = function () {
//   // Callout
//   this.find('.wysiwyg-callout').map((i, el) => {
//     const calloutContent = this.find(el).html()
//     const callout = `<rpl-callout>${calloutContent}</rpl-callout>`
//     return this.find(el).replaceWith(callout)
//   })
// }

const plugins = [
  // pluginCallout,
  pluginEmbeddedDocument,
  pluginLinks,
  pluginButton
]

export const wysiwygTranspiler = (html) => {
  // Wrap the html as Vue template require one root element.
  html = `<div class="tide-wysiwyg__inner">${html}</div>`
  const $ = cheerio.load(html)
  const $body = $('body')

  // Load plugins to transpile embedded components
  for (const [index, plugin] of plugins.entries()) {
    $.prototype[`plugin${index}`] = plugin
    $body[`plugin${index}`]()
  }

  return $('body').html()
}
