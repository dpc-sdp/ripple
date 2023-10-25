<script setup lang="ts">
import { IRplListItemArray } from '../list/constants'
import RplList from '../list/RplList.vue'

interface Props {
  items: IRplListItemArray[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>

<template>
  <div class="rpl-sitemap">
    <RplList
      :withLinkIds="true"
      :items="items"
      containerClass="rpl-sitemap-list"
      itemClass="rpl-sitemap-item"
    />
  </div>
</template>

<style src="./RplSitemap.css" />
