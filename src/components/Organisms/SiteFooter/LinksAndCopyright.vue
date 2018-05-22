<template>
  <div class="rpl-links-and-copyright">
    <ul class="rpl-links-and-copyright__links">
      <li v-for="(link, index) in links" :key="index">
        <rpl-link :href="link.link">{{ link.text }}</rpl-link>
      </li>
    </ul>
    <p class="rpl-links-and-copyright__copyright">
      {{ copyright }}
    </p>
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
