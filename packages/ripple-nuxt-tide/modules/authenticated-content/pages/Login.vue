<template>
  <rpl-page-layout class="app-main">
    <rpl-row row-gutter class="app-content">
      <rpl-col cols="full">
        <tide-login />
        </rpl-col>
    </rpl-row>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplForm from '@dpc-sdp/ripple-form'
import TideLogin from '../components/TideLogin'

export default {
  components: {
    RplCol,
    RplRow,
    RplForm,
    RplPageLayout,
    TideLogin
  },
  asyncData ({ route, store, redirect }) {
    const isAuthed = store.state.tideAuthenticatedContent.isAuthenticated
    if (isAuthed) {
      if (route.query.destination !== undefined) {
        redirect(route.query.destination)
      } else {
        redirect('/')
      }
    }
  },
  props: {
    page: Object
  }
}
</script>
