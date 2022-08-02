<template>
  <div>
    <h1>{{ page.title }}</h1>
    <template
      v-for="(cmp, idx) in page.bodyComponents"
      :key="`component-${idx}`"
    >
      <component :is="cmp.component" :html="cmp.props.html"></component>
    </template>
  </div>
</template>

<script setup lang="ts">
import type TideLandingPagePage from './../types'

defineProps<{
  page: TideLandingPagePage
}>()
</script>
