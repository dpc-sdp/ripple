<script lang="ts">
/* eslint-disable vue/no-v-html */
import { defineComponent } from 'vue'
const iconImports = import.meta.glob(`./../../assets/icons/core/*.svg`)

const iconNames = Object.keys(iconImports)
const icons = []
for (let i = 0; i < iconNames.length; i++) {
  const rawSvg = await iconImports[`${iconNames[i]}`]().then((m) => m.default)
  const iconName = `${iconNames[i]}`
    .replace('./../../assets/icons/core/', '')
    .replace('.svg', '')
  const def = rawSvg
    .replace('<svg', `<symbol id="${iconName}"`)
    .replace('</svg>', '</symbol>')
    .replace(/<defs>(.+)<\/defs>/, '')
  icons.push(def)
}
export default defineComponent({
  name: 'RplIconSprite',
  setup() {
    return {
      icons
    }
  }
})
</script>

<template>
  <svg v-if="icons && icons.length > 0" id="rpl-icon-sprite" aria-hidden="true">
    <defs v-for="(def, i) in icons" :key="`icon-def-${i}`" v-html="def"></defs>
  </svg>
</template>

<style>
#rpl-icon-sprite {
  display: none;
}
</style>
