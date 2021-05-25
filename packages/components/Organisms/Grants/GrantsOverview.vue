<template>
  <div class="rpl-grants-overview">
    <rpl-list
      class="rpl-grants-overview__list"
      size="large" v-if="title || list"
      :title="title"
      :link="!!listing && link && link.url ? link.url : null"
      :list="list"
      data-chromatic="ignore"
    />
    <rpl-markup class="rpl-grants-overview__description" v-if="description" :html="description"></rpl-markup>
    <rpl-button class="rpl-grants-overview__cta" v-if="!listing && link" :href="link.url" theme="primary">{{ link.text }}</rpl-button>
  </div>
</template>

<script>
import moment from 'moment'
import RplButton from '@dpc-sdp/ripple-button'
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplList from '@dpc-sdp/ripple-list'
import { formatMoney } from '@dpc-sdp/ripple-global/utils/helpers.js'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'

export default {
  name: 'RplGrantsOverview',
  components: {
    RplButton,
    RplMarkup,
    RplList
  },
  mixins: [formatdate],
  props: {
    title: { type: String, default: '' },
    funding: { type: Object },
    audience: { type: String, default: '' },
    startdate: { type: String, default: '' },
    enddate: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: Object, default: null },
    listing: { type: Boolean, default: false },
    statusTerms: {
      type: Object,
      default: function () {
        return {
          open: 'Open',
          closed: 'Closed',
          ongoing: 'Ongoing',
          openingSoon: (startdate) => `Opening on ${startdate}`,
          closingSoon: (end, now) => {
            const daysRemaining = parseInt(end.diff(now, 'days'))
            if (daysRemaining > 1) {
              return `Open, closing in ${daysRemaining} days`
            } else if (daysRemaining === 1) {
              return `Open, closing in ${daysRemaining} day`
            }
            return `Open, closing today`
          }
        }
      }
    }
  },
  methods: {
    calcFunding (from, to) {
      if (from > 0 && to > 0) {
        if (from === to) {
          return formatMoney(from)
        } else {
          return `${formatMoney(from)} - ${formatMoney(to)}`
        }
      } else if (from === 0 && to > 0) {
        return `$0 - ${formatMoney(to)}`
      } else if (from > 0 && to === 0) {
        return formatMoney(from)
      } else {
        return null
      }
    },
    calcStatus (startDate, endDate, terms = this.statusTerms) {
      if (startDate || endDate) {
        const now = moment()
        const start = startDate ? moment(startDate) : null
        const end = endDate ? moment(endDate) : null

        if (start) {
          if (now.isAfter(start)) {
            if (end) {
              if (now.isBefore(end)) {
                // displays status as "Open, closing in x days" when current date is more start date and less than end date
                return terms.closingSoon(end, now)
              } else {
                // displays status as "closed" when current date is after start date and after end date
                return terms.closed
              }
            } else {
              // displays status as "Ongoing" if there is no end date and the current date is after the start date
              return terms.ongoing
            }
          }
          // displays status as "Opening on startdate" when current date is within one month of startdate
          if (now.isBetween(moment(start).subtract(1, 'months'), start)) {
            return terms.openingSoon(this.formatDate(startDate))
          }
          // displays status as "Closed" when current date is more than one month of startdate
          return terms.closed
        } else {
          if (end) {
            if (now.isBefore(end)) {
              // displays status as "Open, closing in x days" when current date is more start date and less than end date
              return terms.closingSoon(end, now)
            } else {
              return terms.closed
            }
          } else {
            // displays status as "Ongoing" if there is no start or end date
            return terms.ongoing
          }
        }
      }
      // displays status as "Ongoing" if there is no start or end date
      return terms.ongoing
    }
  },
  computed: {
    list () {
      let list = []
      if (this.funding) {
        const fundingLevel = this.calcFunding(this.funding.from, this.funding.to)

        if (fundingLevel) {
          list.push({
            symbol: 'dollar_negative',
            size: (20 / 12),
            text: fundingLevel,
            id: 'grants-funding'
          })
        }
      }
      if (this.audience) {
        list.push({
          symbol: 'user',
          size: (20 / 12),
          text: this.audience,
          id: 'grants-audience'
        })
      }

      const status = this.calcStatus(this.startdate, this.enddate, this.statusTerms)

      list.push({
        symbol: status === 'Closed' ? 'cross_circle' : 'success',
        color: status === 'Closed' ? 'danger' : 'success',
        size: status === 'Closed' ? (20 / 24) : 1,
        text: status,
        id: 'grants-status'
      })

      return list.length > 0 ? list : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-grants-overview-description-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-grants-overview-description-color: rpl-color('extra_dark_neutral') !default;
  $rpl-grants-overview-title-margin: 0 0 ($rpl-space * 7 - $rpl-space-3) 0 !default;
  $rpl-grants-overview-list-margin: 0 0 ($rpl-space * 6) 0 !default;
  $rpl-grants-overview-description-margin: 0 0 ($rpl-space * 8) 0 !default;

  .rpl-grants-overview {

    &__list {
      margin: $rpl-grants-overview-title-margin;

      &.rpl-list--large {
        .rpl-list__title {
          margin: $rpl-grants-overview-list-margin;
        }
      }
      a.rpl-list__title {
        display: block;
      }
    }

    &__description {
      @include rpl_typography_ruleset($rpl-grants-overview-description-ruleset);
      @include rpl_text_color($rpl-grants-overview-description-color);
      margin: $rpl-grants-overview-description-margin;
    }
  }
</style>
