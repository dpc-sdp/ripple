
const tideConfig = {

  mapping: {
    // Mapping config for individual Tide fields.
    tideField: {
      'heroBanner': {
        component: 'my-hero-banner',
        props: {
          title: 'pageTitle',
          introText: 'introText',
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

module.exports = tideConfig
