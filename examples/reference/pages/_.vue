<template>
  <rpl-page :page="page">
  </rpl-page>
</template>

<script>
import RplPage from '@dpc-sdp/ripple-nuxt/components/ripple-page'
import useTide from '@dpc-sdp/ripple-nuxt/lib/setup'

export default {
  components: {
    RplPage
  },
  async asyncData (ctx) {
    const data = await useTide(ctx)
    return data
  }
}
</script>
