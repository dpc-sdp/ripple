<script>
// Extend Ripple component if need. https://vuejs.org/v2/api/#extends
// Please be careful as extending will introduce complexity in maintenance.
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

export default {
  extends: RplSiteHeader,
  name: 'MySiteHeader'
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-site-header {
    &__inner {
      background: none;
    }
  }
</style>
