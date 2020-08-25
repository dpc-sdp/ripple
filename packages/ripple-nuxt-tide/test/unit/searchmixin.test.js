import searchMixin from '../../modules/search/lib/searchmixin'

describe('searchMixin', () => {
  it('tests overridding of mapSearchResults and return filtered results correctly', async () => {
    // Overridde method
    searchMixin.methods.mapSearchResults = function (source) {
      const site = 4
      const domains = {
        4: 'www.vic.gov.au'
      }
      let date = source.changed ? source.changed[0] : source.created[0]
      return {
        title: source.title ? source.title[0] : '',
        link: this.getLink(source.url, site, source.field_node_primary_site, domains, { text: 'linkText', url: 'linkUrl' }),
        date: date || '',
        description: typeof source.field_landing_page_summary !== 'undefined' ? source.field_landing_page_summary[0] : '',
        tags: []
      }
    }

    const mockSource = {
      changed: ['2020-05-01T11:29:12+10:00'],
      created: ['2020-02-21T15:23:25+11:00'],
      field_landing_page_summary: ['These plans are designed for when you want to begin developing a solution.'],
      field_topic_name: ['Education'],
      id: 'entity:node/10078:en',
      title: ['Prototype, test and iterate the design of a product, service or policy'],
      type: ['landing_page'],
      url: ['/site-4/prototype-test-and-iterate-design-product-service-or-policy']
    }

    expect(searchMixin.methods.mapSearchResults(mockSource)).toEqual({
      title: 'Prototype, test and iterate the design of a product, service or policy',
      link: { linkText: 'www.vic.gov.au/prototype-test-and-iterate-design-product-service-or-policy', linkUrl: '/prototype-test-and-iterate-design-product-service-or-policy' },
      date: '2020-05-01T11:29:12+10:00',
      description: 'These plans are designed for when you want to begin developing a solution.',
      tags: []
    })
  })

  it('tests overridding of mapSearchResults and should not throw an error when some object property doesn\'t have value', async () => {
    // Overridde method
    searchMixin.methods.mapSearchResults = function (source) {
      const site = 4
      const domains = {
        4: 'www.vic.gov.au'
      }
      let date = source.changed ? source.changed[0] : source.created[0]
      return {
        title: source.title ? source.title[0] : '',
        link: this.getLink(source.url, site, source.field_node_primary_site, domains, { text: 'linkText', url: 'linkUrl' }),
        date: date || '',
        description: typeof source.field_landing_page_summary !== 'undefined' ? source.field_landing_page_summary[0] : '',
        tags: []
      }
    }

    const mockSource = {
      changed: ['2020-05-01T11:29:12+10:00'],
      created: ['2020-02-21T15:23:25+11:00'],
      field_topic_name: ['Education'],
      id: 'entity:node/10078:en',
      title: '',
      type: ['landing_page'],
      url: ['/site-4/prototype-test-and-iterate-design-product-service-or-policy']
    }

    expect(searchMixin.methods.mapSearchResults(mockSource)).toEqual({
      title: '',
      link: { linkText: 'www.vic.gov.au/prototype-test-and-iterate-design-product-service-or-policy', linkUrl: '/prototype-test-and-iterate-design-product-service-or-policy' },
      date: '2020-05-01T11:29:12+10:00',
      description: '',
      tags: []
    })
  })
})
