<template>
  <div class="rpl-complaints-list-item">
    <rpl-complaints-overview :listing="true" :title="title" :funding="funding" :audience="audience" :startdate="startdate" :enddate="enddate" :description="description" :link="link"></rpl-complaints-overview>
    <ul class="rpl-complaints-list-item__tags">
      <li class="rpl-complaints-list-item__tag" v-for="(tag, index) in tags" :key="index">
        <rpl-meta-tag :linkText="tag.linkText" :linkUrl="tag.linkUrl" />
      </li>
    </ul>
  </div>
</template>

<script>
import RplComplaintsOverview from './ComplaintsOverview'
import RplMetaTag from '@dpc-sdp/ripple-meta-tag'

export default {
  components: {
    RplComplaintsOverview,
    RplMetaTag
  },
  props: {
    title: { type: String, default: '' },
    funding: { type: Object },
    audience: { type: String, default: '' },
    startdate: { type: String, default: '' },
    enddate: { type: String, default: '' },
    description: { type: String, default: '' },
    link: { type: Object, default: null },
    tags: { type: Array, default: () => [] }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  $rpl-complaints-list-item-tag-margin-xs: 0 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-complaints-list-item-tag-margin-m: 0 $rpl-space-2 !default;

  $rpl-complaints-list-item-tags-margin-xs: 0 $rpl-space-2 $rpl-space-2 0 !default;
  $rpl-complaints-list-item-tags-margin-m: 0 $rpl-space-2 !default;

  .rpl-complaints-list-item {
    .rpl-complaints-overview__list .rpl-list__list {
      @include rpl_breakpoint('m') {
        display: flex;
        .rpl-list__list-item {
          margin-right: $rpl-space-2;

          .rpl-list__icon {
            padding-bottom: 0;
          }
          .rpl-list__text {
            padding-bottom: 0;
          }
        }
      }
    }

    &__tags {
      padding: 0;
      list-style: none;
      @include rpl_breakpoint('m') {
        display: flex;
        flex-direction: row;
      }
      @include rpl_print_hidden;
    }

    &__tag {
      margin: $rpl-complaints-list-item-tag-margin-xs;
      @include rpl_breakpoint('m') {
        margin: $rpl-complaints-list-item-tag-margin-m;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
</style>
