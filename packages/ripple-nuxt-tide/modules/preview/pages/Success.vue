<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner title="Successful login" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <p v-if="hasRedirect">Please wait while we redirect you.</p>
        <p v-else>You are now logged in.</p>
      </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

export default {
  name: 'Success',
  components: {
    RplHeroBanner,
    RplRow,
    RplCol,
    RplPageLayout
  },
  data () {
    return {
      hasRedirect: false
    }
  },
  async asyncData ({ app, route, store, redirect }) {
    store.dispatch('tide/setPageHead', { title: 'Successful login' })
  },
  mounted () {
    const destination = localStorage.getItem('login-destination')
    if (destination) {
      this.hasRedirect = true
      localStorage.removeItem('login-destination')
      this.$router.push({ path: destination })
    }
  }
}
</script>
