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
  this.find('table').map((i, el) => {
    const table = this.find(el)
    const markup = `<div class="${wrapperClass}"></div>`
    return table.wrap(markup)
  })
}

const pluginEmbeddedDocument = function () {
  this.find('.embedded-entity--media--file, .embedded-entity--media--document, .embedded-entity .media--type-document').map((i, element) => {
    const el = this.find(element)
    const mediaType = el.hasClass('embedded-entity--media--file') ? 'file' : 'document'
    const titleSelector = mediaType === 'document' ? '.file--title' : '.field--name-name'
    const fileSizeSelector = '.file--size'

    let url = el.find('a').attr('href')
    const fileName = el.find(titleSelector).text()
    const fileSize = el.find(fileSizeSelector).text()
    const caption = el.find('figcaption').text()
    let fileType = ''
    const fileTypeClasses = el.find('.file').attr('class')

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
            case 'file--mime-application-postscript':
              fileType = 'eps'
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
            case 'file--mime-text-calendar':
              fileType = 'ics'
              break
          }
        }
      })
    }

    if (url) {
      url = url.replace(/^.*\/\/[^/]+/, '')
    }

    if (fileType === '') {
      fileType = el.find('.file--type').text().toLowerCase()
    }

    if (url && fileName && fileSize && fileType) {
      const documentlink = `<rpl-document-link name="${fileName}" extension="${fileType}" filesize="${fileSize}" url="${url}" caption="${caption}"></rpl-document-link>`
      return el.replaceWith(documentlink)
    }
    return el
  })
}

const parseForLinks = function () {
  // Give h2 headings an id so they can be linked to
  const kebabCase = require('lodash.kebabcase')

  this.find('h2').map((i, element) => {
    const el = this.find(element)
    const idName = el.text()
    return el.attr('id', kebabCase(idName))
  })
}

const pluginIframe = function () {
  // wrap iFrames
  const wrapperClasses = ['rpl-markup__iframe-container', 'rpl-markup__iframe-container--16x9']
  this.find('iframe').map((i, el) => {
    const iframe = this.find(el)
    const markup = `<div class="${wrapperClasses.join(' ')}"></div>`
    return iframe.wrap(markup)
  })
}

const pluginEmbeddedMediaVideo = function () {
  // wrap iFrames
  this.find('.embedded-entity--media--embedded-video').map((i, el) => {
    const element = this.find(el)
    const iframe = this.find('iframe')
    const height = iframe.attr('height')
    const width = iframe.attr('width')
    const src = iframe.attr('src')
    const lang = iframe.attr('lang')
    const figcaption = element.find('figcaption')
    const transcript = figcaption ? figcaption.text() : null
    const link = this.find('.field--name-field-media-link a')
    const mediaLink = link ? `{ text: '${link.text()}', url: '${link.attr('href')}' }` : null
    const RplEmbeddedVideo = `
      <rpl-embedded-video
        width="${width}"
        height="${height}"
        src="${src}"
        class="rpl-markup__embedded-video"
        lang="${lang}"
        variant="link"
        :display-transcript="true"
        ${link && ':media-link="' + mediaLink + '"'}
        ${transcript && 'transcript="' + transcript + '"'}
      />
    `
    return element.replaceWith(RplEmbeddedVideo)
  })
}

const pluginLinks = function () {
  this.find('a').map((i, el) => {
    const $a = this.find(el)
    const href = $a.attr('href')
    const text = $a.text()

    const target = $a.attr('target')
    let theme = 'primary'
    let a
    if (target) {
      a = `<rpl-text-link url="${href}" theme="${theme}" target="${target}" text="${text}"></rpl-text-link>`
    } else {
      a = `<rpl-text-link url="${href}" theme="${theme}" text="${text}"></rpl-text-link>`
    }

    return $a.replaceWith(a)
  })
}

export default [
  parseForLinks,
  pluginButton,
  pluginEmbeddedDocument,
  pluginEmbeddedMediaVideo,
  pluginIframe,
  pluginLinks,
  pluginTables
]
