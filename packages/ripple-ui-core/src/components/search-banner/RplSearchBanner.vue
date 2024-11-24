<script setup lang="ts">
import RplSearchBar from '../search-bar/RplSearchBar.vue'
import RplImage from '../image/RplImage.vue'
import { IRplImageType } from '../image/constants'

interface Props {
  title: string
  intro?: string
  image?: IRplImageType
  searchBar?: any
}

withDefaults(defineProps<Props>(), {
  intro: undefined,
  image: undefined,
  searchBar: undefined
})
</script>

<template>
  <div
    :class="{
      'rpl-search-banner': true,
      'rpl-u-screen-only': true,
      'rpl-search-banner--image': image
    }"
  >
    <div v-if="image" class="rpl-search-banner__media">
      <RplImage
        v-bind="image"
        class="rpl-search-banner__image"
        :aspect="{ xs: 'ultrawide' }"
      />
    </div>
    <div class="rpl-container">
      <div class="rpl-grid">
        <div
          :class="{
            'rpl-search-banner__search': true,
            'rpl-col-12': true,
            'rpl-col-7-m': image
          }"
        >
          <div class="rpl-search-banner__search-inner">
            <h2 class="rpl-type-h2">{{ title }}</h2>
            <p v-if="intro" class="rpl-type-p rpl-u-margin-t-2">
              {{ intro }}
            </p>
          </div>
          <slot>
            <RplSearchBar v-bind="searchBar" variant="reverse" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./RplSearchBanner.css" />
