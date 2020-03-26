import RplSearchResultsTable from './SearchResultsTable'
import { withKnobs, object } from '@storybook/addon-knobs/vue'

export default {
  title: 'Molecules/Search/SearchResultsTable',
  decorators: [withKnobs],
  includeStories: ['defaultStory', 'noColumnConfig', 'customComponent', 'legislationExample']
}

export const defaultStory = () => ({
  components: { RplSearchResultsTable },
  template:
    '<rpl-search-results-table :columnConfig="columnConfig" :items="items"></rpl-search-results-table>',
  props: {
    columnConfig: {
      default: () => {
        return object('Column config', [
          {
            label: 'Title',
            colspan: 2,
            key: 'title'
          },
          {
            label: 'Category',
            colspan: 1,
            key: 'category'
          },
          {
            label: 'Year',
            colspan: 1,
            key: 'year'
          }
        ])
      }
    },
    items: {
      default: () => {
        return object('Items', [
          {
            title: 'test',
            category: 'test',
            year: '1983-04-10'
          }
        ])
      }
    }
  }
})

export const noColumnConfig = () => ({
  components: { RplSearchResultsTable },
  template:
    '<rpl-search-results-table :items="items"></rpl-search-results-table>',
  props: {
    items: {
      default: () => {
        return object('Items', [
          {
            firstColumn: 'test',
            secondColumn: 'test',
            year: '1983-04-10'
          }
        ])
      }
    }
  }
})

export const customComponent = () => ({
  components: { RplSearchResultsTable },
  template:
    '<rpl-search-results-table :columnConfig="columnConfig" :items="items"></rpl-search-results-table>',
  props: {
    columnConfig: {
      default: () => {
        return [
          {
            label: 'Title',
            colspan: 2,
            component: () =>
              import(/* webpackChunkName: 'rpl-text-link' */ '@dpc-sdp/ripple-link').then(
                m => m.RplTextLink
              ),
            key: 'title'
          },
          {
            label: 'Category',
            component: () =>
              import(/* webpackChunkName: 'rpl-meta-tag' */ '@dpc-sdp/ripple-meta-tag'),
            colspan: 1,
            key: 'category'
          },
          {
            label: 'Year',
            colspan: 1,
            key: 'year'
          }
        ]
      }
    },
    items: {
      default: () => {
        return object('Items', [
          {
            title: {
              text: 'test',
              url: 'www.google.com'
            },
            category: {
              linkText: 'test'
            },
            year: '1983-04-10'
          }
        ])
      }
    }
  }
})

export const legislationExample = () => ({
  components: { RplSearchResultsTable },
  template:
    '<rpl-search-results-table :columnConfig="columnConfig" :items="items"></rpl-search-results-table>',
  props: {
    columnConfig: {
      default: () => {
        return [
          {
            label: 'Title',
            colspan: 2,
            component: () =>
              import(/* webpackChunkName: 'rpl-text-link' */ '@dpc-sdp/ripple-link').then(
                m => m.RplTextLink
              ),
            key: 'title'
          },
          {
            label: 'Number',
            colspan: 1,
            key: 'number'
          },
          {
            label: 'Year',
            colspan: 1,
            key: 'year'
          }
        ]
      }
    },
    items: {
      default: () => {
        return object('Items', legislationData)
      }
    }
  }
})

export const legislationData = [
  {
    title: {
      text: 'Transport (Compliance and Miscellaneous) Act 1983',
      url: 'www.google.com'
    },
    number: 533,
    year: '2018'
  },
  {
    title: {
      text: 'Crimes Act 1958',
      url: 'www.google.com'
    },
    number: 203,
    year: '2006'
  },
  {
    title: {
      text: 'Disability Act 2006',
      url: 'www.google.com'
    },
    number: 29,
    year: '2008'
  },
  {
    title: {
      text: 'Neque porro quisquam est Act 1975',
      url: 'www.google.com'
    },
    number: 719,
    year: '1975'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 783,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 247,
    year: '2001'
  },
  {
    title: {
      text: 'Neque porro quisquam est Act 1975',
      url: 'www.google.com'
    },
    number: 52,
    year: '1975'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 940,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 63,
    year: '2001'
  },
  {
    title: {
      text: 'Neque porro quisquam est Act 1975',
      url: 'www.google.com'
    },
    number: 803,
    year: '1975'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 669,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 132,
    year: '2001'
  },
  {
    title: {
      text: 'Neque porro quisquam est Act 1975',
      url: 'www.google.com'
    },
    number: 307,
    year: '1975'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 429,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 299,
    year: '2001'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 200,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 17,
    year: '2001'
  },
  {
    title: {
      text: 'Neque porro quisquam est Act 1975',
      url: 'www.google.com'
    },
    number: 109,
    year: '1975'
  },
  {
    title: {
      text: 'Ut enim ad minim veniam quis nostrud Act 1987',
      url: 'www.google.com'
    },
    number: 464,
    year: '1987'
  },
  {
    title: {
      text: 'Lorem ipsum dolor sit amet Act 2001',
      url: 'www.google.com'
    },
    number: 785,
    year: '2001'
  }
]
