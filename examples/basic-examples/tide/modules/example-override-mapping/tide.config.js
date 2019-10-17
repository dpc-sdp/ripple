// Grid columns setting for cards.

module.exports = {

  mapping: {
    tideField: {

      // A example for overriding default `heroBanner` mapping in https://github.com/dpc-sdp/ripple/blob/v1.2.1/packages/ripple-nuxt-tide/lib/config/tide.config.js#L33
      // You can do:
      // - Map to your own component.
      // - Use your own filters to process the Tide field data.
      'heroBanner': {
        component: 'rpl-hero-banner',
        props: {
          title: {
            field: 'pageTitle',
            // Demo of a custom filter here.
            filters: ['eomPageTitle']
          },
          introText: {
            field: 'introText',
            // Demo of another custom filter here.
            filters: ['eomIntroText']
          },
          linkHeading: ['keyJourneys', 'field_paragraph_title'],
          links: {
            field: ['keyJourneys', 'field_paragraph_links'],
            filters: ['paragraphKeyJourneyLinks']
          },
          moreLink: {
            field: ['keyJourneys', 'field_paragraph_cta'],
            filters: ['paragraphCta']
          },
          theme: 'theme',
          showLinks: 'showLinks',
          logo: 'logo',
          backgroundGraphic: 'backgroundGraphic'
        }
      }
    }
  }
}
