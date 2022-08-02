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

const pluginTables = function (this: any) {
  // Wrap tables with a div.
  this.find('table').map((i: any, el: any) => {
    const $table = this.find(el)
    return $table.wrap(`<div class="rpl-table"></div>`)
  })
}

const pluginCallout = function (this: any) {
  // replace drupal class with rpl class
  this.find('.wysiwyg-callout').map((i: any, el: any) => {
    const $callout = this.find(el)
    return $callout.removeClass().addClass('rpl-callout')
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

export default [pluginCallout, pluginEmbeddedDocument, pluginTables]
