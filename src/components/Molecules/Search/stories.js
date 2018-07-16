import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object,
  select
} from '@storybook/addon-knobs/vue'

import RplSearchForm from './SearchForm.vue'
import RplSearchResult from './SearchResult.vue'
import readme from './README.md'

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
      return {
        title: text('Title', 'Search results'),
        searchPlaceholder: text('Search Placeholder', 'Enter keywords'),
        prefillSearchTerm: text('Prefilled Search Term', 'Bananas'),
        filterForm: object('Filter Form', {
          tideId: 'tide_search_form',
          model: {
            topic: ''
          },
          schema: {
            fields: [{
              type: 'rplchecklist',
              label: 'Select a topic',
              model: 'topic',
              values: [
                'Topic A',
                'Topic B',
                'Topic C',
                'Topic D'
              ],
              placeholder: 'Select a topic'
            }, {
              type: 'rplsubmitloader',
              buttonText: 'Apply change',
              loading: false
            }]
          },
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true
          },
          formState: {}
        }),
        theme: select('Theme', {light: 'light', dark: 'dark'}, 'light')
      }
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
      return {
        title: text('Title', 'Schools private policy'),
        link: text('Link', 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'),
        date: text('Date', '2018-07-10T09:00:00.000+10:00'),
        description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem'),
        tags: object('Tags', [{
          linkText: 'This is a content tag',
          linkUrl: '#'
        }, {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }]),
        locale: text('Locale', 'en-au')
      }
    }
  })))
