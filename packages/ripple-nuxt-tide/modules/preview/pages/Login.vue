<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner title="Log in" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <div class="tide-authenticate">
          <p>Log into your Drupal account to grant access to see this page.</p>
          <rpl-button v-if="!$auth.loggedIn" @click.native="login" theme="primary">Log in</rpl-button>
          <rpl-button v-if="$auth.loggedIn" @click.native="logout" theme="primary">Log out</rpl-button>

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
      const result = await this.$auth.loginWith('drupal')
    },
    async logout () {
      const result = await this.$auth.logout()
    }
  },
  async asyncData ({ app, route, store }) {
    store.dispatch('tide/setPageHead', { title: 'Login' })
  },
  mounted () {
    // console.log(this.$route.query.code)
    // if (this.$route.query.code) {
    //   this.$auth.setUserToken(this.$route.query.code)
    //   this.$auth.fetchUser()
    // }
  }
}
</script>
