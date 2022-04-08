<script setup lang="ts">
/* eslint-disable vue/no-v-html */
const iconImports = import.meta.glob(`./../../assets/icons/core/*.svg`)

const icons = Object.keys(iconImports)
const symbols = []
for (let i = 0; i < icons.length; i++) {
  const rawSvg = await iconImports[`${icons[i]}`]().then((m) => m.default)
  const iconName = `${icons[i]}`
    .replace('./../../assets/icons/core/', '')
    .replace('.svg', '')
  const def = rawSvg
    .replace('<svg', `<symbol id="i-${iconName}"`)
    .replace('</svg>', '</symbol>')
    .replace(/<defs>(.+)<\/defs>/, '')
  symbols.push(def)
}
</script>

<template>
  <svg id="rpl-icon-sprite">
    <defs
      v-for="(def, i) in symbols"
      :key="`icon-def-${i}`"
      v-html="def"
    ></defs>
  </svg>
</template>

<style>
@import './icon.css';
</style>
