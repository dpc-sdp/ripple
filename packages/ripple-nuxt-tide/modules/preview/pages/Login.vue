<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner :title="title" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <div class="tide-authenticate">
          <div v-if="!$auth.loggedIn && !this.loggingOut">
            <p>Please wait while we log you in.</p>
          </div>
          <div v-if="loggingOut">
            <p>Please wait while we log you out.</p>
          </div>
          <div v-if="$auth.loggedIn">
            <p>You are currently logged in. To log out please click below.</p>
            <rpl-button v-if="$auth.loggedIn" @click.native="logout" theme="primary">Log out</rpl-button>
          </div>
        </div>
      </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'
import RplButton from '@dpc-sdp/ripple-button'
import { tidePreviewLogin } from '../lib/helpers'

export default {
  name: 'Login',
  components: {
    RplButton,
    RplHeroBanner,
    RplRow,
    RplCol,
    RplPageLayout
  },
  data () {
    return {
      loggingOut: false
    }
  },
  computed: {
    title () {
      return (!this.$auth.loggedIn && !this.loggingOut) ? 'Logging in' : 'Log in'
    }
  },
  methods: {
    async logout () {
      this.loggingOut = true
      await this.$auth.logout()
    }
  },
  async asyncData ({ app, route, store }) {
    const title = !app.$auth.loggedIn ? 'Logging in' : 'Log in'
    store.dispatch('tide/setPageHead', { title })
  },
  mounted () {
    tidePreviewLogin(this.$route, this.$auth, localStorage)
  }
}
</script>
