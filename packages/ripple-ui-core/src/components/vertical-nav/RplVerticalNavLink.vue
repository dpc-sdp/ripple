<script setup lang="ts">
interface Props {
  text: string
  href: string
  active?: boolean
  showChildIcon?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
  showChildIcon: false
})
</script>

<template>
  <RplLink
    :url="href"
    :class="{
      'rpl-vertical-nav__item': true,
      'rpl-vertical-nav__item--active': active,
      'rpl-vertical-nav__link': true,
      'rpl-u-focusable-block': true
    }"
  >
    <span v-if="showChildIcon" class="rpl-icon--child"></span>
    <span>{{ text }}</span>
  </RplLink>
</template>
