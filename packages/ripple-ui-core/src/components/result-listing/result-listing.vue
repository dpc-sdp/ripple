<script lang="ts">
export default { name: 'RplResultListing' }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/text-link.vue'
import { useAccessibleContainer } from '../../composables/useAccessibleContainer'
import { computed } from 'vue'

interface Props {
  title: string
  url: string
  content?: string
  updated?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: undefined,
  updated: undefined
})

const { container, trigger } = useAccessibleContainer()

const displayUrl = computed(() => props.url.replace('https://', ''))
</script>

<template>
  <div ref="container" class="rpl-result-listing">
    <div v-if="$slots.meta" class="rpl-result-listing__meta rpl-type-p-small">
      <slot name="meta"></slot>
    </div>
    <h2 class="rpl-result-listing__title rpl-type-h3">
      <RplTextLink ref="trigger" :url="url">
        {{ title }}
      </RplTextLink>
    </h2>
    <div v-if="url" class="rpl-result-listing__url rpl-type-p-small">
      {{ displayUrl }}
    </div>
    <div v-if="$slots.details" class="rpl-result-listing__details rpl-type-p">
      <slot name="details"></slot>
    </div>
    <div
      v-if="content"
      class="rpl-result-listing__body rpl-type-p"
      v-html="content"
    />
    <p v-if="updated" class="rpl-result-listing__body rpl-type-p-small">
      Updated: {{ updated }}
    </p>
  </div>
</template>

<style src="./result-listing.css" />
