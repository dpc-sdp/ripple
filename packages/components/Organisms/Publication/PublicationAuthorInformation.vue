<template>
  <rpl-description-list class="rpl-author-information" :list="informationListing" />
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import RplDescriptionList from '@dpc-sdp/ripple-description-list'
import pluralize from 'pluralize'

export default {
  name: 'RplAuthorInformation',
  mixins: [formatdate],
  components: {
    RplDescriptionList
  },
  props: {
    author: String,
    date: String,
    copyright: String,
    locale: { default: 'en-au', type: String }
  },
  computed: {
    informationListing () {
      const terms = []
      if (this.author) {
        terms.push({ term: 'Author', description: this.author })
      }
      if (this.date) {
        terms.push({ term: 'Date', description: this.formatDate(this.date, 'MMMM YYYY') })
      }
      if (this.copyright) {
        terms.push({ term: 'Copyright', description: this.copyright })
      }
      return terms
    }
  }
}
</script>
