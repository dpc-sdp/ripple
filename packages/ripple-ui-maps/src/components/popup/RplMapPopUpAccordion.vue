<template>
  <RplMapPopUpAccordionItem
    v-for="(feature, i) in features"
    :key="i"
    :feature="feature"
    :getTitle="getTitle"
  >
    <slot name="feature" :feature="feature" />
  </RplMapPopUpAccordionItem>
</template>

<script setup lang="ts">
import RplMapPopUpAccordionItem from './RplMapPopUpAccordionItem.vue'

interface Props {
  features: any[]
  getTitle: (feature: any) => string
}

withDefaults(defineProps<Props>(), {
  features: () => []
})
</script>
<style src="./RplMapPopUp.css" />
