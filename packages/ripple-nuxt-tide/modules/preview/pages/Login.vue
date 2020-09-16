<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner title="Log in" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <div class="tide-authenticate">
          <div v-if="!$auth.loggedIn && !loginInProgress">
            <p>Log into your Drupal account to grant access to see this page.</p>
            <rpl-button @click.native="login" theme="primary">Log in</rpl-button>
          </div>
          <div v-if="!$auth.loggedIn && loginInProgress">
            <p>Please wait while we log you in.</p>
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

export default {
  name: 'Login',
  components: {
    RplButton,
    RplHeroBanner,
    RplRow,
    RplCol,
    RplPageLayout
  },
  methods: {
    async login () {
      // Store destination. Redirection happens in ./Success.vue.
      if (this.$route.query.destination) {
        localStorage.setItem('login-destination', this.$route.query.destination)
      }
      await this.$auth.loginWith('drupal')
    },
    async logout () {
      await this.$auth.logout()
    }
  },
  data () {
    return {
      loginInProgress: false
    }
  },
  async asyncData ({ app, route, store }) {
    store.dispatch('tide/setPageHead', { title: 'Login' })
  },
  mounted () {
    if (this.$route.query.code) {
      this.loginInProgress = true
    }
  }
}
</script>
