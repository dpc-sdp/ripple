<template>
  <dl class="rpl-description-list-icon">
    <div v-for="(item, idx) in items" :key="`moreinfo-${idx}`" class="rpl-description-list-icon__item">
      <dt>
        <rpl-icon aria-hidden="true" v-if="item.icon" class="rpl-description-list-icon__icon" :symbol="item.icon" color="primary" size="m" />
        {{item.heading}}
      </dt>
      <dd class="rpl-description-list-icon__content">
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
$rpl-description-list-icon-max-width: rem(485px);
$rpl-description-list-icon-header-ruleset: ('xs', 1.5em, 'bold') !default;
$rpl-description-list-icon-content-ruleset: ('xs', 1.5em, 'regular') !default;
$rpl-description-list-item-margin: $rpl-space-4 !default;

.rpl-description-list-icon {
  $root: &;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: $rpl-description-list-icon-max-width;

  &__item {
    position: relative;
    margin: $rpl-description-list-item-margin 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
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
  }
  dt {
    @include rpl_typography_ruleset($rpl-description-list-icon-header-ruleset);
  }
  dd {
    @include rpl_typography_ruleset($rpl-description-list-icon-content-ruleset);
    .rpl-markup__inner {
      &:first-child {
        margin-top: 0;
      }
      #{$root}__content-item {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
  &--has-icons {
    dt,
    dd {
      padding-left: $rpl-space-3 * 2;
    }
  }
}
</style>
