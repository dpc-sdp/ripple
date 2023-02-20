<script setup lang="ts">
import type { RplDescriptionListItem } from './constants'

interface Props {
  inline?: boolean
  items: Array<RplDescriptionListItem>
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
      <div v-if="inline" class="rpl-description-list__inline-wrap">
        <dt class="rpl-description-list__term">{{ row.term }}</dt>
        <dd class="rpl-description-list__description">{{ row.description }}</dd>
      </div>
      <template v-else>
        <dt class="rpl-description-list__term">{{ row.term }}</dt>
        <dd class="rpl-description-list__description">{{ row.description }}</dd>
      </template>
    </template>
  </dl>
</template>

<style src="./RplDescriptionList.css" />
