<template>
  <div class="rpl-links-and-copyright">
    <ul class="rpl-links-and-copyright__links">
      <li v-for="(link, index) in links" :key="index">
        <rpl-link :href="link.url" :target="link.target">{{ link.text }}</rpl-link>
      </li>
    </ul>
    <div class="rpl-links-and-copyright__copyright" v-html="copyright">
    </div>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'

export default {
  components: {
    RplLink
  },
  props: {
    links: Array,
    copyright: String
  }
}
</script>
