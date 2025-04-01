<script setup lang="ts">
import RplIcon from '../icon/RplIcon.vue'

interface Props {
  url: string
  icon: string
}

withDefaults(defineProps<Props>(), {
  icon: 'icon-arrow-right'
})
</script>

<template>
  <li class="rpl-link-list-item">
    <RplLink class="rpl-link-list-item__link rpl-u-focusable-within" :url="url">
      <span
        class="rpl-link-list-item__label rpl-type-h4 rpl-u-focusable-inline"
      >
        <slot />
      </span>
      <RplIcon class="rpl-link-list-item__icon" :name="icon" />
    </RplLink>
  </li>
</template>

<style src="./RplLinkList.css" />
