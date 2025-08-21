<template>
  <TideTideSearchListing :site="site as any" :page="page as any">
  </TideTideSearchListing>
</template>

<script setup lang="ts">
import site from '../../test/fixtures/site/vic.json'
import page from '../../test/fixtures/page/filter-date-select.json'
</script>
