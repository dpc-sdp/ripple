import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  boolean
} from '@storybook/addon-knobs/vue'

import RplSearchForm from './SearchForm.vue'
import RplSearchResult from './SearchResult.vue'
import RplSearchResults from './SearchResults.vue'
import readme from './README.md'
import { demoData } from '../../../src/storybook-components/_data/demoData'

storiesOf('Molecules/Search', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Search Form', withReadme(readme, () => ({
    components: { RplSearchForm },
    template: `<rpl-search-form
  :title="title"
  :searchPlaceholder="searchPlaceholder"
  :prefillSearchTerm="prefillSearchTerm"
  :filterForm="filterForm"
  :theme="theme"
  :allowBlank="allowBlank"
  @search="searchEvent"
/>`,
    data () {
      return demoData.searchForm()
    },
    methods: {
      searchEvent (searchKeywords) {
        if (this.filterForm) {
          alert('Keywords: ' + searchKeywords + '\nFilters: ' + JSON.stringify(this.filterForm.model))
          const field = this.filterForm.schema.fields.filter(item => { return item.type === 'rplsubmitloader' })[0]
          field.loading = true
          setTimeout(() => {
            field.loading = false
          }, 3000)
        } else {
          alert('Keywords: ' + searchKeywords)
        }
      }
    }
  })))
  .add('Search Result', withReadme(readme, () => ({
    components: { RplSearchResult },
    template: `<rpl-search-result
  :title="title"
  :link="link"
  :date="date"
  :description="description"
  :tags="tags"
  :locale="locale"
/>`,
    data () {
      return demoData.searchResult()
    }
  })))
  .add('Search Results', withReadme(readme, () => ({
    components: { RplSearchResults },
    template: `<rpl-search-results
  :searchResults="searchResultsItems"
  :pager="pager"
  :responseSize="searchResults.responseSize"
  :count="searchResults.count"
  :errorMsg="hasError ? searchResults.errorMsg : undefined"
  :noResultsMsg="searchResults.noResultsMsg"
  :type="searchResults.type"
  @pager-change="pagerChange"
/>`,
    data () {
      return {
        searchResult: demoData.searchResult(),
        pager: demoData.pagination(),
        searchResults: demoData.searchResults(),
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
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
  }))).add('Card Search Results', withReadme(readme, () => ({
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
    data () {
      return {
        pager: demoData.pagination(),
        searchResults: demoData.eventSearchResults(),
        hasError: boolean('Has error', false),
        noResults: boolean('No results', false)
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
  })))
  .add('Grant Search Results', withReadme(readme, () => ({
    components: { RplSearchResults },
    template: `<rpl-search-results
    :searchResults="searchResultsItems"
    :pager="pager"
    :responseSize="searchResults.responseSize"
    :count="searchResults.count"
    :pagerChangeHandler="pagerChange"
    :errorMsg="hasError ? searchResults.errorMsg : undefined"
    :noResultsMsg="searchResults.noResultsMsg"
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
  })))
