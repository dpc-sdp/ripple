<template>
  <div class="tide-alert">
    <no-ssr>
      <rpl-alert v-if="alert" ref="alert" v-bind="alert"/>
    </no-ssr>
  </div>
</template>

<script>
import { RplAlert } from '@dpc-sdp/ripple-alert'

export default {
  name: 'TideAlert',
  components: {
    RplAlert
  },
  mounted () {
    this.$nextTick(function () {
      if (this.$store.state.tideAlerts.alert && this.$refs.alert) {
        this.$refs.alert.$on('rplAlertClose', (alertId) => {
          this.$store.commit('tideAlerts/dismissAlert', alertId)
        })
      }
    })
  },
  computed: {
    alert () {
      const alert = this.$store.state.tideAlerts.alert
      if (alert && !this.$store.state.tideAlerts.dismissedAlerts.includes(alert.alertId)) {
        return alert
      }
      return null
    }
  }
}
</script>
