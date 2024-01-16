import { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { expect, describe, it } from '@jest/globals'
import { basicTextMapping, ITideBasicText } from './basic-text-mapping'

const rawData = {
  links: {
    self: {
      href: 'https://develop.content.reference.sdp.vic.gov.au/api/v1/paragraph/basic_text/ae1ffcca-fd04-4733-ae35-85a65d6d6452'
    }
  },
  meta: { target_revision_id: 7411 },
  drupal_internal__id: 4768,
  drupal_internal__revision_id: 7411,
  langcode: 'en',
  status: true,
  created: '2022-10-25T05:43:39+00:00',
  parent_id: '2245',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_paragraph_body: {
    value:
      '<h2>Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae</h2>\n<h3>Phasellus congue aliquam vehicula</h3>\n<p class="wysiwyg-callout">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. Quisque nec congue ligula, vitae condimentum tellus. Nulla nec urna augue. Curabitur commodo nisi est, eu pulvinar tortor cursus vel. Morbi dictum ex est, et semper diam finibus eu. Cras rutrum, nunc a fringilla convallis, massa est vulputate velit, in blandit augue dui vitae elit. Donec hendrerit commodo augue, in maximus orci tempor congue. Mauris ultricies euismod orci, nec vehicula quam vehicula ac. Nunc dictum tortor dolor, nec eleifend orci luctus sed.</p>\n<h3>Donec scelerisque cursus ex varius efficitur</h3>\n<p class="callout-wrapper">Lorem ipsum dolor sit amet</p>\n<h4>Morbi cursus placerat mi</h4>\n<h5>Nullam laoreet ante placerat</h5>\n<p>Integer interdum nisl ut neque dictum, et sagittis metus feugiat. Sed in mattis neque. Duis at risus non ipsum semper dapibus. Sed enim sapien, molestie sed commodo vel, lacinia vitae risus. Proin sagittis diam nisi, sed rhoncus diam varius id. Sed malesuada felis tortor, scelerisque pretium elit tempor non. Pellentesque ultrices volutpat tincidunt. Fusce quis viverra urna, quis finibus nulla.</p>\n<blockquote class=\'quotation\'>\n  <p>Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. Phasellus lacus lectus, sollicitudin sed posuere non, ultricies ut quam.</p>\n  <footer>\n    <cite>\n      <span class="quotation__author">Duis ligula lacus</span><br />\n      <span class="quotation__author-title">Phasellus est turpis, efficitur nec odio imperdiet</span><br />\n    </cite>\n  </footer>\n</blockquote>\n<h6>Mauris tincidunt tincidunt felis vel tempus</h6>\n<drupal-entity data-embed-button="tide_media" data-entity-embed-display="view_mode:media.embedded" data-entity-type="media" data-entity-uuid=\'11dede11-10c0-111e1-1100-000000000124\'></drupal-entity>\n<p>Phasellus in varius leo. Suspendisse potenti. Donec scelerisque cursus ex varius efficitur. Vivamus pretium nisi sed libero accumsan mattis. Duis convallis, velit eget varius tempus, orci erat aliquam sem, eget porta mauris nisl at mauris.</p>\n<drupal-entity data-embed-button="tide_media" data-entity-embed-display="view_mode:media.embedded" data-entity-type="media" data-entity-uuid=\'11dede11-10c0-111e1-1100-000000000007\'></drupal-entity>\n',
    format: 'rich_text',
    processed:
      '<h2>Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae</h2>\n<h3>Phasellus congue aliquam vehicula</h3>\n<p class="wysiwyg-callout">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. Quisque nec congue ligula, vitae condimentum tellus. Nulla nec urna augue. Curabitur commodo nisi est, eu pulvinar tortor cursus vel. Morbi dictum ex est, et semper diam finibus eu. Cras rutrum, nunc a fringilla convallis, massa est vulputate velit, in blandit augue dui vitae elit. Donec hendrerit commodo augue, in maximus orci tempor congue. Mauris ultricies euismod orci, nec vehicula quam vehicula ac. Nunc dictum tortor dolor, nec eleifend orci luctus sed.</p>\n<h3>Donec scelerisque cursus ex varius efficitur</h3>\n<p class="callout-wrapper">Lorem ipsum dolor sit amet</p>\n<h4>Morbi cursus placerat mi</h4>\n<h5>Nullam laoreet ante placerat</h5>\n<p>Integer interdum nisl ut neque dictum, et sagittis metus feugiat. Sed in mattis neque. Duis at risus non ipsum semper dapibus. Sed enim sapien, molestie sed commodo vel, lacinia vitae risus. Proin sagittis diam nisi, sed rhoncus diam varius id. Sed malesuada felis tortor, scelerisque pretium elit tempor non. Pellentesque ultrices volutpat tincidunt. Fusce quis viverra urna, quis finibus nulla.</p>\n<blockquote class="quotation">\n  <p>Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. Phasellus lacus lectus, sollicitudin sed posuere non, ultricies ut quam.</p>\n  <footer><cite>\n      <span class="quotation__author">Duis ligula lacus</span><br /><span class="quotation__author-title">Phasellus est turpis, efficitur nec odio imperdiet</span><br /></cite>\n  </footer></blockquote>\nMauris tincidunt tincidunt felis vel tempus\n<div data-embed-button="tide_media" data-entity-embed-display="view_mode:media.embedded" data-entity-type="media" data-entity-uuid="11dede11-10c0-111e1-1100-000000000124" data-langcode="en" data-entity-embed-display-settings="[]" class="embedded-entity embedded-entity--media embedded-entity--media--image"><article class="media media--type-image media--view-mode-embedded"><div class="field field--name-field-media-image field--type-image field--label-hidden field__item">  <img src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg" width="900" height="700" alt="Demo: Melbourne tram" title="Demo: Melbourne tram" loading="lazy" /></div>\n      \n  </article></div>\n<p>Phasellus in varius leo. Suspendisse potenti. Donec scelerisque cursus ex varius efficitur. Vivamus pretium nisi sed libero accumsan mattis. Duis convallis, velit eget varius tempus, orci erat aliquam sem, eget porta mauris nisl at mauris.</p>\n<div data-embed-button="tide_media" data-entity-embed-display="view_mode:media.embedded" data-entity-type="media" data-entity-uuid="11dede11-10c0-111e1-1100-000000000007" data-langcode="en" data-entity-embed-display-settings="[]" class="embedded-entity embedded-entity--media embedded-entity--media--document"><article class="media media--type-document media--view-mode-embedded"><div class="field field--name-field-media-file field--type-file field--label-hidden field__item">\n<span class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"><a href="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/sample.docx" class="x-office-document" aria-label="Demo Sample Document File type: Word. Size: 7.53 KB."><span class="file--title">Demo Sample Document</span><span class="file--type">Word</span><span class="file--size">7.53 KB</span></a> <span class="file__size">(7.53 KB)</span></span>\n</div>\n      \n  </article></div>\n'
  },
  id: 'ae1ffcca-fd04-4733-ae35-85a65d6d6452',
  type: 'paragraph--basic_text'
}

const result: TideDynamicPageComponent<ITideBasicText> = {
  component: 'TideLandingPageContent',
  id: '4768',
  internalAnchors: [
    {
      text: 'Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae',
      id: 'nulla-ultricies-dignissim-leo-posuere-vestibulum-erat-cursus-vitae',
      type: 'h2'
    },
    {
      text: 'Phasellus congue aliquam vehicula',
      id: 'phasellus-congue-aliquam-vehicula',
      type: 'h3'
    },
    {
      text: 'Donec scelerisque cursus ex varius efficitur',
      id: 'donec-scelerisque-cursus-ex-varius-efficitur',
      type: 'h3'
    }
  ],
  props: {
    html: '<h2 id="nulla-ultricies-dignissim-leo-posuere-vestibulum-erat-cursus-vitae">Nulla ultricies dignissim leo, posuere vestibulum erat cursus vitae</h2>\n<h3 id="phasellus-congue-aliquam-vehicula">Phasellus congue aliquam vehicula</h3>\n<p class="rpl-callout rpl-callout--neutral">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus. Quisque nec congue ligula, vitae condimentum tellus. Nulla nec urna augue. Curabitur commodo nisi est, eu pulvinar tortor cursus vel. Morbi dictum ex est, et semper diam finibus eu. Cras rutrum, nunc a fringilla convallis, massa est vulputate velit, in blandit augue dui vitae elit. Donec hendrerit commodo augue, in maximus orci tempor congue. Mauris ultricies euismod orci, nec vehicula quam vehicula ac. Nunc dictum tortor dolor, nec eleifend orci luctus sed.</p>\n<h3 id="donec-scelerisque-cursus-ex-varius-efficitur">Donec scelerisque cursus ex varius efficitur</h3>\n<div class="rpl-callout"><p class="callout-wrapper">Lorem ipsum dolor sit amet</p></div>\n<h4>Morbi cursus placerat mi</h4>\n<h5>Nullam laoreet ante placerat</h5>\n<p>Integer interdum nisl ut neque dictum, et sagittis metus feugiat. Sed in mattis neque. Duis at risus non ipsum semper dapibus. Sed enim sapien, molestie sed commodo vel, lacinia vitae risus. Proin sagittis diam nisi, sed rhoncus diam varius id. Sed malesuada felis tortor, scelerisque pretium elit tempor non. Pellentesque ultrices volutpat tincidunt. Fusce quis viverra urna, quis finibus nulla.</p>\n\n<figure class="rpl-blockquote">\n  <blockquote class="rpl-blockquote__quote">\n  <p class="rpl-type-p-large-fixed">Mauris tincidunt tincidunt felis vel tempus. Vestibulum rhoncus blandit justo quis finibus. Phasellus lacus lectus, sollicitudin sed posuere non, ultricies ut quam.</p>\n  </blockquote>\n  <figcaption class="rpl-blockquote__author rpl-type-label-small"><span class="rpl-blockquote__author-name">Duis ligula lacus</span><span class="rpl-blockquote__author-name">Phasellus est turpis, efficitur nec odio imperdiet</span></figcaption>\n</figure>\n\nMauris tincidunt tincidunt felis vel tempus\n<img src="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg" class="rpl-img" width="900" alt="Demo: Melbourne tram" srcset="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg?width=720, https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg?width=1440 2x">\n<p>Phasellus in varius leo. Suspendisse potenti. Donec scelerisque cursus ex varius efficitur. Vivamus pretium nisi sed libero accumsan mattis. Duis convallis, velit eget varius tempus, orci erat aliquam sem, eget porta mauris nisl at mauris.</p>\n\n<figure class="rpl-document">\n  <a class="rpl-document__link rpl-u-focusable-within" aria-label="Demo Sample Document File type: Word. Size: 7.53 KB." href="https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/sample.docx" target="_blank">\n    <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">\n      <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>\n    </span>\n    <div class="rpl-document__content">\n      <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline">Demo Sample Document</span>\n      <div class="rpl-document__info rpl-type-label-small">\n        <span class="rpl-file__meta">Word</span>\n        <span class="rpl-file__meta">7.53 KB</span>\n      </div>\n    </div>\n    <span class="rpl-u-visually-hidden">(opens in a new window)</span>\n  </a>\n</figure>\n\n'
  }
}

describe('basicTextMapping', () => {
  it('maps a raw json api response to the correct structure', () => {
    expect(basicTextMapping(rawData)).toEqual(result)
  })
})
