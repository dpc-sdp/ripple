<template>
  <rpl-page-layout class="app-main">
    <app-error type="other" />
  </rpl-page-layout>
</template>

<script>
import AppError from '@dpc-sdp/ripple-nuxt-tide/lib/components/AppError'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'

// Make a 500 error page for testing our custom error message.
export default {
  name: 'ErrorTestPage',
  components: {
    AppError,
    RplPageLayout
  },
  async validate ({ params, store }) {
    // Throws a 500 internal server error with custom message
    throw new Error('ooops')
  }
}
</script>
