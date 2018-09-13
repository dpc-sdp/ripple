<template>
  <rpl-link class="rpl-card-masonry" :href="link.url" v-if="link.url">
    <img v-if="image" class="rpl-card-masonry__image" :src="image.src" :alt="image.alt" />
    <div class="rpl-card-masonry__content">
      <h2 v-if="title" class="rpl-card-masonry__title"><span>{{ title }}</span></h2>
      <p v-if="summary" class="rpl-card-masonry__summary">{{ summary }}</p>
      <rpl-icon v-if="link" :symbol="iconSymbol" color="white" />
    </div>
  </rpl-link>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplCardMasonry',
  props: {
    title: String,
    summary: String,
    link: Object,
    image: Object
  },
  components: {
    RplLink,
    RplIcon
  },
  computed: {
    iconSymbol () {
      return isExternalUrl(this.link.url, this.rplOptions.hostname) ? 'external_link' : 'arrow_right_primary'
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/style";
@import "scss/card";

$rpl-card-masonry-background-text-padding: rem(5px);
$rpl-card-masonry-title-ruleset: (
  'xs': ('xl', 1.467em, 'bold'),
  's': ('mega', 1.857em, 'bold')
);
$rpl-card-masonry-summary-ruleset: (
  'xs': ('xxs', 1.333em, 'medium')
);
$rpl-card-masonry-title-color: rpl_color('white');
$rpl-card-masonry-summary-color: rpl_color('white');
$rpl-card-masonry-title-background-color: rpl_color('secondary');
$rpl-card-masonry-summary-background: rpl_color('primary') url(rpl_banner_primary_arrow_url('secondary')) no-repeat bottom right;

.rpl-card-masonry {
  $root: &;

  display: block;
  position: relative;
  overflow: hidden;

  &__image {
    margin-bottom: rem(-7px);
    width: 100%;
  }

  &:hover {
    #{$root}__content {
      left: 0;
    }
  }

  &__content {
    position: absolute;
    transition: left 0.2s ease-in-out;
    left: -100%;
    bottom: 0;
    width: 100%;
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-masonry-title-ruleset);
    color: $rpl-card-masonry-title-color;
    margin: 0 rem(19px) rem(11px);

    span {
      background-color: $rpl-card-masonry-title-background-color;
      box-shadow: $rpl-card-masonry-background-text-padding 0 0 rpl_color('secondary'), -($rpl-card-masonry-background-text-padding) 0 0 rpl_color('secondary');
      padding: rem(6px) 0 rem(4px);
    }
  }

  &__summary {
    @include rpl_typography_ruleset($rpl-card-masonry-summary-ruleset);
    background: $rpl-card-masonry-summary-background;
    background-position: right calc(100% + 0.5rem);
    color: rpl-color('white');
    margin: 0;
    padding: rem(17px) rem(47px) rem(18px) rem(19px);
  }

  .rpl-icon {
    position: absolute;
    bottom: $rpl-space-3;
    right: $rpl-space-3;
  }
}
</style>
