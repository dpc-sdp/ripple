<template>
  <div v-if="page">
    <RplButton label="tests" :theme="'secondary'" />
    <component :is="`Tide${page.type}Page`" :page="page" />
    {{ site }}
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
const config = useRuntimeConfig()
const site = await useTideSite(config.SITEID)
const page = await useTidePage()
</script>
