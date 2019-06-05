<template>
  <ul class="rpl-sitemap-menu__list" :class="'rpl-sitemap-menu__list--depth-' + depth">
    <li class="rpl-sitemap-menu__list-item" v-for="(list, index) in menu" :key="index">
      <rpl-link class="rpl-sitemap-menu__link" :class="'rpl-sitemap-menu__link--depth-' + depth" :href="list.url" :target="list.target">{{ list.text }}</rpl-link>
      <rpl-sitemap-menu v-if="list.children" :menu="list.children" :depth="depth + 1"></rpl-sitemap-menu>
    </li>
  </ul>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  name: 'RplSitemapMenu',
  props: {
    menu: Array,
    depth: { type: Number, default: 0 }
  },
  components: {
    RplLink
  }
}
</script>
