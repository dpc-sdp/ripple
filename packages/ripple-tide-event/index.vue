<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--event">
    <rpl-col cols="full">
      <rpl-markup v-if="page.field_event_description" :html="page.field_event_description.processed"></rpl-markup>
    </rpl-col>
    <rpl-col cols="full">
      <rpl-list :list="eventList" />
    </rpl-col>
    <rpl-col cols="full">
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
    </rpl-col>
    <rpl-col cols="full" v-if="page.bookLink">
      <rpl-button :href="page.bookLink.url" theme="primary">{{page.bookLink.title}}</rpl-button>
    </rpl-col>
    <!-- Tags here -->
    <img v-if="atdwTrackingBeacon" :src="atdwTrackingBeacon" width="1" height="1" border="0" />
  </rpl-row>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplList from '@dpc-sdp/ripple-list'
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplButton from '@dpc-sdp/ripple-button'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'

export default {
  name: 'TideEventContent',
  mixins: [formatdate],
  components: {
    RplRow,
    RplButton,
    RplCol,
    RplList,
    RplMarkup
  },
  props: {
    page: Object
  },
  computed: {
    eventList () {
      const {
        date,
        address,
        prices,
        bookLink,
        requirements
      } = this.page

      let list = [
        {
          symbol: 'calendar',
          size: '0.8',
          text: date.range
        }
      ]

      if (address && address.length > 0) {
        list.push({
          symbol: 'map_marker',
          size: '1',
          text: address
        })
      }

      if (prices) {
        list.push({
          symbol: 'dollar_negative',
          size: '1.2',
          text: prices
        })
      }

      if (bookLink !== null) {
        list.push({
          symbol: 'browser',
          size: '0.8',
          link: bookLink.url,
          text: bookLink.url
        })
      }

      // This is made by following design & Tide implementation, icons have to be hardcoded here.
      // If editor changed/added term, the icon won't work.
      const requirementIcons = {
        'default': { name: 'star', size: 1 },
        'Accessible venue': { name: 'accessible', size: 1.3 },
        'Child friendly': { name: 'child_friendly', size: 1.3 },
        'Free admission': { name: 'free', size: 1.3 },
        'Online webinar': { name: 'webinar', size: 1.2 },
        'Seniors': { name: 'senior', size: 1.3 }
      }

      requirements.map(requirement => {
        list.push({
          symbol: requirementIcons[requirement.name] ? requirementIcons[requirement.name].name : requirementIcons.default.name,
          size: requirementIcons[requirement.name] ? requirementIcons[requirement.name].size : requirementIcons.default.size,
          text: requirement.name
        })
      })

      return list
    },
    atdwTrackingBeacon () {
      return (!this.page.doNotTrack && this.page.field_tracking_beacon) || false
    }
  }
}
</script>
