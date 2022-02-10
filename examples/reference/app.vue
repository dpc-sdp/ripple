<template>
  <div>
    <test></test>
    <RplButton label="tests" :theme="'secondary'" />
    <RplAccordion title="test" :panels="panels"></RplAccordion>
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const panels = [
  { title: 'test1', content: 'dsds  asda sd', isOpen: true, id: 1 },
  { title: 'test2', content: 'sdsadasdasd', isOpen: true, id: 2 },
  { title: 'test3', content: 'sd', isOpen: true, id: 3 }
]
</script>
