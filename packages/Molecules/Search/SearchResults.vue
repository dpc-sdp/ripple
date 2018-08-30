<template>
  <div class="rpl-search-results">
    <div class="rpl-search-results__info" >
      <div v-if="count">Displaying {{ responseSize > count ? count : responseSize }} of {{ count }} results</div>
    </div>

    <div class="rpl-search-results__main">
      <rpl-search-result
        class="rpl-search-results__item rpl-component-gutter"
        v-bind="searchResult"
        v-if="searchResults"
        v-for="(searchResult, index) of searchResults"
        :key="index"
      />
    </div>

    <div class="rpl-search-results__pager">
      <rpl-pagination
        :totalSteps="pager.totalSteps"
        :initialStep="pager.initialStep"
        :stepsAround="pager.stepsAround"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import RplPagination from '@dpc-sdp/ripple-pagination'
import RplSearchForm from './SearchForm.vue'
import RplSearchResult from './SearchResult.vue'

export default {
  name: 'SSearchPage',
  components: {
    RplPagination,
    RplSearchForm,
    RplSearchResult
  },
  // props: {
  //   searchResults: Object
  // },
  data () {
    return {
      errorMsg: '',
      noResultsCopy: '',
      searchForm: {
        title: 'Search results',
        searchPlaceholder: 'Start typing...',
        showFilters: false,
        theme: 'light'
      },
      responseSize: 10,
      count: null,
      pager: {
        totalSteps: 0,
        initialStep: this.$route.query.page ? Number(this.$route.query.page) : 1,
        stepsAround: 2
      },
      searchResults: [
        {
          title: 'Schools private policy',
          link: {
            linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
            linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
          },
          date: '2018-07-10T09:00:00.000+10:00',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem',
          tags: [{
            linkText: 'This is a content tag',
            linkUrl: '#'
          }, {
            linkText: 'This is a content tag',
            linkUrl: '#'
          }],
          locale: 'en-au'
        },

        {
          title: 'Schools private policy',
          link: {
            linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
            linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
          },
          date: '2018-07-10T09:00:00.000+10:00',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem',
          tags: [{
            linkText: 'This is a content tag',
            linkUrl: '#'
          }, {
            linkText: 'This is a content tag',
            linkUrl: '#'
          }],
          locale: 'en-au'
        },

        {
          title: 'Schools private policy',
          link: {
            linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
            linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
          },
          date: '2018-07-10T09:00:00.000+10:00',
          description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem',
          tags: [{
            linkText: 'This is a content tag',
            linkUrl: '#'
          }, {
            linkText: 'This is a content tag',
            linkUrl: '#'
          }],
          locale: 'en-au'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-search-results {
    &__info {
      @include rpl_mobile_padding();
      @include rpl_breakpoint('m') {
        padding-left: 0;
        padding-right: 0;
      }
    }
  }
</style>
