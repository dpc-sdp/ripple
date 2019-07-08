import { storiesOf } from '@storybook/vue'
import RplSearchForm from './SearchForm.vue'
import RplSearchResult from './SearchResult.vue'
import RplSearchResults from './SearchResults.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  select,
  number,
  boolean,
  object
} from '@storybook/addon-knobs/vue'

const demoData = {
  honourRollSearchResultItems: () => [
    {
      name: 'Stella Young',
      inductionYear: '2017',
      category: 'Local Champion',
      lifespan: '1982 - 2014',
      summary: 'Journalist, comedian, feminist and fierce disability activist.',
      link: { text: "Read Stella's profile", url: '#' },
      image: 'https://placehold.it/148x148'
    },
    {
      name: 'Stella Young',
      inductionYear: '2017',
      category: 'Local Champion',
      lifespan: '1982 - 2014',
      summary: 'Journalist, comedian, feminist and fierce disability activist.',
      link: { text: "Read Stella's profile", url: '#' },
      image: 'https://placehold.it/148x148'
    },
    {
      name: 'Stella Young',
      inductionYear: '2017',
      category: 'Local Champion',
      lifespan: '1982 - 2014',
      summary: 'Journalist, comedian, feminist and fierce disability activist.',
      link: { text: "Read Stella's profile", url: '#' },
      image: 'https://placehold.it/148x148'
    },
    {
      name: 'Stella Young',
      inductionYear: '2017',
      category: 'Local Champion',
      lifespan: '1982 - 2014',
      summary: 'Journalist, comedian, feminist and fierce disability activist.',
      link: { text: "Read Stella's profile", url: '#' },
      image: 'https://placehold.it/148x148'
    }
  ],

  pagination: () => ({
    totalSteps: number('Total steps', 8),
    initialStep: number('Initial step', 1),
    stepsAround: number('Step count around current', 2)
  }),

  newsSearchResultItems: () => (
    [
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      }
    ]
  ),

  eventSearchResultItems: () => [
    {
      image: 'https://placehold.it/580x340',
      date: '2018-07-10T09:00:00.000+10:00',
      title:
        'This is the headline of an event with a location that will stretch over over 3 lines',
      summary:
        'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
      link: { text: 'See event details', url: '#' }
    },
    {
      image: 'https://placehold.it/580x340',
      date: '2018-07-10T09:00:00.000+10:00',
      title:
        'This is the headline of an event with a location that will stretch over over 3 lines',
      summary:
        'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
      link: { text: 'See event details', url: '#' }
    },
    {
      image: '',
      date: '2018-07-10T09:00:00.000+10:00',
      title: 'This event has no image.',
      summary:
        'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
      link: { text: 'See event details', url: '#' }
    },
    {
      image: 'https://placehold.it/580x340',
      date: '2018-07-10T09:00:00.000+10:00',
      title:
        'This is the headline of an event with a location that will stretch over over 3 lines',
      summary:
        'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
      link: { text: 'See event details', url: '#' }
    }
  ],

  grantSearchResultItems: () => [
    {
      title: text('Title', 'Program Overview'),
      funding: object('Funding', {
        from: 10000,
        to: 30000
      }),
      link: object('Link', { text: 'Read more', url: '#' }),
      audience: text('Audience', 'individuals, organisations, local council'),
      startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
      enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
      description: text(
        'Description',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'
      ),
      tags: object('Tags', [
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        },
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }
      ])
    },
    {
      title: text('Title', 'Program Overview'),
      funding: object('Funding', {
        from: 10000,
        to: 30000
      }),
      link: object('Link', { text: 'Read more', url: '#' }),
      audience: text('Audience', 'individuals, organisations, local council'),
      startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
      enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
      description: text(
        'Description',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'
      ),
      tags: object('Tags', [
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        },
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }
      ])
    },
    {
      title: text('Title', 'Program Overview'),
      funding: object('Funding', {
        from: 10000,
        to: 30000
      }),
      link: object('Link', { text: 'Read more', url: '#' }),
      audience: text('Audience', 'individuals, organisations, local council'),
      startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
      enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
      description: text(
        'Description',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'
      ),
      tags: object('Tags', [
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        },
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }
      ])
    },
    {
      title: text('Title', 'Program Overview'),
      funding: object('Funding', {
        from: 10000,
        to: 30000
      }),
      link: object('Link', { text: 'Read more', url: '#' }),
      audience: text('Audience', 'individuals, organisations, local council'),
      startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
      enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
      description: text(
        'Description',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'
      ),
      tags: object('Tags', [
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        },
        {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }
      ])
    }
  ],

  searchResults: () => ({
    count: number('Count', 70),
    type: 'default',
    responseSize: number('Response size', 10),
    errorMsg: text(
      'Error message',
      "Search isn't working right now, please try again later."
    ),
    noResultsMsg: text(
      'No results message',
      "Sorry! We couldn't find any matches for bananas"
    )
  }),

  cardSearchResults: () => ({
    count: number('Count', 10),
    type: select(
      'Type',
      {
        RplCardEvent: 'RplCardEvent',
        RplCardPromotion: 'RplCardPromotion',
        RplCardHonourRoll: 'RplCardHonourRoll'
      },
      'RplCardEvent'
    ),
    responseSize: number('Response size', 4),
    errorMsg: text(
      'Error message',
      "Search isn't working right now, please try again later."
    ),
    noResultsMsg: text(
      'No results message',
      "Sorry! We couldn't find any matches for bananas"
    )
  }),

  grantSearchResults: () => ({
    count: number('Count', 10),
    type: 'RplGrantListItem',
    responseSize: number('Response size', 4),
    errorMsg: text(
      'Error message',
      "Search isn't working right now, please try again later."
    ),
    noResultsMsg: text(
      'No results message',
      "Sorry! We couldn't find any matches for bananas"
    )
  })
}

storiesOf('Molecules/Search', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Search Form', () => ({
    components: { RplSearchForm },
    template: `
      <rpl-search-form
        :title="title"
        :subtitle="subtitle"
        :searchPlaceholder="searchPlaceholder"
        :prefillSearchTerm="prefillSearchTerm"
        :searchInputLabel="searchInputLabel"
        :buttonLabel="buttonLabel"
        :buttonHiddenLabel="buttonHiddenLabel"
        :autoFocus="autoFocus"
        :textSearch="textSearch"
        :expandFilters="expandFilters"
        :filterForm="filterForm"
        :filterText="filterText"
        :theme="theme"
        :type="type"
        :allowBlank="allowBlank"
        @search="searchEvent"
      />
    `,
    data () {
      return {
        title: text('Title', 'Search results'),
        subtitle: text('Subtitle', ''),
        searchPlaceholder: text('Search Placeholder', 'Enter keywords'),
        prefillSearchTerm: text('Prefilled Search Term', 'Bananas'),
        searchInputLabel: text('Search Input Label', 'Search for'),
        buttonLabel: text('Button Label', 'Search'),
        buttonHiddenLabel: boolean('Button Hidden Label', true),
        autoFocus: boolean('Auto Focus', false),
        textSearch: boolean('Text Search', true),
        expandFilters: boolean('Expand Filters', false),
        filterForm: object('Filter Form', {
          tideId: 'tide_search_form',
          model: {
            topic: []
          },
          schema: {
            fields: [
              {
                type: 'rplchecklist',
                label: 'Select a topic',
                model: 'topic',
                values: ['Topic A', 'Topic B', 'Topic C', 'Topic D'],
                placeholder: 'Select a topic'
              },
              {
                type: 'rplsubmitloader',
                buttonText: 'Apply change',
                loading: false
              }
            ]
          },
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true
          },
          formState: {}
        }),
        filterText: text('Filter Text', 'Refine search'),
        theme: select('Theme', { light: 'light', dark: 'dark' }, 'light'),
        type: select(
          'Type',
          { 'two-cols': 'two-cols', default: 'default' },
          'default'
        ),
        allowBlank: boolean('Allow Blank', false)
      }
    },
    methods: {
      searchEvent (searchKeywords) {
        if (this.filterForm) {
          alert(
            'Keywords: ' +
              searchKeywords +
              '\nFilters: ' +
              JSON.stringify(this.filterForm.model)
          )
          const field = this.filterForm.schema.fields.filter(item => {
            return item.type === 'rplsubmitloader'
          })[0]
          field.loading = true
          setTimeout(() => {
            field.loading = false
          }, 3000)
        } else {
          alert('Keywords: ' + searchKeywords)
        }
      }
    }
  }))
  .add('Search Result', () => ({
    components: { RplSearchResult },
    template: `
    <rpl-search-result
      :title="title"
      :link="link"
      :date="date"
      :description="description"
      :tags="tags"
      :locale="locale"
    />
  `,
    props: {
      title: {
        default: text('Title', 'Schools private policy')
      },
      link: {
        default: () => object('Link', {
          linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
          linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
        })
      },
      date: {
        default: text('Date', '2018-07-10T09:00:00.000+10:00')
      },
      description: text(
        'Description',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem'
      ),
      tags: {
        default: () => object('Tags', [
          {
            linkText: 'This is a content tag',
            linkUrl: '#'
          },
          {
            linkText: 'This is a content tag',
            linkUrl: '#'
          }
        ])
      },
      locale: {
        default: text('Locale', 'en-au')
      }
    }
  }))
  .add('Search Results', () => ({
    components: { RplSearchResults },
    template: `
      <rpl-search-results
        :searchResults="searchResultsItems"
        :pager="pager"
        :responseSize="searchResults.responseSize"
        :count="searchResults.count"
        :errorMsg="hasError ? searchResults.errorMsg : undefined"
        :noResultsMsg="searchResults.noResultsMsg"
        :type="searchResults.type"
        @pager-change="pagerChange"
      />`,
    props: {
      searchResult: {
        default: () => ({
          title: text('Title', 'Schools private policy'),
          link: object('Link', {
            linkText:
              'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
            linkUrl:
              '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
          }),
          date: text('Date', '2018-07-10T09:00:00.000+10:00'),
          description: text(
            'Description',
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem'
          ),
          tags: object('Tags', [
            {
              linkText: 'This is a content tag',
              linkUrl: '#'
            },
            {
              linkText: 'This is a content tag',
              linkUrl: '#'
            }
          ]),
          locale: text('Locale', 'en-au')
        })
      },
      pager: {
        default: () => demoData.pagination()
      },
      searchResults: {
        default: () => ({
          count: number('Count', 70),
          type: 'default',
          responseSize: number('Response size', 10),
          errorMsg: text(
            'Error message',
            "Search isn't working right now, please try again later."
          ),
          noResultsMsg: text(
            'No results message',
            "Sorry! We couldn't find any matches for bananas"
          )
        })
      },
      hasError: {
        default: boolean('Has error', false)
      },
      noResults: {
        default: boolean('No results', false)
      }
    },
    computed: {
      searchResultsItems: function () {
        if (this.hasError || this.noResults) {
          return []
        } else {
          return [this.searchResult, this.searchResult]
        }
      }
    },
    methods: {
      pagerChange: function (newStep) {
        // Use your own custom code to handle it.
        alert('Going to step: ' + newStep)
      }
    }
  }))
  .add('Card Search Results', () => ({
    components: { RplSearchResults },
    template: `<rpl-search-results
    :searchResults="searchResultsItems"
    :pager="pager"
    :responseSize="searchResults.responseSize"
    :count="searchResults.count"
    :pagerChangeHandler="pagerChange"
    :errorMsg="hasError ? searchResults.errorMsg : undefined"
    :noResultsMsg="searchResults.noResultsMsg"
    :type="searchResults.type"
    @pager-change="pagerChange"
  />`,
    props: {
      pager: {
        default: demoData.pagination
      },
      searchResults: {
        default: () => ({
          count: number('Count', 10),
          type: select(
            'Type',
            {
              RplCardEvent: 'RplCardEvent',
              RplCardPromotion: 'RplCardPromotion',
              RplCardHonourRoll: 'RplCardHonourRoll'
            },
            'RplCardEvent'
          ),
          responseSize: number('Response size', 4),
          errorMsg: text(
            'Error message',
            "Search isn't working right now, please try again later."
          ),
          noResultsMsg: text(
            'No results message',
            "Sorry! We couldn't find any matches for bananas"
          )
        })
      },
      hasError: {
        default: boolean('Has error', false)
      },
      noResults: {
        default: boolean('No results', false)
      }
    },
    computed: {
      searchResultsItems: function () {
        if (this.hasError || this.noResults) {
          return []
        } else {
          switch (this.searchResults.type) {
            case 'RplCardPromotion':
              return demoData.newsSearchResultItems()

            case 'RplCardHonourRoll':
              return demoData.honourRollSearchResultItems()

            case 'RplCardEvent':
            default:
              return demoData.eventSearchResultItems()
          }
        }
      }
    },
    methods: {
      pagerChange: function (newStep) {
        // Use your own custom code to handle it.
        alert('Going to step: ' + newStep)
      }
    }
  }))
  .add('Grant Search Results', () => ({
    components: { RplSearchResults },
    template: `<rpl-search-results
    :searchResults="searchResultsItems"
    :pager="pager"
    :responseSize="4"
    :count="3"
    :pagerChangeHandler="pagerChange"
    :errorMsg="hasError ? searchResults.errorMsg : undefined"
    noResultsMsg="No results found"
    type="RplGrantsListItem"
    @pager-change="pagerChange"
  />`,
    data () {
      return {
        pager: demoData.pagination(),
        searchResults: demoData.grantSearchResults(),
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
      }
    },
    computed: {
      searchResultsItems: function () {
        if (this.hasError || this.noResults) {
          return []
        } else {
          return demoData.grantSearchResultItems()
        }
      }
    },
    methods: {
      pagerChange: function (newStep) {
        // Use your own custom code to handle it.
        alert('Going to step: ' + newStep)
      }
    }
  }))
