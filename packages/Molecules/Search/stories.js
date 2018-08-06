import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs
} from '@storybook/addon-knobs/vue'

import RplSearchForm from './SearchForm.vue'
import RplSearchResult from './SearchResult.vue'
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
