import { expect, describe, it, vi } from 'vitest'
import mapping from './from-library-mapping'
import { useAppConfig } from '#imports'

const RAW = {
  links: {
    self: {
      href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraph/from_library/ebc72f3d-17d7-4251-8136-6883bb707472?resourceVersion=id%3A5890392'
    }
  },
  meta: {
    target_revision_id: 5890392,
    drupal_internal__target_id: 3341760
  },
  drupal_internal__id: 3341760,
  drupal_internal__revision_id: 5890392,
  langcode: 'en',
  status: true,
  created: '2024-09-03T03:48:15+00:00',
  parent_id: '41071',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_reusable_paragraph: {
    links: {
      self: {
        href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraphs_library_item/paragraphs_library_item/9600093a-cb86-497b-be21-a1f05878c7ab?resourceVersion=id%3A2'
      }
    },
    meta: {
      drupal_internal__target_id: 2
    },
    drupal_internal__id: 2,
    drupal_internal__revision_id: 2,
    langcode: 'en',
    revision_created: '2024-08-21T05:27:59+00:00',
    revision_log: null,
    status: true,
    label: 'BDM: Proof of ID - Acceptable documents (pp & dl)',
    created: '2024-08-21T05:26:09+00:00',
    changed: '2024-08-21T05:27:59+00:00',
    default_langcode: true,
    revision_translation_affected: true,
    metatag: [
      {
        tag: 'link',
        attributes: {
          rel: 'canonical',
          href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/node/landing_page/f4d4c76e-4fb9-4dea-a157-593f3ee9e1f3'
        }
      },
      {
        tag: 'meta',
        attributes: {
          property: 'og:locale',
          content: 'en-AU'
        }
      }
    ],
    paragraphs: {
      links: {
        self: {
          href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraph/basic_text/28ad7c12-709d-41a7-8b41-26e729687412?resourceVersion=id%3A5890329'
        }
      },
      meta: {
        target_revision_id: 5890329,
        drupal_internal__target_id: 3341733
      },
      drupal_internal__id: 3341733,
      drupal_internal__revision_id: 5890329,
      langcode: 'en',
      status: true,
      created: '2024-08-21T05:26:09+00:00',
      parent_id: '2',
      parent_type: 'paragraphs_library_item',
      parent_field_name: 'paragraphs',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_paragraph_body: {
        value:
          '<p>One of the easiest ways to prove your identity is by presenting&nbsp;<strong>your driver licence</strong> (if it confirms your residential address) and <strong>your Passport</strong>.</p><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Licence_0.jpg?itok=XjPuZSyZ" alt="Example driver licence"></div></div><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Passport_scaled2.jpg?itok=9xjIQZgf" alt="An Australian passport"></div></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>See the other <a href="https://www.bdm.vic.gov.au/about-us/proving-your-identity" title="Proving your identity" data-entity-type="node" data-entity-uuid="5f323645-146e-45a8-b078-f9733c8d5131" data-entity-substitution="canonical">ways to prove your identity</a>.</p>',
        format: 'rich_text',
        processed:
          '<p>One of the easiest ways to prove your identity is by presenting&nbsp;<strong>your driver licence</strong> (if it confirms your residential address) and <strong>your Passport</strong>.</p><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Licence_0.jpg?itok=XjPuZSyZ" alt="Example driver licence"></div></div><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Passport_scaled2.jpg?itok=9xjIQZgf" alt="An Australian passport"></div></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>See the other <a href="https://www.bdm.vic.gov.au/about-us/proving-your-identity" title="Proving your identity" data-entity-type="node" data-entity-uuid="5f323645-146e-45a8-b078-f9733c8d5131" data-entity-substitution="canonical">ways to prove your identity</a>.</p>'
      },
      id: '28ad7c12-709d-41a7-8b41-26e729687412',
      type: 'paragraph--basic_text'
    },
    id: '9600093a-cb86-497b-be21-a1f05878c7ab',
    type: 'paragraphs_library_item--paragraphs_library_item'
  },
  id: 'ebc72f3d-17d7-4251-8136-6883bb707472',
  type: 'paragraph--from_library'
}

const UNSUPPORTED = {
  links: {
    self: {
      href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraph/from_library/ebc72f3d-17d7-4251-8136-6883bb707472?resourceVersion=id%3A5890392'
    }
  },
  meta: {
    target_revision_id: 5890392,
    drupal_internal__target_id: 3341760
  },
  drupal_internal__id: 3341760,
  drupal_internal__revision_id: 5890392,
  langcode: 'en',
  status: true,
  created: '2024-09-03T03:48:15+00:00',
  parent_id: '41071',
  parent_type: 'node',
  parent_field_name: 'field_landing_page_component',
  behavior_settings: [],
  default_langcode: true,
  revision_translation_affected: null,
  field_reusable_paragraph: {
    links: {
      self: {
        href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraphs_library_item/paragraphs_library_item/9600093a-cb86-497b-be21-a1f05878c7ab?resourceVersion=id%3A2'
      }
    },
    meta: {
      drupal_internal__target_id: 2
    },
    drupal_internal__id: 2,
    drupal_internal__revision_id: 2,
    langcode: 'en',
    revision_created: '2024-08-21T05:27:59+00:00',
    revision_log: null,
    status: true,
    label: 'BDM: Proof of ID - Acceptable documents (pp & dl)',
    created: '2024-08-21T05:26:09+00:00',
    changed: '2024-08-21T05:27:59+00:00',
    default_langcode: true,
    revision_translation_affected: true,
    metatag: [
      {
        tag: 'link',
        attributes: {
          rel: 'canonical',
          href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/node/landing_page/f4d4c76e-4fb9-4dea-a157-593f3ee9e1f3'
        }
      },
      {
        tag: 'meta',
        attributes: {
          property: 'og:locale',
          content: 'en-AU'
        }
      }
    ],
    paragraphs: {
      links: {
        self: {
          href: 'https://nginx-php.pr-1691.content-vic.sdp4.sdp.vic.gov.au/api/v1/paragraph/basic_text/28ad7c12-709d-41a7-8b41-26e729687412?resourceVersion=id%3A5890329'
        }
      },
      meta: {
        target_revision_id: 5890329,
        drupal_internal__target_id: 3341733
      },
      drupal_internal__id: 3341733,
      drupal_internal__revision_id: 5890329,
      langcode: 'en',
      status: true,
      created: '2024-08-21T05:26:09+00:00',
      parent_id: '2',
      parent_type: 'xxparagraphs_library_item',
      parent_field_name: 'paragraphs',
      behavior_settings: [],
      default_langcode: true,
      revision_translation_affected: true,
      field_paragraph_body: {
        value:
          '<p>One of the easiest ways to prove your identity is by presenting&nbsp;<strong>your driver licence</strong> (if it confirms your residential address) and <strong>your Passport</strong>.</p><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Licence_0.jpg?itok=XjPuZSyZ" alt="Example driver licence"></div></div><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Passport_scaled2.jpg?itok=9xjIQZgf" alt="An Australian passport"></div></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>See the other <a href="https://www.bdm.vic.gov.au/about-us/proving-your-identity" title="Proving your identity" data-entity-type="node" data-entity-uuid="5f323645-146e-45a8-b078-f9733c8d5131" data-entity-substitution="canonical">ways to prove your identity</a>.</p>',
        format: 'rich_text',
        processed:
          '<p>One of the easiest ways to prove your identity is by presenting&nbsp;<strong>your driver licence</strong> (if it confirms your residential address) and <strong>your Passport</strong>.</p><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Licence_0.jpg?itok=XjPuZSyZ" alt="Example driver licence"></div></div><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Passport_scaled2.jpg?itok=9xjIQZgf" alt="An Australian passport"></div></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>See the other <a href="https://www.bdm.vic.gov.au/about-us/proving-your-identity" title="Proving your identity" data-entity-type="node" data-entity-uuid="5f323645-146e-45a8-b078-f9733c8d5131" data-entity-substitution="canonical">ways to prove your identity</a>.</p>'
      },
      id: '28ad7c12-709d-41a7-8b41-26e729687412',
      type: 'xxparagraph--basic_text'
    },
    id: '9600093a-cb86-497b-be21-a1f05878c7ab',
    type: 'xxparagraphs_library_item--paragraphs_library_item'
  },
  id: 'ebc72f3d-17d7-4251-8136-6883bb707472',
  type: 'xxparagraph--from_library'
}

const MAPPED = {
  component: 'TideLandingPageContent',
  id: '3341733',
  internalAnchors: [],
  props: {
    html: '<p>One of the easiest ways to prove your identity is by presenting&nbsp;<strong>your driver licence</strong> (if it confirms your residential address) and <strong>your Passport</strong>.</p><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Licence_0.jpg?itok=XjPuZSyZ" alt="Example driver licence"></div></div><div class="align-left djr-media-library"><div class="field field--name-field-media-image field--type-image field--label-hidden field--item"><img src="https://files.bdm.vic.gov.au/styles/thumbnail/s3/2021-06/BDM_Passport_scaled2.jpg?itok=9xjIQZgf" alt="An Australian passport"></div></div><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>See the other <a href="https://www.bdm.vic.gov.au/about-us/proving-your-identity" title="Proving your identity" data-entity-type="node" data-entity-uuid="5f323645-146e-45a8-b078-f9733c8d5131" data-entity-substitution="canonical" class="rpl-text-link rpl-u-focusable-inline">ways to prove your identity</a>.</p>'
  }
}

describe('From library component mapping', () => {
  vi.mock('#imports', () => ({
    useAppConfig: vi.fn()
  }))

  it('transforms a raw json api from_library paragraph to mapped component', async () => {
    useAppConfig.mockReturnValue({ ripple: { site: '123' } })
    expect(mapping.mapping(RAW, {}, {})).toEqual(MAPPED)
  })

  it('logs a console error when a paragraph type is not supported', async () => {
    const spy = vi.spyOn(console, 'error')
    mapping.mapping(UNSUPPORTED, {}, {})
    expect(spy).toHaveBeenCalled()
  })
})
