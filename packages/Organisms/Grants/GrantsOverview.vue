<template>
  <div class="rpl-grants-overview">
    <rpl-list class="rpl-grants-overview__list" size="large" v-if="title || list" :title="title" :list="list" />
    <p class="rpl-grants-overview__description" v-if="description">{{ description }}</p>
    <rpl-button class="rpl-grants-overview__cta" v-if="link" :href="link.url" theme="primary">{{ link.text }}</rpl-button>
  </div>
</template>

<script>
import moment from 'moment'
import RplButton from '@dpc-sdp/ripple-button'
import RplList from '@dpc-sdp/ripple-list'

export default {
  name: 'RplGrantsOverview',
  components: {
    RplButton,
    RplList
  },
  props: {
    title: { type: String, default: '' },
    funding: { type: String, default: '' },
    audience: { type: String, default: '' },
    startdate: { type: String, default: '' },
    enddate: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: Object, default: null },
    statusTerms: {
      type: Object,
      default: function () {
        return {
          open: 'Open',
          closed: 'Closed',
          ongoing: 'On-going',
          openingsoon: 'Opening soon'
        }
      }
    }
  },
  computed: {
    list () {
      let list = []
      if (this.funding) {
        list.push({
          symbol: 'dollar_negative',
          size: '1.666',
          text: this.funding
        })
      }
      if (this.audience) {
        list.push({
          symbol: 'user',
          size: '1.666',
          text: this.audience
        })
      }

      let status = this.statusTerms.ongoing
      if (this.startdate || this.enddate) {
        const now = moment()
        const start = this.startdate ? moment(this.startdate) : null
        const end = this.enddate ? moment(this.enddate) : null
        if (start) {
          if (now.isAfter(start)) {
            if (end) {
              if (now.isBefore(end)) {
                status = this.statusTerms.open
              } else {
                status = this.statusTerms.closed
              }
            } else {
              status = this.statusTerms.ongoing
            }
          } else {
            if (end) {
              status = this.statusTerms.openingsoon
            } else {
              status = this.statusTerms.ongoing
            }
          }
        } else {
          if (end) {
            if (now.isBefore(end)) {
              status = this.statusTerms.open
            } else {
              status = this.statusTerms.closed
            }
          } else {
            status = this.statusTerms.ongoing
          }
        }
      }
      list.push({
        symbol: status === 'Closed' ? 'cross_circle' : 'success',
        color: status === 'Closed' ? 'danger' : 'success',
        size: '0.8333',
        text: status
      })

      return list.length > 0 ? list : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-grants-overview-description-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-grants-overview-description-color: rpl-color('extra_dark_neutral') !default;
  $rpl-grants-overview-title-margin: 0 0 ($rpl-space * 7 - $rpl-space-3) 0 !default;
  $rpl-grants-overview-list-margin: 0 0 ($rpl-space * 6) 0 !default;
  $rpl-grants-overview-description-margin: 0 0 ($rpl-space * 8) 0 !default;

  .rpl-grants-overview {
    @include rpl_mobile_padding();

    @include rpl_breakpoint('m') {
      padding-left: 0;
      padding-right: 0;
    }

    &__list {
      margin: $rpl-grants-overview-title-margin;

      &.rpl-list--large {
        .rpl-list__title {
          margin: $rpl-grants-overview-list-margin;
        }
      }
    }

    &__description {
      @include rpl_typography_ruleset($rpl-grants-overview-description-ruleset);
      color: $rpl-grants-overview-description-color;
      margin: $rpl-grants-overview-description-margin;
    }
  }
</style>
