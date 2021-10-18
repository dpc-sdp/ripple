<template>
  <div class="rpl-card-emergency">
    <div class="rpl-card-emergency__content">
      <div class="rpl-card-emergency__subtitle" v-if="subtitle"><span>{{ subtitle }}</span></div>
      <h2 class="rpl-card-emergency__title" v-if="title" :id="id">{{ title }}</h2>
      <p class="rpl-card-emergency__summary" v-if="summary">{{ summary }}</p>
    </div>
    <div class="rpl-card-emergency__cta" v-if="link">
      <span class="rpl-card-emergency__separator"></span>
      <rpl-link
        class="rpl-card-emergency__cta-link"
        :href="filterLink"
        :innerWrap="false"
        v-if="link"
        :aria-labelledby="id"
      >
        <rpl-icon :symbol="iconSymbol" color="primary" size="1.05"/>
        <span class="rpl-card-emergency__cta-link-text" v-if="link.text">
          {{ link.text }}
        </span>
      </rpl-link>
    </div>
  </div>
</template>

<script>
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'
import RplLink from '@dpc-sdp/ripple-link'
import { RplTextIcon, RplIcon } from '@dpc-sdp/ripple-icon'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplCardEmergencyContact',
  props: {
    title: String,
    subtitle: String,
    summary: String,
    link: Object
  },
  components: {
    RplLink,
    RplIcon,
    RplTextIcon
  },
  mixins: [uniqueid],
  data () {
    return {
      id: null
    }
  },
  mounted () {
    this.id = `card-title-${this.getIdFromLocalRegistry()}`
  },
  computed: {
    iconSymbol () {
      if (this.link.url.indexOf('tel:') > -1) {
        return 'phone_number'
      } else {
        return isExternalUrl(this.link.url, this.rplOptions.hostname) ? 'external_link' : 'arrow_right_primary'
      }
    },
    filterLink () {
      if (this.link.url.indexOf('tel:+') > -1) {
        return this.link.url.replace('tel:+', 'tel:')
      } else {
        return this.link.url
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-card-emergency-background: rpl-color('white') !default;
$rpl-card-emergency-padding: $rpl-space * 5 !default;
$rpl-card-emergency-border: 1px solid rpl-color('primary') !default;
$rpl-card-emergency-hover-border: 1px solid rgba(rpl-color('primary'), .2) !default;
$rpl-card-emergency-border-radius: rem(4px) !default;
$rpl-card-emergency-subtitle-ruleset: ('xs', 1.357em, 'bold') !default;
$rpl-card-emergency-subtitle-background-color: rpl-color('primary') !default;
$rpl-card-emergency-subtitle-background-color-hover: rpl-color('mid_neutral_1') !default;
$rpl-card-emergency-subtitle-color: rpl-color('white') !default;
$rpl-card-emergency-subtitle-color-hover: rpl-color('extra_dark_neutral') !default;
$rpl-card-emergency-subtitle-padding: $rpl-space-2 $rpl-space-2 !default;
$rpl-card-emergency-subtitle-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-emergency-title-ruleset: ('l', 1.2em, 'bold') !default;
$rpl-card-emergency-title-color: rpl_color('extra_dark_neutral') !default;
$rpl-card-emergency-title-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-emergency-summary-color: rpl-color('extra_dark_neutral') !default;
$rpl-card-emergency-summary-ruleset: ('s', 1.5em, 'regular') !default;
$rpl-card-emergency-summary-margin: 0 0 $rpl-space-3 0 !default;
$rpl-card-emergency-link-color: rpl-color('primary') !default;
$rpl-card-emergency-link-margin: $rpl-space-3 0 0 !default;
$rpl-card-emergency-link-ruleset: ('s', 1.5em, 'regular') !default;
$rpl-card-emergency-separator-border: 2px solid rpl-color('extra_dark_neutral') !default;

.rpl-card-emergency {
  $root: &;
  background-color: $rpl-card-emergency-background;
  border: $rpl-card-emergency-border;
  border-radius: $rpl-card-emergency-border-radius;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  height: rem(250px);
  padding: $rpl-card-emergency-padding;

  &:hover {
    border: $rpl-card-emergency-hover-border;
    #{$root}__subtitle {
      background-color: $rpl-card-emergency-subtitle-background-color-hover;

      span {
        color: $rpl-card-emergency-subtitle-color-hover;
      }
    }
  }

  &__subtitle {
    @include rpl_typography_ruleset($rpl-card-emergency-subtitle-ruleset);
    background-color: $rpl-card-emergency-subtitle-background-color;
    box-sizing: border-box;
    display: inline-block;
    margin: $rpl-card-emergency-subtitle-margin;
    min-width: rem(170px);
    padding: $rpl-card-emergency-subtitle-padding;

    @include rpl_breakpoint('l') {
      min-width: 100%;
    }

    @include rpl_breakpoint('xl') {
      min-width: rem(170px);
    }

    span {
      color: $rpl-card-emergency-subtitle-color;
    }
  }

  &__title {
    @include rpl_typography_ruleset($rpl-card-emergency-title-ruleset);
    color: $rpl-card-emergency-title-color;
    margin: $rpl-card-emergency-title-margin;
  }

  &__summary {
    @include rpl_typography_ruleset($rpl-card-emergency-summary-ruleset);
    color: $rpl-card-emergency-summary-color;
    margin: $rpl-card-emergency-summary-margin;
  }

  &__separator {
    display: block;
    border-top: $rpl-card-emergency-separator-border;
    width: 100%;
  }

  &__cta {
    align-self: flex-end;
    display: block;
    width: 100%;

    &-link {
      &.rpl-link {
        @include rpl_typography_ruleset($rpl-card-emergency-link-ruleset);
        color: $rpl-card-emergency-link-color;
        display: inline-block;
        margin: $rpl-card-emergency-link-margin;

        &:hover {
          text-decoration: none;
        }
      }
    }

    .rpl-icon {
      padding-right: $rpl-space;
    }
  }
}
</style>
