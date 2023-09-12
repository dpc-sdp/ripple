<script setup lang="ts">
import { computed } from 'vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title: string
  url: string
  content?: string
  updated?: string
  dateLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  content: undefined,
  updated: undefined,
  dateLabel: 'Updated'
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-search-result', emit)

const displayUrl = computed(() => props.url.replace('https://', ''))

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props?.url,
      text: props.title
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-search-result">
    <div v-if="$slots.meta" class="rpl-search-result__meta rpl-type-p-small">
      <slot name="meta"></slot>
    </div>
    <h2 class="rpl-search-result__title rpl-type-h3">
      <RplTextLink :url="url" @click="handleClick">
        {{ title }}
      </RplTextLink>
    </h2>
    <RplTextLink
      :url="url"
      tabindex="-1"
      class="rpl-search-result__url rpl-type-p-small rpl-u-screen-only"
      @click="handleClick"
    >
      {{ displayUrl }}
    </RplTextLink>
    <div v-if="$slots.details" class="rpl-search-result__details rpl-type-p">
      <slot name="details"></slot>
    </div>
    <div
      v-if="content"
      class="rpl-search-result__body rpl-type-p"
      v-html="content"
    />
    <p v-if="updated" class="rpl-search-result__body rpl-type-p-small">
      {{ dateLabel ? `${dateLabel}: ` : '' }}{{ updated }}
    </p>
  </div>
</template>

<style src="./RplSearchResult.css" />
