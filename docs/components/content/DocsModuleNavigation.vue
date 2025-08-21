<script setup lang="ts">
const navigation = await useModulesNavigation()
</script>

<template>
  <div v-if="navigation.length" class="doc-module-nav">
    <RplVerticalNav :items="navigation" />
  </div>
</template>

<style>
.doc-module-nav {
  .rpl-vertical-nav__item {
    font-weight: var(--rpl-type-weight-regular);
  }
}
</style>
