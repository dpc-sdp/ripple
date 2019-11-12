<template>
  <div class="rpl-news-listing">
    <h2 v-if="title" class="rpl-news-listing__heading">{{ title }}</h2>
    <ul v-if="list" class="rpl-news-listing__items">
      <li class="rpl-news-listing__item" v-for="(item, index) in list" :key="index">
        <div>
          <span class="rpl-news-listing__item-date">{{ formatDate(item.date, 'DD MMMM YYYY') }}</span>
          <span class="rpl-news-listing__item-tag">{{ item.tag }}</span>
          <h3 class="rpl-news-listing__item-heading"><rpl-text-link :url="item.url" :text="item.title" iconSymbol="arrow_right_primary" iconColor="primary" /></h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import { RplTextLink } from '@dpc-sdp/ripple-link'

export default {
  name: 'RplNewsListing',
  mixins: [formatdate],
  props: {
    title: String,
    list: Array
  },
  components: {
    RplTextLink
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-news-listing-tag-text-color: rpl-color('primary') !default;
  $rpl-news-listing-tag-padding: $rpl-space $rpl-space-2 !default;
  $rpl-news-listing-tag-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-news-listing-date-ruleset: ('xs', 1em, 'medium') !default;
  $rpl-news-listing-date-padding: $rpl-space $rpl-space-2 !default;
  $rpl-news-listing-date-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-news-listing-date-background: rpl-color('white') !default;
  $rpl-news-listing-item-border: 1px solid rpl-color('mid_neutral_1') !default;
  $rpl-news-listing-item-padding: $rpl-space-4 0 !default;
  $rpl-news-listing-item-heading-margin: $rpl-space-4 0 !default;
  $rpl-news-listing-item-heading-color: rpl-color('extra_dark_neutral') !default;
  $rpl-news-listing-item-heading-color-hover: rpl-color('primary') !default;
  $rpl-news-listing-item-heading-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-news-listing-heading-margin: 0 0 ($rpl-space * 6) 0 !default;
  $rpl-news-listing-heading-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-news-listing-heading-ruleset: (
    'xs': ('xl', 1.17em, 'bold'),
    'l': ('mega', 1.29em, 'bold')
  ) !default;
  $rpl-news-listing-item-heading-icon-margin: 0 0 0 $rpl-space !default;

  .rpl-news-listing {
    padding-top: $rpl-space-4;

    @include rpl_breakpoint('m') {
      padding-top: $rpl-space-4 * 2;
    }

    &__heading {
      @include rpl_typography_ruleset($rpl-news-listing-heading-ruleset);
      @include rpl_text_color($rpl-news-listing-heading-text-color);
      margin: $rpl-news-listing-heading-margin;
    }

    &__items {
      padding: 0;
    }

    &__item {
      border-bottom: $rpl-news-listing-item-border;
      padding: $rpl-news-listing-item-padding;
      list-style: none;

      &:last-child {
        border-bottom: 0;
      }
    }

    &__item-date {
      @include rpl_typography_ruleset($rpl-news-listing-date-ruleset);
      @include rpl_text_color($rpl-news-listing-date-text-color);
      background-color: $rpl-news-listing-date-background;
      padding: $rpl-news-listing-date-padding;
    }

    &__item-tag {
      @include rpl_typography_ruleset($rpl-news-listing-tag-ruleset);
      @include rpl_text_color($rpl-news-listing-tag-text-color);
      padding: $rpl-news-listing-tag-padding;
      box-sizing: border-box;
      text-transform: uppercase;
    }

    &__item-heading {
      margin: $rpl-news-listing-item-heading-margin;

      .rpl-text-link {
        @include rpl_typography_ruleset($rpl-news-listing-item-heading-ruleset);
        @include rpl_text_color($rpl-news-listing-item-heading-color);

        &:hover,
        &:focus {
          color: $rpl-news-listing-item-heading-color-hover;
          text-decoration: none;

          .rpl-icon {
            visibility: visible;
          }
        }

        .rpl-icon {
          visibility: hidden;
        }
      }
    }
  }
</style>
