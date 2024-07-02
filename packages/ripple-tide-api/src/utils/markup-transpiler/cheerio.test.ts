import { expect, describe } from '@jest/globals'
import markupTranspiler from './index'

const markup = {
  table: `<table>
  <tbody>
    <tr><th>Fname</th><th>Lname</th></tr>
    <tr><td>Joe</td><td>Cool</td></tr>
  </tbody>
</table>`,
  callout: `<div class="callout-wrapper"><p>Hey it's a callout</p></div><div class="callout-wrapper"><p>And another callout</p></div>
<div class="wysiwyg-callout">This one is wysiwyg</div>`,
  quotation: `<blockquote class="quotation"><p>It was the best of times, it was the blurst of times.</p><footer><span>Chimp 273</span></footer></blockquote>`,
  document: `<div class="embedded-entity--media--file" data-last-updated="1704932250"><a class="file file--mime-application-zip" href="https://example.com/file.zip">File</a></div>`,
  video: `<figure class="embedded-entity--media--embedded-video"><iframe src="https://www.youtube.com/embed/1234" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe><figcaption>Caption goes here</figcaption</figure>`,
  image: `<div class="embedded-entity--media--image"><img src="https://example.com/image.jpg" alt="Image" title="Image" width="100" height="100"></div>`,
  button: `<a class="button" href="https://example.com">Button</a>`,
  link: `<a href="https://example.com" target="_blank">Link</a>`,
  list: `<ul type="disc"><li>List item</li></ul><ul type="circle"><li>List item</li></ul><ul type="square"><li>List item</li></ul><ol type="i"><li>List item</li></ol><ol type="I"><li>List item</li></ol><ol type="a"><li>List item</li></ol><ol type="A"><li>List item</li></ol>`,
  iframe: `<iframe src="https://powerbi.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>`
}

const fixed = {
  table: `<div class="rpl-table"><div class="rpl-table__scroll-container rpl-u-focusable-outline--visible" tabindex="0"><table>
  <tbody>
    <tr><th>Fname</th><th>Lname</th></tr>
    <tr><td>Joe</td><td>Cool</td></tr>
  </tbody>
</table></div></div>`,
  callout: `<div class="rpl-callout"><div class="rpl-callout__wrapper"><p>Hey it's a callout</p></div><div class="rpl-callout__wrapper"><p>And another callout</p></div></div>
<div class="rpl-callout rpl-callout--neutral">This one is wysiwyg</div>`,
  quotation: `
<figure class="rpl-blockquote">
  <blockquote class="rpl-blockquote__quote"><p class="rpl-type-p-large-fixed">It was the best of times, it was the blurst of times.</p></blockquote>
  <figcaption class="rpl-blockquote__author rpl-type-label-small"><span class="rpl-blockquote__author-name">Chimp 273</span></figcaption>
</figure>
`,
  document: `
<figure class="rpl-document">
  <a class="rpl-document__link rpl-u-focusable-within" aria-label="undefined" href="https://example.com/file.zip" target="_blank">
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
  video: `
<div class="rpl-media-embed">
  <figure class="rpl-media-embed__figure">
    <div class="rpl-media-embed__video-container">
      <div class="rpl-iframe"><iframe class="rpl-media-embed__video rpl-u-screen-only" src="https://www.youtube.com/embed/1234" title="" width="undefined" height="undefined" allow="autoplay; fullscreen; picture-in-picture;" allowfullscreen=""></iframe></div>
      <a href="https://www.youtube.com/embed/1234" class="rpl-text-link rpl-type-p rpl-u-print-only"></a>
    </div>
    <figcaption class="rpl-media-embed__figcaption">
      <p class="rpl-media-embed__caption rpl-type-p">Caption goes here</p>
    </figcaption>
  </figure>

</div>
`,
  image: `<figure><img src="https://example.com/image.jpg" class="rpl-img" width="100" alt="Image" srcset="https://example.com/image.jpg?width=720, https://example.com/image.jpg?width=1440 2x"></figure>`,
  button: `<a class="rpl-button rpl-button--default rpl-u-focusable-block rpl-button--filled" href="https://example.com"><span class="rpl-button__label rpl-type-label rpl-type-weight-bold">Button</span></a>`,
  link: `<a href="https://example.com" target="_blank" class="rpl-text-link rpl-u-focusable-inline">Link<span class="rpl-u-visually-hidden">(opens in a new window)</span></a>`,
  list: `<ul class="rpl-type-list-ul--disc"><li>List item</li></ul><ul class="rpl-type-list-ul--disc"><li>List item</li></ul><ul class="rpl-type-list-ul--square"><li>List item</li></ul><ol class="rpl-type-list-ol--lower-roman"><li>List item</li></ol><ol class="rpl-type-list-ol--upper-roman"><li>List item</li></ol><ol class="rpl-type-list-ol--lower-latin"><li>List item</li></ol><ol class="rpl-type-list-ol--upper-latin"><li>List item</li></ol>`,
  iframe: `<div class="rpl-iframe rpl-iframe--default rpl-iframe--auto"><iframe src="https://powerbi.com" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>`
}

describe('ripple-tide-api/utils/markup-transpiler/cheerio', () => {
  for (const [label, html] of Object.entries(markup)) {
    it(`runs ${label} plugin on markup`, () => {
      expect(markupTranspiler(html)).toEqual(fixed[label])
    })
  }
})
