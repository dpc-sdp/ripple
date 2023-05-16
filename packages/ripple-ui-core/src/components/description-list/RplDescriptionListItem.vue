<script setup lang="ts">
interface Props {
  inline?: boolean
  term: string
}

withDefaults(defineProps<Props>(), {
  inline: false,
  items: () => []
})
</script>

<template>
  <div v-if="inline" class="rpl-description-list__inline-wrap">
    <dt class="rpl-description-list__term">{{ term }}</dt>
    <dd class="rpl-description-list__description"><slot /></dd>
  </div>
  <template v-else>
    <dt class="rpl-description-list__term">{{ term }}</dt>
    <dd class="rpl-description-list__description"><slot /></dd>
  </template>
</template>

<style src="./RplDescriptionList.css" />
