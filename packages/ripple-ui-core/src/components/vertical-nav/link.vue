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
  active: {
    type: Boolean,
    default: false
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
    :class="{
      'rpl-vertical-nav__item': true,
      'rpl-vertical-nav__item--active': active,
      'rpl-vertical-nav__link': true,
      'rpl-u-focusable': true
    }"
  >
    <span v-if="showChildIcon" class="rpl-icon--child"></span>
    <span>{{ text }}</span>
  </a>
</template>
