<script lang="ts">
export default { name: 'NavSection' }
</script>

<script setup lang="ts">
import List from '../list/list.vue'
import { NavSectionItem } from './constants'
import TextLink from '../text-link/text-link.vue'
interface Props {
  section: NavSectionItem
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="rpl-footer-nav-section">
    <h2>
      <TextLink :url="section.url">{{ section.text }}</TextLink>
    </h2>
    <List :items="section.children" />
  </div>
</template>

<style src="./nav-section.css" />
