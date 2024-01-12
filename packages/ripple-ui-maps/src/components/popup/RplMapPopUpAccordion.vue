<template>
  <RplMapPopUpAccordionItem
    v-for="(feature, i) in features"
    :key="i"
    :feature="feature"
  >
    <slot name="feature" :feature="feature" />
  </RplMapPopUpAccordionItem>
</template>

<script setup lang="ts">
import RplMapPopUpAccordionItem from './RplMapPopUpAccordionItem.vue'

interface Props {
  features: any[]
}

withDefaults(defineProps<Props>(), {
  features: () => []
})
</script>
<style src="./RplMapPopUp.css" />
