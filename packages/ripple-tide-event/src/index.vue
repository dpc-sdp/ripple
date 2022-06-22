<template>
  <div>
    <h1>{{ page.title }}</h1>
    <p>{{ page.summary }}</p>
    <img v-if="page.image" :src="imgUrl" />
    <a v-if="page.link" :href="page.link?.url">{{ page.link.text }}</a>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { useTideImage } from '#imports'
import type TideEventPage from './../types'

const props =
  defineProps<{
    page: TideEventPage
  }>()

const imgUrl = useTideImage(props.page.image.src, 300)
</script>
