<template>
  <ul class="rpl-featured-news-list">
    <li v-for="(item, index) in list" :key="index" class="rpl-featured-news-list__item">
      <rpl-card-navigation-featured v-if="index === 0" :image="item.image" :date="item.date" :topic="item.topic" :title="item.title" :summary="item.summary" :url="item.link.url" />
      <rpl-card-image-navigation v-else :image="item.image" :date="item.date" :topic="item.topic" :title="item.title" :summary="item.summary" :link="item.link" />
    </li>
  </ul>
</template>

<script>
import { RplCardImageNavigation, RplCardNavigationFeatured } from '@dpc-sdp/ripple-card'

export default {
  name: 'RplFeaturedNews',
  components: {
    RplCardImageNavigation,
    RplCardNavigationFeatured
  },
  props: {
    list: Array
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-featured-news-list {
    list-style: none;
    padding: 0;
    margin: 0;

    &__item {
      margin-bottom: $rpl-space * 5;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
