<template>
  <div class="rpl-timeline">
    <h2 v-if="title" class="rpl-timeline__title">{{ title }}</h2>
    <ol v-if="list" class="rpl-timeline__list" ref="list">
      <li v-for="(item, index) in list" :key="index" class="rpl-timeline__list-item" :class="{
        'rpl-timeline__list-item--with-image' : item.image,
        'rpl-timeline__list-item--multi' : (list.length > 1)
      }">
        <img v-if="item.image" :src="item.image" alt="" class="rpl-timeline__item-image" ref="image" />
        <h3 v-if="item.title" class="rpl-timeline__item-title">
          <span v-if="!item.url">{{ item.title }}</span>
          <rpl-link v-if="item.url" :href="item.url">{{ item.title }}</rpl-link>
        </h3>
        <p v-if="hasSubtitle(item)" class="rpl-timeline__item-subtitle">{{ subtitle(item) }}</p>
        <rpl-markup v-if="item.description" class="rpl-timeline__item-description" :html="item.description"></rpl-markup>
      </li>
    </ol>
  </div>
</template>

<script>
import objectFitImages from 'object-fit-images'
import formatdate from '@dpc-sdp/ripple-global/mixins/formatdate'
import { RplLink } from '@dpc-sdp/ripple-link'
import RplMarkup from '@dpc-sdp/ripple-markup'

export default {
  name: 'RplTimeline',
  mixins: [formatdate],
  props: {
    title: String,
    list: Array
  },
  components: {
    RplLink,
    RplMarkup
  },
  data () {
    return {
      sidebarHeight: 0
    }
  },
  methods: {
    subtitle (item) {
      if (item.dateStart && item.dateEnd) {
        return this.formatDateRange(item.dateStart, item.dateEnd)
      } else if (item.subtitle) {
        return item.subtitle
      } else {
        return null
      }
    },
    hasSubtitle (item) {
      return item.dateStart || item.dateEnd || item.subtitle
    }
  },
  mounted () {
    objectFitImages(this.$refs.image)
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-timeline-image-dimension: rem(88px) !default;
  $rpl-timeline-image-margin: 0 0 0 ($rpl-space * -1) !default;
  $rpl-timeline-point-top: $rpl-space-3 !default;
  $rpl-timeline-point-with-image-top: $rpl-timeline-image-dimension / 2 !default;
  $rpl-timeline-point-width: ($rpl-space * 5) !default;
  $rpl-timeline-point-with-image-width: ($rpl-space * 7) !default;
  $rpl-timeline-point-thickness: 1px !default;
  $rpl-timeline-point-color: rpl-color('mid_neutral_1') !default;
  $rpl-timeline-sidebar-size: $rpl-timeline-point-thickness !default;
  $rpl-timeline-sidebar-color: $rpl-timeline-point-color !default;
  $rpl-timeline-sidebar-gutter-width: ($rpl-space * 8) !default;
  $rpl-timeline-list-item-padding: 0 0 rem(18px) $rpl-timeline-sidebar-gutter-width !default;
  $rpl-timeline-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-timeline-item-title-text-link-color: rpl-color('primary') !default;
  $rpl-timeline-item-subtitle-ruleset: ('s', 1.5em, 'medium') !default;
  $rpl-timeline-item-description-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-timeline-item-description-margin: $rpl-space-3 0 $rpl-space 0 !default;
  $rpl-timeline-item-description-text-margin-top: rem(6px) !default;
  $rpl-timeline-item-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-subtitle-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-description-text-color: rpl-color('extra_dark_neutral') !default;

  .rpl-timeline {
    $root: &;

    &__title {
      @include rpl_text_color($rpl-timeline-title-text-color);
    }

    &__list {
      position: relative;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &__list-item {
      $list-item: &;
      position: relative;
      padding: $rpl-timeline-list-item-padding;

      @include rpl_print {
        page-break-inside: avoid;
        padding-left: 0;
      }

      &--multi {
        border-left: $rpl-timeline-sidebar-size solid $rpl-timeline-sidebar-color;

        @include rpl_print {
          border-left: 0;
        }

        &::before {
          content: '';
          height: $rpl-timeline-point-thickness;
          width: $rpl-timeline-point-width;
          background-color: $rpl-timeline-point-color;
          position: absolute;
          top: $rpl-timeline-point-top;
          left: 0;

          @include rpl_print_hidden;
        }

        &:first-child, &:last-child {
          border-left: 0;

          &::after {
            content: '';
            display: inline-block;
            background-color: $rpl-timeline-sidebar-color;
            width: $rpl-timeline-sidebar-size;
            top: $rpl-timeline-point-top;
            bottom: 0;
            left: 0;
            position: absolute;

            @include rpl_print_hidden;
          }
        }

        &:last-child {
          &::after {
            bottom: calc(100% - #{$rpl-timeline-point-top});
            top: 0;
          }
        }

        &#{$list-item}--with-image {
          &::before {
            top: $rpl-timeline-point-with-image-top;
            width: $rpl-timeline-point-with-image-width;
          }

          &:first-child {
            &::after {
              top: $rpl-timeline-point-with-image-top;
            }
          }

          &:last-child {
            &::after {
              bottom: calc(100% - #{$rpl-timeline-point-with-image-top});
            }
          }
        }
      }
    }

    &__item-image {
      width: $rpl-timeline-image-dimension;
      height: $rpl-timeline-image-dimension;
      margin: $rpl-timeline-image-margin;
      border-radius: 100%;
      @include object_fit_image(cover);

      @include rpl_print {
        margin: 0;
      }
      @include rpl_print_image;
    }

    &__item-title {
      @include rpl_typography_ruleset($rpl-timeline-item-title-ruleset);
      @include rpl_text_color($rpl-timeline-item-title-text-color);
      margin: 0;

      .rpl-link {
        @include rpl_text_color($rpl-timeline-item-title-text-link-color);
      }
    }

    &__item-subtitle {
      @include rpl_typography_ruleset($rpl-timeline-item-subtitle-ruleset);
      @include rpl_text_color($rpl-timeline-item-subtitle-text-color);
      margin: 0 0 $rpl-space 0;
    }

    &__item-description {
      @include rpl_typography_ruleset($rpl-timeline-item-description-ruleset);
      @include rpl_text_color($rpl-timeline-item-description-text-color);
      margin: $rpl-timeline-item-description-margin;
      h1, h2, h3, h4, h5, h6 {
        margin: 0;
      }
      h4 + h5 {
        margin-top: $rpl-timeline-item-description-text-margin-top;
      }
      p {
        margin-top: $rpl-timeline-item-description-text-margin-top;
      }
    }
  }
</style>
