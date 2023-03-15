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
  this.find('.embedded-entity--media--document').map((i: number, el: any) => {
    const $document = this.find(el)

    const label = $document.find('a[aria-label]').attr('aria-label'),
      link = $document.find('a').attr('href'),
      title = $document.find('.file--title').text(),
      filetype = $document.find('.file--type').text(),
      filesize = $document.find('.file--size').text()

    return $document.replaceWith(`
<figure class="rpl-document">
  <a tabindex="-1" class="rpl-document__link" aria-label="${label}" href="${link}" target="_blank">
    <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">
      <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>
    </span>
    <div class="rpl-document__content">
      <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline" tabindex="0">${title}</span>
      <div class="rpl-document__info rpl-type-label-small">
        <span class="rpl-file__meta">${filetype}</span>
        <span class="rpl-file__meta">${filesize}</span>
      </div>
    </div>
  </span>
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
            <iframe class="rpl-media-embed__video" src="${source}" title="${title}" width="${width}" height="${height}" allow="autoplay; fullscreen; picture-in-picture;" allowfullscreen></iframe>
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
    const $img = this.find('img')
    const width = $img.attr('width')
    const src = $img.attr('src')
    const alt = $img.attr('alt')
    // this is the max width of the content area
    const contentWidth = 606
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

    return $anchor
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
  pluginLinks
]
