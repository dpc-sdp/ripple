import { defineNitroPlugin } from 'nitropack/dist/runtime/plugin'
import type { NitroApp } from 'nitropack'
import tidePublicationPageModule from '../../mapping/publication-page'
import tidePublicationModule from '../../mapping/publication'

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  nitroApp.tide?.pageApi.setContentType('publication', tidePublicationModule)
  nitroApp.tide?.pageApi.setContentType(
    'publication_page',
    tidePublicationPageModule
  )

  // Adding support for landing page component includes
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--basic_text'
  ]?.contentTypes.push(...['publication', 'publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--accordion'
  ]?.contentTypes.push(...['publication', 'publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--timelines'
  ]?.contentTypes.push('publication_page')
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--card_keydates'
  ]?.contentTypes.push('publication_page')
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--media_gallery'
  ]?.contentTypes.push('publication_page')
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--card_carousel'
  ]?.contentTypes.push('publication_page')
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--statistics_grid'
  ]?.contentTypes.push(...['publication', 'publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--complex_image'
  ]?.contentTypes.push(...['publication', 'publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--embedded_webform'
  ]?.contentTypes.push(...['publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--promotion_card'
  ]?.contentTypes.push(...['publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--navigation_card'
  ]?.contentTypes.push(...['publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--call_to_action'
  ]?.contentTypes.push(...['publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--from_library'
  ]?.contentTypes.push(...['publication', 'publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--data_table'
  ]?.contentTypes.push(...['publication_page'])
  nitroApp.tide?.pageApi.dynamicComponents[
    'paragraph--data_driven_component'
  ]?.contentTypes.push(...['publication_page'])
})
