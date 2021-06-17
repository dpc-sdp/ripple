<template>
  <dl class="rpl-more-info-list">
    <div v-for="(item, idx) in items" :key="`moreinfo-${idx}`" class="rpl-more-info-list__item">
      <dt>
        <rpl-icon aria-hidden="true" v-if="item.icon" class="rpl-more-info-list__icon" :symbol="item.icon" color="primary" size="m" />
        {{item.heading}}
      </dt>
      <dd>
        <rpl-markup :html="item.content" />
      </dd>
    </div>
  </dl>
</template>

<script>
import { RplIcon } from '@dpc-sdp/ripple-icon'
import RplMarkup from '@dpc-sdp/ripple-markup'
export default {
  components: {
    RplIcon,
    RplMarkup
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
$rpl-more-info-max-width: rem(485px);
$rpl-more-info-header-ruleset: ('s', 1.5em, 'bold') !default;
.rpl-more-info-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: $rpl-more-info-max-width;
  &__item {
    position: relative;
    margin: $rpl-space-4 0;
  }
  &__icon {
    position: absolute;
    left: 0;
    top: $rpl-space;
  }
  dt,
  dd {
    margin: 0;
    padding: 0;
    padding-left: $rpl-space-3 * 2;
  }
  dt {
    @include rpl_typography_ruleset($rpl-more-info-header-ruleset);
  }
}
</style>
