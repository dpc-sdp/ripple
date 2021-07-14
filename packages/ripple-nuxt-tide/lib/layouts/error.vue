<template>
  <rpl-page-layout class="app-main">
    <app-error :type="errorType" />
  </rpl-page-layout>
</template>

<script>
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import AppError from '../components/AppError'

export default {
  components: {
    RplPageLayout,
    AppError
  },
  props: ['error'],
  computed: {
    errorType () {
      return this.error.statusCode === 404 ? '404' : 'other'
    }
  }
}
</script>
