<template>
  <div class="rpl-page" v-if="page && !page.error">
    <component :is="pageComponent" :page="page"></component>
  </div>
  <error-page v-else-if="error" :type="error"></error-page>
</template>

<script>
import errorPage from '@dpc-sdp/ripple-nuxt/components/error'
import useTide from '@dpc-sdp/ripple-nuxt/lib/setup'

export default {
  components: {
    errorPage
  },
  async asyncData (ctx) {
    const data = await useTide(ctx)
    return data
  },
  computed: {
    pageComponent () {
      if (this.page && this.page.type) {
        try {
          return this.$tideApi.getModuleComponent(this.page.type)
        } catch (error) {
          return null
        }
      }
    }
  }
}
</script>

<style>
.rpl-page {

}
</style>
