/// <reference types="cheerio" />

// Note: for add obj type prop in template, please return data instead of set them in template otherwise it won't work properly.
// e.g You have something like in your plugin: `<component-obj-prop :author="{name: 'Veronica', company: 'Veridian Dynamics'}"></component-obj-prop>`
// You should make template: `<component-obj-prop :author="myPluginData1.author"></component-obj-prop>`
// Then set myPluginData1.author = {name: 'Veronica', company: 'Veridian Dynamics'} and return {myPluginData1, myPluginData2 ... } in your plugin.
// See a example in `pluginEmbeddedMediaVideo` plugin below.

import { epochToDate } from '../epochToDate.js'

export const isRelativeUrl = (str: string): boolean => {
  if (str) {
    return true
  }
  return false
}

const pluginTables = function (this: any) {
  // Wrap tables with a div.
  this.find('table').map((i: any, el: any) => {
    const $table = this.find(el)
    return $table.wrap(`<div class="rpl-table"></div>`)
  })
}

const pluginCallout = function (this: any) {
  // These callouts are added in drupal via the 'C' button in the wysiwyg editor.
  // Wrap callouts with a div. If there are multiple callouts in a row, wrap them all in a div.
  this.find('.callout-wrapper').each((i: any, el: any) => {
    if (this.find(el).prev().hasClass('callout-wrapper')) {
      return
    }

    this.find(el)
      .nextUntil(':not(.callout-wrapper)')
      .addBack()
      .wrapAll('<div class="rpl-callout"></div>')
  })

  // These callouts are added in drupal via the styles dropdown in the wysiwyg editor.
  // Remove drupal class, add ripple class
  this.find('.wysiwyg-callout').map((i: any, el: any) => {
    const $callout = this.find(el)
    return $callout
      .removeClass()
      .addClass('rpl-callout')
      .addClass('rpl-callout--neutral')
  })
}

const pluginQuotation = function (this: any) {
  this.find('.quotation').map((i: number, el: any) => {
    // Remove drupal class, add type to paras
    const $quotation = this.find(el)
    $quotation.removeClass().addClass('rpl-blockquote__quote')
    $quotation.find('p').map((j: number, item: any) => {
      this.find(item).addClass('rpl-type-p-large-fixed')
    })

    // Parse citation block
    const $citation = $quotation.find('footer')
    const authors: string[] = []
    $citation.find('span').map((j: number, item: any) => {
      authors.push(
        `<span class="rpl-blockquote__author-name">${this.find(
          item
        ).text()}</span>`
      )
    })
    $citation.remove()

    // Rewrite blockquote
    return $quotation.replaceWith(`
<figure class="rpl-blockquote">
  ${$quotation}
  <figcaption class="rpl-blockquote__author rpl-type-label-small">
    ${authors.join('')}
  </figcaption>
</figure>
`)
  })
}

const pluginDocuments = function (this: any) {
  this.find(
    '.embedded-entity--media--file, .embedded-entity--media--document'
  ).map((i: number, el: any) => {
    const $element = this.find(el)
    const mediaType = $element.hasClass('embedded-entity--media--file')
      ? 'file'
      : 'document'
    const titleSelector =
      mediaType === 'document' ? '.file--title' : '.field--name-name'

    const label = $element.find('a[aria-label]').attr('aria-label'),
      link = $element.find('a').attr('href'),
      title = $element.find(titleSelector).text(),
      fileSize = $element.find('.file--size').text(),
      updated = $element.attr('data-last-updated')

    let updatedMarkup = ''

    if (updated) {
      const date = epochToDate(updated)
      updatedMarkup = date
        ? `<div class="rpl-file__updated">Updated ${date}</div>`
        : ''
    }

    let fileType = $element.find('.file--type').text()
    const fileTypeClasses = $element.find('.file').attr('class')

    // Some file types come back as simply 'other' from drupal (e.g. zip files), so we here we try to get the file type from the classes
    if (fileTypeClasses) {
      fileTypeClasses
        .split(' ')
        .filter((cls) => cls.includes('file--mime') || cls.includes('file--x'))
        .forEach((mimeType) => {
          switch (mimeType) {
            case 'file--mime-application-zip':
              fileType = 'zip'
              break
          }
        })
    }

    return $element.replaceWith(`
<figure class="rpl-document">
  <a class="rpl-document__link rpl-u-focusable-within" aria-label="${label}" href="${link}" target="_blank">
    <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">
      <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>
    </span>
    <div class="rpl-document__content">
      <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline">${title}</span>
      <div class="rpl-document__info rpl-type-label-small">
        <span class="rpl-file__meta">${fileType}</span>
        <span class="rpl-file__meta">${fileSize}</span>
        ${updatedMarkup}
      </div>
    </div>
  </span>
  <span class="rpl-u-visually-hidden">(opens in a new window)</span>
  </a>
</figure>
`)
  })
}

const pluginEmbededVideo = function (this: any) {
  this.find('.embedded-entity--media--embedded-video').map(
    (i: number, el: any) => {
      const $video = this.find(el)
      const iframe = $video.find('iframe')
      const height = iframe.attr('height')
      const width = iframe.attr('width')
      const source = iframe.attr('src')
      const title = $video.attr('title') || ''
      const caption = $video.find('figcaption')?.text()
      const link = $video.find('.field--name-field-media-link a')?.attr('href')

      const captionMarkup = caption
        ? `<figcaption class="rpl-media-embed__figcaption">
        <p class="rpl-media-embed__caption rpl-type-p">${caption}</p>
      </figcaption>`
        : ''

      const transcriptMarkup = link
        ? `<div class="rpl-media-embed__actions-list">
        <a class="rpl-text-link rpl-u-focusable-inline rpl-media-embed__transcript-link rpl-media-embed__action rpl-u-focusable-inline rpl-type-p" href="${link}">
          <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-view">
            <svg role="presentation"><use xlink:href="#icon-view"></use></svg>
          </span>View transcript
        </a>
      </div>`
        : ''

      return $video.replaceWith(`<div class="rpl-media-embed">
        <figure class="rpl-media-embed__figure">
          <div class="rpl-media-embed__video-container">
            <iframe class="rpl-media-embed__video rpl-u-screen-only" src="${source}" title="${title}" width="${width}" height="${height}" allow="autoplay; fullscreen; picture-in-picture;" allowfullscreen></iframe>
            <a href="${source}" class="rpl-text-link rpl-type-p rpl-u-print-only">${title}</a>
          </div>
          ${captionMarkup}
        </figure>
        ${transcriptMarkup}
      </div>`)
    }
  )
}

const pluginImages = function (this: any) {
  // Find all drupal image embeds
  this.find('.embedded-entity--media--image').map((i: any, el: any) => {
    const $img = this.find(el).find('img')
    const width = $img.attr('width')
    const src = $img.attr('src')
    const alt = $img.attr('alt')
    // this is the max width of the content area
    const contentWidth = 720
    return this.find(el).replaceWith(
      `<img src="${src}" class="rpl-img" width="${width}" alt="${alt}" srcset="${src}?width=${contentWidth},
      ${src}?width=${contentWidth * 2} 2x"></img>`
    )
  })
}

const pluginButtons = function (this: any) {
  this.find('.button').map((i: any, el: any) => {
    const $button = this.find(el)
    const variant = $button.hasClass('button--secondary')
      ? 'rpl-button--outlined'
      : 'rpl-button--filled'

    $button
      .removeClass('button button--secondary')
      .addClass(
        `rpl-button rpl-button--default rpl-u-focusable-block ${variant}`
      )

    return $button.wrapInner(
      '<span class="rpl-button__label rpl-type-label rpl-type-weight-bold"></span>'
    )
  })
}

const pluginLinks = function (this: any) {
  this.find('a').map((i: any, el: any) => {
    const $anchor = this.find(el)

    if (!$anchor.attr('class')) {
      $anchor.addClass('rpl-text-link rpl-u-focusable-inline')
    }

    if (
      $anchor.attr('target') === '_blank' &&
      $anchor.find('span.rpl-u-visually-hidden').length === 0
    ) {
      $anchor.append(
        '<span class="rpl-u-visually-hidden">(opens in a new window)</span>'
      )
    }

    return $anchor
  })
}

const pluginIFrames = function (this: any) {
  this.find('iframe').map((i: any, el: any) => {
    const $iframe = this.find(el)
    const wrapperClasses = ['rpl-iframe']

    // If no height setting from CMS, we give it a default height
    if (!$iframe.attr('height')) {
      wrapperClasses.push('rpl-iframe--default')
    }

    // If it's a PowerBI embed we remove the max-height setting
    if ($iframe.attr('src')?.includes('powerbi.com')) {
      wrapperClasses.push(`rpl-iframe--auto`)
    }

    const markup = `<div class="${wrapperClasses.join(' ')}"></div>`
    return $iframe.wrap(markup)
  })
}

export default [
  pluginTables,
  pluginCallout,
  pluginQuotation,
  pluginDocuments,
  pluginEmbededVideo,
  pluginImages,
  pluginButtons,
  pluginLinks,
  pluginIFrames
]
