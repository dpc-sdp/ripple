<script lang="ts">
export default { name: 'RplInPageNavigation' }
</script>

<script setup lang="ts">
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

interface Props {
  title?: string,
  items?: RplListItemArray[],
}

withDefaults(defineProps<Props>(), {
  title: 'On this page',
  items: () => [],
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

<style src="./in-page-navigation.css" />
