// You can add site specific custom config for tide.

const tideConfig = {
  // middleware: true,
  // mappingFilters: true,
  // pageTypes: true,
  // loadComponents: true,
  // markupPlugins: true,

  // Include config is used for Tide API query relationship.
  include: {
    // Add custom content type config here.
    // Please convert Tide content type name to camelcase.
    // e.g 'landing-page' => 'landingPage'
    // Find an example in `modules/nuxt-tide-landing-page/lib/config`.
  },

  mapping: {
    // landingPageComponents: {}
  }
}

module.exports = tideConfig
