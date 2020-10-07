// A mixin for all nuxt pages.
// This enables us running logics on every pages which include static route pages.
// The difference with route middleware is in mixin, we are able to access Vue instance.
// Carefully add code to this mixin, as it will be added to all components.
const page = {
  created () {
    // Only Nuxt page component will have asyncData property
    if (!this.$options.asyncData) {
      return
    }

    // Quickexit logic
    this.rplOptions.quickexit = false
    if (this.$store.state.tide.siteData.field_site_show_exit_site) {
      this.rplOptions.quickexit = true
    } else if (this.page && this.page.appSection && this.page.appSection.quickexit) {
      this.rplOptions.quickexit = true
    }
  }
}

export default page
