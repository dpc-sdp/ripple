<template>
  <figure class="rpl-document-link">
    <a class="rpl-document-link__link" :aria-label="`${name} File type: ${extension}. Size: ${filesize}`" :href="url" :download="!isExternalLink" :target="isExternalLink ? '_blank' : false">
      <rpl-icon class="rpl-document-link__icon" :symbol="icon" color="primary" size="l" />
      <div class="rpl-document-link__info">
        <span class="rpl-document-link__title">{{name}}</span>
        <div class="rpl-document-link__meta">
          <span v-if="extension" class="rpl-document-link__type">{{extension}}</span>
          <span v-if="filesize" class="rpl-document-link__size" :class="{'rpl-document-link__size--seperator': extension && filesize}">{{filesize}}</span>
        </div>
      </div>
    </a>
    <figcaption class="rpl-document-link__caption" v-if="caption">{{caption}}</figcaption>
  </figure>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { isExternalUrl } from '@dpc-sdp/ripple-global/utils/helpers.js'

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
    icon () {
      switch (this.extension) {
        case 'pdf':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'csv':
        case 'txt':
        case 'ppt':
        case 'pptx':
        case 'dot':
        case 'dotm':
        case 'dotx':
        case 'zip':
        case 'ics':
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

  $rpl-document-link-title-ruleset: ('xs', 1em, 'semibold');
  $rpl-document-link-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-document-link-meta-type-ruleset: ('xxs', 1em, 'medium');
  $rpl-document-link-meta-color: mix(rpl_color('dark_neutral'), rpl_color('white'), 93%) !default;
  $rpl-document-link-meta-margin-top: $rpl-space;
  $rpl-document-link-meta-separator-color: mix(rpl_color('mid_neutral_1'), rpl_color('white'), 93%) !default;
  $rpl-document-link-caption-ruleset: ('xs', 1em, 'semibold') !default;
  $rpl-document-link-caption-margin-top: $rpl-space-2 !default;
  $rpl-document-link-margin: $rpl-space-2 0 !default;

  .rpl-document-link {
    margin: $rpl-document-link-margin;

    &__link {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      line-height: 1;
      text-decoration: none;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-document-link-title-ruleset);
      color: $rpl-document-link-title-color;
    }

    &__icon {
      flex: 0 0 30px;
    }

    &__info {
      margin-left: rem(11px);
    }

    &__meta {
      @include rpl_typography_ruleset($rpl-document-link-meta-type-ruleset);
      color: $rpl-document-link-meta-color;
      text-transform: uppercase;
      margin-top: $rpl-document-link-meta-margin-top;
    }

    &__size{
      &--seperator {
        &::before {
          content: '|';
          padding: 0 $rpl-space;
          color: $rpl-document-link-meta-separator-color;
        }
      }
    }

    &__caption {
      @include rpl_typography('body_small');
      margin-top: $rpl-document-link-caption-margin-top;
    }
  }
</style>
