<script setup lang="ts">
/* eslint-disable vue/no-v-html */
const assetDir = './../../assets/icons/custom/'
// This is not a mistake - you must have a full path for glob import to work
const customIcons = import.meta.glob(`./../../assets/icons/custom/*.svg`)
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})
const isCustom = customIcons.hasOwnProperty(`${assetDir}${props.name}.svg`)
const rawSvg = isCustom
  ? await customIcons[`${assetDir}${props.name}.svg`]().then((m) => m.default)
  : false
</script>

<template>
  <div v-if="isCustom && rawSvg" v-html="rawSvg"></div>
  <svg v-else class="rpl-icon" :class="`rpl-icon--${name}`" aria-hidden="true">
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style>
@import './icon.css';
</style>
