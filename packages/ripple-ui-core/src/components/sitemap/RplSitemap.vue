<script lang="ts">
export default { name: 'RplSitemap' }
</script>

<script setup lang="ts">
import { RplListItemArray } from '../list/constants'
import RplList from '../list/list.vue'

interface Props {
  items: RplListItemArray[]
}

withDefaults(defineProps<Props>(), {
  items: () => []
})
</script>

<template>
  <div class="rpl-sitemap">
    <RplList
      :items="items"
      containerClass="rpl-sitemap-list"
      itemClass="rpl-sitemap-item"
    />
  </div>
</template>

<style src="./RplSitemap.css" />
