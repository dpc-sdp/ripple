import { expect, describe, it, vi } from 'vitest'
import markupTranspiler from './index'

vi.stubEnv(
  'NUXT_PUBLIC_TIDE_BASE_URL',
  'https://develop.content.reference.sdp.vic.gov.au/'
)

const markup = {
  table: [
    `<table>
  <colgroup><col data-width="40%"><col data-width="60%"></colgroup>
  <tbody>
    <tr><th>Term 1</th><td>January</td></tr>
    <tr><th>Term 2</th><td>April</td></tr>
  </tbody>
</table>`,
    `<table>
  <thead><tr><th>One</th><th>Two</th><th>Three</th></tr></thead>
  <tbody><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr></tbody>
</table>`
  ],
  callout: `<div class="callout-wrapper"><p>Hey it's a callout</p></div><div class="callout-wrapper"><p>And another callout</p></div>
<div class="wysiwyg-callout">This one is wysiwyg</div>`,
  quotation: `<blockquote class="quotation"><p>It was the best of times, it was the blurst of times.</p><footer><span>Chimp 273</span></footer></blockquote>`,
  document: [
    `<div class="embedded-entity--media--file" data-last-updated="1704932250"><a class="file file--mime-application-zip" href="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/file.zip">File</a></div>`,
    `<div data-show-last-updated="1" class="embedded-entity embedded-entity--media embedded-entity--media--secure-file" data-last-updated="1727162281"><article class="media media--type-secure-file media--view-mode-embedded"><div class="field field--name-field-secure-file field--type-file field--label-visually_hidden"><div class="field__label visually-hidden">File</div><div class="field__item"><span class="file file--mime-application-pdf file--application-pdf"><a href="https://content.vic.gov.au/system/files/secure/2024-09/file-sample_150kB.pdf" class="application-pdf" aria-label="Secure document File type: PDF. Size: 139.44 KB."><span class="file--title">Secure document</span><span class="file--type">PDF</span><span class="file--size">139.44 KB</span></a> <span class="file__size">(139.44 KB)</span></span></div></div></article></div>`
  ],
  video: `<figure class="embedded-entity--media--embedded-video"><iframe src="https://www.youtube.com/embed/1234" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe><figcaption>Caption goes here</figcaption</figure>`,
  image: [
    `<div class="embedded-entity--media--image"><img src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/image.jpg" alt="Image" title="Image" width="200" height="100"></div>`,
    `<div class="embedded-entity--media--image"><img src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/image.jpg?itok=Noa2hd8" alt="Image" title="Image" width="200" height="100"></div>`,
    `<div class="embedded-entity embedded-entity--media embedded-entity--media--image"><article class="media media--type-image media--view-mode-embedded-with-caption"><div class="field field--name-field-media-image field--type-image field--label-hidden field__item"><img loading="lazy" src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/2025-07/wallpaper-1.jpg" width="1440" height="880" alt="Wallpaper 1 alt text" title="Wallpaper 1 title"></div><div class="field field--name-field-media-caption field--type-string field--label-hidden field__item">Wallpaper caption from image</div></article></div>`,
    `<figure class="caption caption-drupal-entity"><div class="embedded-entity embedded-entity--media embedded-entity--media--image"><article class="media media--type-image media--view-mode-embedded"><div class="field field--name-field-media-image field--type-image field--label-hidden field__item"><img loading="lazy" src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/2025-07/wallpaper-2.jpg" width="1200" height="500" alt="Wallpaper 2 alt text" title="Wallpaper 2 title"></div></article></div><figcaption>Caption from wallpaper instance</figcaption></figure>`
  ],
  button: `<a class="button" href="https://example.com">Button</a>`,
  link: `<a href="https://example.com" target="_blank">Link</a>`,
  list: `<ul type="disc"><li>List item</li></ul><ul type="circle"><li>List item</li></ul><ul type="square"><li>List item</li></ul><ol type="i"><li>List item</li></ol><ol type="I"><li>List item</li></ol><ol type="a"><li>List item</li></ol><ol type="A"><li>List item</li></ol>`,
  iframe: `<iframe src="https://powerbi.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`,
  alignment: `<p class="text-align-left">Left</p><p class="text-align-center">Center</p><p class="text-align-right">Right</p>`
}

const fixed = {
  table: [
    `<div class="rpl-table"><div class="rpl-table__scroll-container rpl-u-focusable-outline--visible" tabindex="0"><table>
  <colgroup><col style="width: 40%"><col style="width: 60%"></colgroup>
  <tbody>
    <tr><th scope="row">Term 1</th><td>January</td></tr>
    <tr><th scope="row">Term 2</th><td>April</td></tr>
  </tbody>
</table></div></div>`,
    `<div class="rpl-table"><div class="rpl-table__scroll-container rpl-u-focusable-outline--visible" tabindex="0"><table>
  <thead><tr><th scope="col">One</th><th scope="col">Two</th><th scope="col">Three</th></tr></thead>
  <tbody><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr><tr><td>Lorem minim</td><td>Lorem minim</td><td>Lorem minim</td></tr></tbody>
</table></div></div>`
  ],
  callout: `<div class="rpl-callout"><div class="rpl-callout__wrapper"><p>Hey it's a callout</p></div><div class="rpl-callout__wrapper"><p>And another callout</p></div></div>
<div class="rpl-callout rpl-callout--neutral">This one is wysiwyg</div>`,
  quotation: `
<figure class="rpl-blockquote">
  <blockquote class="rpl-blockquote__quote"><p class="rpl-type-p-large-fixed">It was the best of times, it was the blurst of times.</p></blockquote>
  <figcaption class="rpl-blockquote__author rpl-type-label-small"><span class="rpl-blockquote__author-name">Chimp 273</span></figcaption>
</figure>
`,
  document: [
    `
<figure class="rpl-document">
  <a class="rpl-document__link rpl-u-focusable-within" aria-label="undefined" href="/sites/default/files/file.zip" target="_blank">
    <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">
      <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>
    </span>
    <div class="rpl-document__content">
      <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline"></span>
      <div class="rpl-document__info rpl-type-label-small">
        <span class="rpl-file__meta">zip</span>
        <span class="rpl-file__meta"></span>
      <div class="rpl-file__updated">Updated 11 Jan 2024</div></div>
    </div>
    <span class="rpl-u-visually-hidden">(opens in a new window)</span>
  </a>
</figure>
`,
    `
<figure class="rpl-document">
  <a class="rpl-document__link rpl-u-focusable-within" aria-label="Secure document File type: PDF. Size: 139.44 KB." href="https://content.vic.gov.au/system/files/secure/2024-09/file-sample_150kB.pdf" target="_blank">
    <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-file-secure">
      <svg role="presentation"><use xlink:href="#icon-file-secure"></use></svg>
    </span>
    <div class="rpl-document__content">
      <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline">Secure document</span>
      <div class="rpl-document__info rpl-type-label-small">
        <span class="rpl-file__meta">PDF</span>
        <span class="rpl-file__meta">139.44 KB</span>
      <div class="rpl-file__updated">Updated 24 Sept 2024</div></div>
    </div>
    <span class="rpl-u-visually-hidden">(opens in a new window)</span>
  </a>
</figure>
`
  ],
  video: `
<div class="rpl-media-embed rpl-media-embed--background">
  <figure class="rpl-media-embed__figure">
    <div class="rpl-media-embed__video-container">
      <div class="rpl-iframe"><iframe class="rpl-media-embed__video rpl-u-screen-only" src="https://www.youtube.com/embed/1234" title="" width="undefined" height="undefined" allow="autoplay; fullscreen; picture-in-picture;" allowfullscreen=""></iframe></div>
      <a href="https://www.youtube.com/embed/1234" class="rpl-text-link rpl-type-p rpl-u-print-only"></a>
    </div>
    <figcaption class="rpl-media-embed__figcaption">Caption goes here</figcaption>
  </figure>

</div>
`,
  image: [
    `<div class="rpl-media-embed rpl-media-embed--background" style="--local-content-width: 200px">
        <figure class="rpl-media-embed__figure">
          <img src="/sites/default/files/image.jpg" class="rpl-image" width="200" height="100" alt="Image" srcset="/sites/default/files/image.jpg?width=720, /sites/default/files/image.jpg?width=1440 2x">
        </figure>
      </div>`,
    `<div class="rpl-media-embed rpl-media-embed--background" style="--local-content-width: 200px">
        <figure class="rpl-media-embed__figure">
          <img src="/sites/default/files/image.jpg?itok=Noa2hd8" class="rpl-image" width="200" height="100" alt="Image" srcset="/sites/default/files/image.jpg?itok=Noa2hd8&amp;width=720, /sites/default/files/image.jpg?itok=Noa2hd8&amp;width=1440 2x">
        </figure>
      </div>`,
    `<div class="rpl-media-embed rpl-media-embed--background" style="--local-content-width: 1440px">
        <figure class="rpl-media-embed__figure">
          <img src="/sites/default/files/2025-07/wallpaper-1.jpg" class="rpl-image" width="1440" height="880" alt="Wallpaper 1 alt text" srcset="/sites/default/files/2025-07/wallpaper-1.jpg?width=720, /sites/default/files/2025-07/wallpaper-1.jpg?width=1440 2x"><figcaption class="rpl-media-embed__figcaption">Wallpaper caption from image</figcaption>
        </figure>
      </div>`,
    `<div class="rpl-media-embed rpl-media-embed--background" style="--local-content-width: 1200px">
        <figure class="rpl-media-embed__figure">
          <img src="/sites/default/files/2025-07/wallpaper-2.jpg" class="rpl-image" width="1200" height="500" alt="Wallpaper 2 alt text" srcset="/sites/default/files/2025-07/wallpaper-2.jpg?width=720, /sites/default/files/2025-07/wallpaper-2.jpg?width=1440 2x"><figcaption class="rpl-media-embed__figcaption">Caption from wallpaper instance</figcaption>
        </figure>
      </div>`
  ],
  button: `<a class="rpl-button rpl-button--default rpl-u-focusable-block rpl-button--filled" href="https://example.com"><span class="rpl-button__label rpl-type-label rpl-type-weight-bold">Button</span></a>`,
  link: `<a href="https://example.com" target="_blank" class="rpl-text-link rpl-u-focusable-inline">Link<span class="rpl-u-visually-hidden">(opens in a new window)</span></a>`,
  list: `<ul class="rpl-type-list-ul--disc"><li>List item</li></ul><ul class="rpl-type-list-ul--disc"><li>List item</li></ul><ul class="rpl-type-list-ul--square"><li>List item</li></ul><ol class="rpl-type-list-ol--lower-roman"><li>List item</li></ol><ol class="rpl-type-list-ol--upper-roman"><li>List item</li></ol><ol class="rpl-type-list-ol--lower-latin"><li>List item</li></ol><ol class="rpl-type-list-ol--upper-latin"><li>List item</li></ol>`,
  iframe: `<div class="rpl-iframe rpl-iframe--default rpl-iframe--auto"><iframe src="https://powerbi.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>`,
  alignment: `<p class="rpl-u-text-left">Left</p><p class="rpl-u-text-center">Center</p><p class="rpl-u-text-right">Right</p>`
}

describe('ripple-tide-api/utils/markup-transpiler/cheerio', () => {
  for (const [label, html] of Object.entries(markup)) {
    it(`runs ${label} plugin on markup`, () => {
      if (Array.isArray(html)) {
        html.forEach((entry, i) => {
          expect(markupTranspiler(entry)).toEqual(fixed[label][i])
        })
      } else {
        expect(markupTranspiler(html)).toEqual(fixed[label])
      }
    })
  }
})
