<template>
  <div v-if="page">
    <RplButton label="tests" :theme="'secondary'" />
    <component :is="`Tide${page.type}Page`" :page="page" />
    {{ site }}
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
const site = await useTideSite(4)
const page = await useTidePage()
</script>
