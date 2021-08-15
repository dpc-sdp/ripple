<template>
  <div class="app-content-collection">
    <pre>{{ schema }}</pre>
    <h2 v-if="title">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
    <div>Call to Action</div>
    <!-- Filters -->
    <!-- Grid -->
    <div>Search Results</div>
    <!--
    <rpl-seach-results-layout>
      <template v-slot:error>Error Msg</template>
      <template v-slot:count>Count</template>
      <template v-slot:sort>Sort</template>
      <template v-slot:loading>loading</template>
      <template v-slot:results>results</template>
      <template v-slot:noresults>noresults</template>
      <template v-slot:pagination>pagination</template>
    </rpl-seach-results-layout>
    -->
  </div>
</template>

<script>
import { RplLink } from '@dpc-sdp/ripple-link'
import { RplSelect, RplForm } from '@dpc-sdp/ripple-form'
import { RplSearchResultsLayout } from '@dpc-sdp/ripple-search'
import provideChildCols from '@dpc-sdp/ripple-global/mixins/ProvideChildCols'

export default {
  name: 'AppContentCollection',
  mixins: [provideChildCols],
  components: {
    RplLink,
    RplForm,
    RplSelect,
    RplSearchResultsLayout
  },
  props: {
    schema: Object,
    initialState: Object,
    sidebar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dataManager () {
      return new this.$tideContentCollection(this.schema)
    },
    title () {
      return this.dataManager.getTitle()
    },
    description () {
      return this.dataManager.getDescription()
    }
  }
}
</script>

<style lang="scss">
.app-content-collection {
  background-color: pink;
}
</style>
