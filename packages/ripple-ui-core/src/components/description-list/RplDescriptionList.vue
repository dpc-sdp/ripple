<script setup lang="ts">
import type { IRplDescriptionListItem } from './constants'
import RplDescriptionListItem from './RplDescriptionListItem.vue'

interface Props {
  inline?: boolean
  items: Array<IRplDescriptionListItem>
}

withDefaults(defineProps<Props>(), {
  inline: false,
  items: () => []
})
</script>

<template>
  <dl
    :class="{
      'rpl-description-list': true,
      'rpl-description-list--inline': inline,
      'rpl-type-p': true
    }"
  >
    <template v-for="row in items" :key="row.term">
      <RplDescriptionListItem :inline="inline" :term="row.term">{{
        row.description
      }}</RplDescriptionListItem>
    </template>
    <slot />
  </dl>
</template>

<style src="./RplDescriptionList.css" />
