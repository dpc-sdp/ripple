<script lang="ts">
/* eslint-disable vue/no-v-html */
import { defineComponent, PropType } from 'vue'
const assetDir = './../../assets/icons/custom/'
const customIcons = import.meta.glob(`./../../assets/icons/custom/*.svg`)

export default defineComponent({
  name: 'RplIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    theme: {
      type: String as PropType<'core' | 'accent' | 'neutral'>,
      default: 'core'
    }
  },
  data() {
    return {
      customSvg: '',
      isCustom: false
    }
  },
  async created() {
    const isCustom = customIcons.hasOwnProperty(`${assetDir}${this.name}.svg`)
    const rawSvg = isCustom
      ? await customIcons[`${assetDir}${this.name}.svg`]().then(
          (m) => m.default
        )
      : false
    this.customSvg = rawSvg
    this.isCustom = isCustom
  }
})
</script>

<template>
  <div
    v-if="isCustom && customSvg"
    class="rpl-icon"
    :class="[`rpl-icon--${name}`, `rpl-icon--theme-${theme}`]"
    v-html="customSvg"
  ></div>
  <svg
    v-else
    class="rpl-icon"
    :class="`rpl-icon--theme-${theme}`"
    aria-hidden="true"
  >
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<style>
@import './icon.css';
</style>
