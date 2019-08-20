<template>
  <div class="tide-alert" v-if="alerts && alerts.length > 0">
    <no-ssr>
      <rpl-alert v-for="alert in alerts" :key="alert.id" @rplAlertClose="dismissAlert" v-bind="alert"/>
    </no-ssr>
  </div>
</template>

<script>
import { RplAlert } from '@dpc-sdp/ripple-alert'
import { sortBy } from 'lodash'
import Cookies from 'js-cookie'

export default {
  name: 'TideAlert',
  components: {
    RplAlert
  },
  data () {
    return {
      dismissed: []
    }
  },
  mounted () {
    if (typeof window !== 'undefined') {
      const dismissed = Cookies.getJSON('dismissedAlerts')
      if (Array.isArray(dismissed) && dismissed.length > 0) {
        this.dismissed = dismissed
      }
    }
  },
  methods: {
    dismissAlert (id) {
      this.dismissed = [...new Set([...this.dismissed, id])]
      Cookies.set('dismissedAlerts', this.dismissed, { path: this.rplOptions.hostname, expires: 1 })
    }
  },
  computed: {
    alerts () {
      const alerts = this.$store.getters['tideAlerts/getAlerts']
        .filter(alert => {
          if (alert && this.dismissed && this.dismissed.length > 0 && this.dismissed.includes(alert.id)) {
            return false
          }
          return alert
        })
        .map(alert => {
          return {
            title: alert.title,
            type: alert.type,
            link: alert.link,
            id: alert.id
          }
        })

      if (alerts && alerts.length > 0) {
        // Sort by non notifications first then most recently changed
        return sortBy(alerts, [(a) => a.type !== 'Notification', 'changed']).reverse()
      }
      return []
    }
  }
}
</script>
