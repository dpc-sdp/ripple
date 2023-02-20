<script setup lang="ts">
import { IRplListItemArray } from '../list/constants'
import RplList from '../list/RplList.vue'

interface Props {
  title?: string
  items?: IRplListItemArray[]
}

withDefaults(defineProps<Props>(), {
  title: 'On this page',
  items: () => []
})
</script>

<template>
  <div class="rpl-in-page-navigation">
    <h3 class="rpl-in-page-navigation__title rpl-type-h3">
      {{ title }}
    </h3>
    <RplList :items="items" item-class="rpl-type-p-small"></RplList>
  </div>
</template>

<style src="./RplInPageNavigation.css" />
