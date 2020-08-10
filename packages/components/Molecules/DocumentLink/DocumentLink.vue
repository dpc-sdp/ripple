<template>
  <figure class="rpl-document-link">
    <a class="rpl-document-link__link" :aria-label="`${name} File type: ${extension}. Size: ${filesize}`" :href="url" :download="isExternalLink ? false : ''" :target="isExternalLink ? '_blank' : false">
      <rpl-icon class="rpl-document-link__icon" :symbol="icon" color="primary" size="l" />
      <div class="rpl-document-link__info">
        <span class="rpl-document-link__title">{{nameDecoded}}</span>
        <div class="rpl-document-link__meta">
          <span v-if="extension" class="rpl-document-link__type">{{extension}}</span>
          <span v-if="filesize" class="rpl-document-link__size" :class="{'rpl-document-link__size--seperator': extension && filesize}">{{filesize}}</span>
        </div>
      </div>
    </a>
    <figcaption class="rpl-document-link__caption" v-if="caption" v-html="caption"></figcaption>
  </figure>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { isExternalUrl, decodeSpecialCharacters } from '@dpc-sdp/ripple-global/utils/helpers.js'

export default {
  name: 'RplDocumentLink',
  components: { RplIcon },
  props: {
    name: String,
    caption: String,
    url: String,
    extension: String,
    filesize: String
  },
  computed: {
    nameDecoded: function () {
      // TODO: This is a temporary fix.
      // In Markup component, We can't avoid taking HTML encoded link text from CMS and feeding them into the text icon.
      // We may just change all link text to HTML to solve this issue eventally.
      return decodeSpecialCharacters(this.name)
    },
    icon () {
      switch (this.extension) {
        case 'ai':
        case 'csv':
        case 'doc':
        case 'docx':
        case 'dot':
        case 'dotm':
        case 'dotx':
        case 'eps':
        case 'ics':
        case 'indd':
        case 'pdf':
        case 'ppt':
        case 'pptx':
        case 'tif':
        case 'txt':
        case 'xls':
        case 'xlsx':
        case 'zip':
          return this.extension
        default:
          return 'document'
      }
    },
    isExternalLink () {
      return isExternalUrl(this.url, this.rplOptions.hostname)
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/document-link";

  $rpl-document-link-caption-color: rpl_color('extra_dark_neutral') !default;
  $rpl-document-link-meta-type-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-document-link-meta-color: mix(rpl_color('dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-document-link-meta-margin-top: $rpl-space !default;
  $rpl-document-link-meta-separator-color: mix(rpl_color('mid_neutral_1'), rpl_color('white'), 93%) !default;
  $rpl-document-link-caption-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-document-link-caption-margin-top: $rpl-space-2 !default;
  $rpl-document-link-margin: $rpl-space-2 0 !default;

  .rpl-document-link {
    $root: &;
    margin: $rpl-document-link-margin;
    max-width: $rpl-content-max-width;

    &__link {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      line-height: 1;
      text-decoration: none;

      &:hover,
      &:focus {
        #{$root}__title {
          @include rpl_text_color($rpl-document-link-title-color-hover);
          text-decoration: underline;
        }
      }
    }

    &__title {
      @include rpl_typography_ruleset($rpl-document-link-title-ruleset);
      @include rpl_text_color($rpl-document-link-title-color);
    }

    &__icon {
      flex: $rpl-document-link-icon-flex;
    }

    &__info {
      margin-left: rem(11px);
    }

    &__meta {
      @include rpl_typography_ruleset($rpl-document-link-meta-type-ruleset);
      @include rpl_text_color($rpl-document-link-meta-color);
      text-transform: uppercase;
      margin-top: $rpl-document-link-meta-margin-top;
    }

    &__size{
      &--seperator {
        &::before {
          @include rpl_text_color($rpl-document-link-meta-separator-color);
          content: '|';
          padding: 0 $rpl-space;
        }
      }
    }

    &__caption {
      @include rpl_typography('body_small');
      @include rpl_text_color($rpl-document-link-caption-color);
      margin-top: $rpl-document-link-caption-margin-top;
    }
  }
</style>
