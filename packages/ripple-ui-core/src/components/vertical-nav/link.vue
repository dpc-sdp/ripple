<script lang="ts">
export default { name: 'RplVerticalNavLink' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  text: {
    type: String as PropType<string>,
    required: true
  },
  href: {
    type: String as PropType<string>,
    required: true
  },
  showChildIcon: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <a
    :href="href"
    class="
      rpl-vertical-nav__item
      rpl-vertical-nav__link
      rpl-u-focusable
    "
  >
    <span
      v-if="showChildIcon"
      class="rpl-vertical-nav__link-child-icon"
    ></span>
    <span>{{ text }}</span>
  </a>
</template>
