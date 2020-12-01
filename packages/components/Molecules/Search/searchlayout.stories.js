import RplSearchResultsLayout from './SearchResultsLayout'
import RplSearchResultsTable from './SearchResultsTable'
import RplSearchResult from './SearchResult.vue'

import { RplCol } from '@dpc-sdp/ripple-grid'
import { RplCardProfile } from '@dpc-sdp/ripple-card'
import { withKnobs, object, number } from '@storybook/addon-knobs'

export default {
  title: 'Molecules/Search/SearchResultsLayout',
  decorators: [withKnobs],
  includeStories: ['withCards', 'withTable', 'withSearchResult']
}

const getItems = (item, count) => {
  const items = []
  for (let index = 0; index < count; index++) {
    items.push(item)
  }
  return items
}

export const withSearchResult = () => ({
  components: { RplSearchResultsLayout, RplCol, RplSearchResult },
  template:
    `
    <rpl-search-results-layout
    :searchResults="searchResults"
    :pager="pagination"
    :count="20"
    :perPage="10"
  >
    <template v-slot:results="scoped">
      <rpl-col cols="full" v-for="(result, i) in scoped.searchResults" :key="i + '-result'">
        <rpl-search-result
          :title="result.title"
          :link="result.link"
          :date="result.date"
          :description="result.description"
          :tags="result.tags"
          :locale="result.locale"
      />
      </rpl-col>
    </template>
    </rpl-search-results-layout>
    `,
  props: {
    pagination: {
      default: () => ({
        totalSteps: number('Total steps', 2),
        initialStep: number('Initial step', 1),
        stepsAround: number('Step count around current', 2)
      })
    },
    searchResults: {
      default: () => {
        return object('Items', getItems({
          title: 'Schools private policy',
          link: {
            linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
            linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
          },
          date: '2018-07-10T09:00:00.000+10:00',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem',
          tags: [
            {
              linkText: 'This is a content tag',
              linkUrl: '#'
            },
            {
              linkText: 'This is a content tag',
              linkUrl: '#'
            }
          ],
          locale: 'en-au'
        }, 20))
      }
    }
  }
})

export const withCards = () => ({
  components: { RplSearchResultsLayout, RplCol, RplCardProfile },
  template:
    `
    <rpl-search-results-layout
    :searchResults="searchResults"
    :pager="pagination"
    :count="18"
    :perPage="9"
  >
    <template v-slot:results="scoped">
      <rpl-col :colsBp="{ m: 6, l: 4, xxxl: 3 }" v-for="(result, i) in scoped.searchResults" :key="i + '-result'">
        <rpl-card-profile
          :name="result.name"
          :inductionYear="result.inductionYear"
          :lifespan="result.lifespan"
          :summary="result.summary"
          :link="result.link"
          :image="result.image"
        />
      </rpl-col>
    </template>
    </rpl-search-results-layout>
    `,
  props: {
    pagination: {
      default: () => ({
        totalSteps: number('Total steps', 2),
        initialStep: number('Initial step', 1),
        stepsAround: number('Step count around current', 2)
      })
    },
    searchResults: {
      default: () => {
        return object('Items', getItems({
          name: 'Stella Young',
          inductionYear: '2017',
          category: 'Local Champion',
          lifespan: '1982 - 2014',
          summary: 'Journalist, comedian, feminist and fierce disability activist.',
          link: { text: "Read Stella's profile", url: '#' },
          image: 'https://placehold.it/148x148'
        }, 18))
      }
    }
  }
})

export const withTable = () => ({
  components: { RplSearchResultsLayout, RplCol, RplSearchResultsTable },
  template:
    `
    <rpl-search-results-layout
    :searchResults="searchResults"
    :pager="pagination"
    :responseSize="3"
    :count="3"
    :perPage="9"
  >
    <template v-slot:results="scoped">
      <rpl-col cols="full">
        <rpl-search-results-table :columnConfig="columnConfig" :items="scoped.searchResults"></rpl-search-results-table>
      </rpl-col>
    </template>
    </rpl-search-results-layout>
    `,
  props: {
    pagination: {
      default: () => ({
        totalSteps: number('Total steps', 2),
        initialStep: number('Initial step', 1),
        stepsAround: number('Step count around current', 2)
      })
    },
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
    searchResults: {
      default: () => {
        return object('Items', getItems({
          title: 'test',
          category: 'test cat',
          year: '2020'
        }, 40))
      }
    }
  }
})
