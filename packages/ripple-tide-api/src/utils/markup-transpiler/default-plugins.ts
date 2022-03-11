/// <reference types="cheerio" />

// Note: for add obj type prop in template, please return data instead of set them in template otherwise it won't work properly.
// e.g You have something like in your plugin: `<component-obj-prop :author="{name: 'Veronica', company: 'Veridian Dynamics'}"></component-obj-prop>`
// You should make template: `<component-obj-prop :author="myPluginData1.author"></component-obj-prop>`
// Then set myPluginData1.author = {name: 'Veronica', company: 'Veridian Dynamics'} and return {myPluginData1, myPluginData2 ... } in your plugin.
// See a example in `pluginEmbeddedMediaVideo` plugin below.

export const isRelativeUrl = (str: string): boolean => {
  if (str) {
    return true
  }
  return false
}

// Encode double quote before pass it into Vue template prop, otherwise it breaks the template.
const _escapeQuotes = (text: string) => {
  text = text || ''
  return text.replace('"', '&quot;')
}

const pluginButton = function (this: any) {
  // Button
  this.find('.button').map((i: any, el: any) => {
    const $button = this.find(el)
    const buttonHref = $button.attr('href')
    const buttonText = $button.text()
    const attributes: string[] = []
    attributes.push(`:icon="false"`)
    if (buttonHref) {
      attributes.push(`link="${buttonHref}"`)
    }
    const button = `<rpl-button ${attributes.join(
      ' '
    )}>${buttonText}</rpl-button>`
    return $button.replaceWith(button)
  })
}

const pluginTables = function (this: any) {
  // Wrap tables with a div.
  this.find('table').map((i: any, el: any) => {
    const $table = this.find(el)
    return $table.wrap(`<div class="rpl-markup__table"></div>`)
  })
}

const pluginEmbeddedDocument = function (this: any) {
  this.find(
    '.embedded-entity--media--file, .embedded-entity--media--document, .embedded-entity .media--type-document'
  ).map((i: any, element: any) => {
    const el = this.find(element)
    const mediaType = el.hasClass('embedded-entity--media--file')
      ? 'file'
      : 'document'
    const titleSelector =
      mediaType === 'document' ? '.file--title' : '.field--name-name'
    const fileSizeSelector = '.file--size'

    let url = el.find('a').attr('href')
    const fileName = el.find(titleSelector).text()
    const fileSize = el.find(fileSizeSelector).text()
    const caption = el.find('figcaption').text()
    let fileType = ''
    const fileTypeClasses = el.find('.file').attr('class')

    // TODO - Add other icons for file types. Only PDF correctly displays.
    if (fileTypeClasses) {
      fileTypeClasses
        .split(' ')
        .filter(
          (cls: string | string[]) =>
            cls.includes('file--mime') || cls.includes('file--x')
        )
        .forEach((mimeType: any) => {
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
              case 'file--mime-application-rtf':
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
              case 'file--mime-application-pdf':
                fileType = 'pdf'
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
      const name = _escapeQuotes(fileName)
      const extension = fileType
      const filesize = fileSize
      const ariaLabel = `${name} File type: ${extension}. Size: ${filesize}`
      const supportedIcons = [
        'ai',
        'csv',
        'doc',
        'docx',
        'dot',
        'dotm',
        'dotx',
        'eps',
        'ics',
        'indd',
        'pdf',
        'ppt',
        'pptx',
        'tif',
        'txt',
        'xls',
        'xlsx',
        'zip'
      ]
      const icon = supportedIcons.indexOf(fileType) >= 0 ? fileType : 'document'
      const isExternalLink = !isRelativeUrl(url)
      const documentlink = `
      <figure class="rpl-markup__document-link">
        <rpl-text-link class="rpl-markup__document-link-link" aria-label="${ariaLabel}" link="${url}" :icon="false" :underline="false" download="${
        isExternalLink ? 'false' : ''
      }" target="_blank">
          ${
            icon
              ? `<svg-icon role="presentation" class="rpl-markup__document-link-icon" name="${icon}" width="30px" height="30px"></svg-icon>`
              : ''
          }
          <div class="rpl-markup__document-link-info">
            <span class="rpl-markup__document-link-title">${name}</span>
            <div class="rpl-markup__document-link-meta">
              ${
                extension
                  ? `<span class="rpl-markup__document-link-type">${extension}</span>`
                  : ''
              }
              ${
                filesize
                  ? `<span class="rpl-markup__document-link-size${
                      extension && filesize
                        ? ' rpl-markup__document-link-size--seperator'
                        : ''
                    }">${filesize}</span>`
                  : ''
              }
            </div>
          </div>
        </rpl-text-link>
        ${
          caption
            ? `<figcaption class="rpl-markup__document-link-caption">${_escapeQuotes(
                caption
              )}</figcaption>`
            : ''
        }
      </figure>
      `
      return el.replaceWith(documentlink)
    }
    return el
  })
}

// const parseForLinks = function () {
//   // Give h2 headings an id so they can be linked to
//   this.find('h2').map((i, element) => {
//     const el = this.find(element)
//     const idName = el.text()
//     return el.attr('id', idName)
//   })
// }

const pluginImage = function (this: any) {
  // wrap iframes
  this.find('.embedded-entity--media--image').map((i: any, el: any) => {
    const $container = this.find(el)
    if ($container) {
      const $img = $container.find('img')
      const height = $img.attr('height')
      const src = $img.attr('src')
      const alt = $img.attr('alt')
      return $container.replaceWith(
        `<div class="rpl-markup__image"><rpl-responsive-img src="${src}" alt="${alt}" :height="${height}" fit="contain" :blur="true" :srcset="[375, 696, 696, 1200]" width="818" ></rpl-responsive-img></div>`
      )
    }
  })
}

const pluginIframe = function (this: any) {
  // wrap iframes
  this.find('iframe').map((i: any, el: any) => {
    const $iframe = this.find(el)
    if ($iframe.hasClass('rpl-markup__embedded-video-frame') !== true) {
      return $iframe.wrap(`<div class="rpl-markup__iframe-container"></div>`)
    }
  })
}

const pluginEmbeddedMediaVideo = function (this: any) {
  // wrap iframes
  this.find('.embedded-entity--media--embedded-video').map(
    (i: any, el: any) => {
      // Component data
      const element = this.find(el)
      const iframe = element.find('iframe')
      const height = iframe.attr('height')
      const width = iframe.attr('width')
      const src = iframe.attr('src')
      const figcaption = element.find('figcaption')
      const transcript = figcaption ? figcaption.text() : null
      const link = element.find('.field--name-field-media-link a')
      // For Obj type props, using data to pass value to avoid HTML syntax and encoding issue.
      const mediaLink: { text: string; url: string } = {
        text: link.text() || '',
        url: link.attr('href') || ''
      }
      const variant = mediaLink ? 'link' : 'full'

      let html = `
    <div class="rpl-markup__embedded-video">
      <div class="rpl-markup__embedded-video-iframe-container">
        <iframe class="rpl-markup__embedded-video-frame" width="${width}" height="${height}" src="${src}" allowfullscreen></iframe>
      </div>
    `
      if (variant === 'link') {
        html += `
      <div class="rpl-markup__embedded-video-link">
        <rpl-text-link link="${mediaLink.url}" :icon="false">${mediaLink.text}</rpl-text-link>
      </div>
      `
      }
      if (variant === 'full' || transcript) {
        html += `<div class="rpl-markup__embedded-video-transcript">${transcript}</div>`
      }
      html += `</div>`
      return element.replaceWith(html)
    }
  )
}

const pluginLinks = function (this: any) {
  this.find('a').map((i: any, el: any) => {
    const $a = this.find(el)
    const href = $a.attr('href')
    const isRelative = isRelativeUrl(href)
    const text = $a.text()
    const target = $a.attr('target')

    const attributes: string[] = []
    attributes.push(!isRelative ? `icon="external"` : `:icon="false"`)
    if (href) {
      attributes.push(`link="${href}"`)
    }
    if (target) {
      attributes.push(`target="${target}"`)
    }
    const a = `<rpl-text-link ${attributes.join(' ')}>${_escapeQuotes(
      text
    )}</rpl-text-link>`
    return $a.replaceWith(a)
  })
}

export default [
  pluginButton,
  pluginEmbeddedDocument,
  pluginEmbeddedMediaVideo,
  pluginIframe,
  pluginImage,
  pluginLinks,
  pluginTables
]
