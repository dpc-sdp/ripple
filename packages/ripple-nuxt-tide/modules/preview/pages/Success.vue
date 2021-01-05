<template>
  <rpl-page-layout class="app-main">

    <template slot="aboveContent" >
      <rpl-hero-banner title="Logging in" class="rpl-site-constrain--on-all"/>
    </template>

    <rpl-row row-gutter>
      <rpl-col cols="full">
        <p>Please wait while we log you in.</p>
      </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'
import { tidePreviewSuccessRedirect } from '../lib/helpers'

export default {
  name: 'Success',
  components: {
    RplHeroBanner,
    RplRow,
    RplCol,
    RplPageLayout
  },
  async asyncData ({ app, route, store, redirect }) {
    store.dispatch('tide/setPageHead', { title: 'Logging in' })
  },
  mounted () {
    tidePreviewSuccessRedirect(this.$router, localStorage)
  }
}
</script>
