<template>
  <div class="rpl-timeline">
    <h2 v-if="title" class="rpl-timeline__title">{{ title }}</h2>
    <ol v-if="list" class="rpl-timeline__list" ref="list">
      <li v-for="(item, index) in list" :key="index" class="rpl-timeline__list-item" :class="{
        'rpl-timeline__list-item--with-image' : item.image,
        'rpl-timeline__list-item--multi' : (list.length > 1),
        'rpl-timeline__list-item--current' : item.current,
        'rpl-timeline__list-item--active' : index < list.map(x => x.current).lastIndexOf(true)
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

  $rpl-timeline-active-color: rpl-color('primary') !default;

  $rpl-timeline-image-dimension: rem(88px) !default;
  $rpl-timeline-image-margin: 0 0 ($rpl-space / 2) 0 !default;
  $rpl-timeline-point-top: $rpl-space-3 !default;
  $rpl-timeline-point-with-image-top: $rpl-timeline-image-dimension / 2 !default;
  $rpl-timeline-point-width: ($rpl-space * 4) !default;
  $rpl-timeline-point-with-image-width: ($rpl-space * 4) !default;
  $rpl-timeline-point-thickness: 4px !default;
  $rpl-timeline-point-color: rpl-color('mid_neutral_1') !default;
  $rpl-timeline-sidebar-size: $rpl-timeline-point-thickness !default;
  $rpl-timeline-sidebar-color: $rpl-timeline-point-color !default;
  $rpl-timeline-sidebar-gutter-width: ($rpl-space * 7) !default;
  $rpl-timeline-item-title-height: rem(12px) !default;
  $rpl-timeline-list-item-padding: 0 0 (rem(12px) + $rpl-timeline-item-title-height) $rpl-timeline-sidebar-gutter-width !default;
  $rpl-timeline-list-item-min-height: ($rpl-timeline-item-title-height * 4) + rem(4px) !default;
  $rpl-timeline-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-title-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-timeline-item-title-text-link-color: rpl-color('primary') !default;
  $rpl-timeline-item-subtitle-ruleset: ('s', 1.5em, 'medium') !default;
  $rpl-timeline-item-description-ruleset: ('s', 1.5em, 'regular') !default;
  $rpl-timeline-item-description-margin: $rpl-space-2 0 $rpl-space-2 0 !default;
  $rpl-timeline-item-description-text-margin-top: rem(6px) !default;
  $rpl-timeline-item-title-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-subtitle-text-color: rpl-color('extra_dark_neutral') !default;
  $rpl-timeline-item-description-text-color: rpl-color('extra_dark_neutral') !default;

  .rpl-timeline {
    $root: &;

    &__title {
      @include rpl_text_color($rpl-timeline-title-text-color);
      margin: rem(24px) 0;
    }

    &__list {
      position: relative;
      list-style: none;
      padding: $rpl-timeline-item-title-height 0 0;
      margin: 0;
    }

    &__list-item {
      $list-item: &;
      min-height: $rpl-timeline-list-item-min-height;
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
          top: calc(#{$rpl-timeline-point-top} - (#{$rpl-timeline-point-thickness}/2));
          left: 0;

          @include rpl_print_hidden;
        }

        &:first-child, &:last-child {
          border-left-color: transparent;

          &::after {
            content: '';
            display: inline-block;
            background-color: $rpl-timeline-sidebar-color;
            width: $rpl-timeline-sidebar-size;
            top: calc(#{$rpl-timeline-point-top} - (#{$rpl-timeline-point-thickness}/2));
            bottom: 0;
            left: -$rpl-timeline-point-thickness;
            position: absolute;

            @include rpl_print_hidden;
          }
        }

        &:first-child {
          &::before {
            left: 0;
          }
        }

        &:last-child {
          &::after {
            height: $rpl-timeline-point-thickness;
            width: calc(#{$rpl-timeline-point-thickness} + #{$rpl-timeline-point-width});
          }
        }

        &#{$list-item}--with-image {
          .rpl-timeline__item-title {
            margin-top: 0;
          }

          &::before {
            top: calc(#{$rpl-timeline-point-with-image-top} - (#{$rpl-timeline-point-thickness}/2));
            width: $rpl-timeline-point-with-image-width;
          }

          &:first-child {
            margin-top: -$rpl-timeline-item-title-height;

            &::after {
              top: calc(#{$rpl-timeline-point-with-image-top} - (#{$rpl-timeline-point-thickness}/2));
            }
          }

          &:last-child {
            &::after {
              top: 0;
              height: calc((#{$rpl-timeline-image-dimension}/2) + (#{$rpl-timeline-point-thickness}/2));
              width: $rpl-timeline-sidebar-size;
            }
          }
        }
      }

      &--active.rpl-timeline__list-item--multi {
        border-left-color: $rpl-timeline-active-color;

        &:first-child, &:last-child {
          border-left-color: transparent;
        }

        &::after, &::before {
          background-color: $rpl-timeline-active-color;
        }
      }

      &--current.rpl-timeline__list-item--multi {
        &::before {
          background-color: $rpl-timeline-active-color;
        }

        &::after {
          content: '';
          display: inline-block;
          background-color: $rpl-timeline-active-color;
          height: calc(#{$rpl-timeline-item-title-height} + (#{$rpl-timeline-sidebar-size}/2));
          width: $rpl-timeline-sidebar-size;
          top: 0;
          left: -$rpl-timeline-sidebar-size;
          position: absolute;

          @include rpl_print_hidden;
        }

        &:first-child {
          &::before {
            left: -$rpl-timeline-sidebar-size;
            width: calc(#{$rpl-timeline-point-width} + #{$rpl-timeline-sidebar-size});
          }

          &::after {
            background-color: $rpl-timeline-sidebar-color;
            height: 100%;
            top: calc(#{$rpl-timeline-item-title-height} + (#{$rpl-timeline-sidebar-size}/2));
          }
        }

        .rpl-timeline__item-title,
        .rpl-link {
          color: $rpl-timeline-active-color;
        }
      }

      &--current.rpl-timeline__list-item--multi.rpl-timeline__list-item--with-image {
        &::after {
          height: calc(#{$rpl-timeline-point-with-image-top} + (#{$rpl-timeline-sidebar-size}/2));
        }

        &:first-child {
          &::after {
            height: 100%;
            top: calc(#{$rpl-timeline-point-with-image-top} + (#{$rpl-timeline-sidebar-size}/2));
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
      margin: -$rpl-timeline-item-title-height 0 0;

      .rpl-link {
        @include rpl_text_color($rpl-timeline-item-title-text-color);
        text-decoration: underline;

        &:hover {
          @include rpl_text_color($rpl-timeline-active-color);
          text-decoration: none;
        }
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
