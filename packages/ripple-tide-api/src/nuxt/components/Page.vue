<template>
  <div>
    <RplIconSprite />
    <header>
      <slot name="header"> {{ site.name }} </slot>
    </header>
    <div v-if="page">
      <h1>Tide Page</h1>
      <RplButton label="tests" :theme="'secondary'" />
      <component :is="`Tide${page.type}Page`" :page="page" />
      {{ site }}
    </div>
    <div v-else>Error</div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
const config = useRuntimeConfig()
const route = useRoute()
const [{ data: site }, { data: page }] = await Promise.all([
  useTideSite(config.SITEID),
  useTidePage(route.path)
])
</script>
4
