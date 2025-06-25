<template>
  <RplContent
    data-component-type="search-listing-empty-index"
    :class="`tide-search-empty-index tide-search-empty-index--${variant}`"
  >
    <p v-if="title" :class="classes.title">
      {{ title }}
    </p>
    <p v-if="content" :class="`${classes.content}`">
      {{ content }}
    </p>
  </RplContent>
</template>

<script setup lang="ts">
import { computed } from '#imports'

interface Props {
  title?: string
  content?: string
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  title: 'There are currently no records to display.',
  content: 'Please check again later.',
  variant: 'primary'
})

const sizing = {
  primary: {
    title: 'rpl-type-h3',
    content: 'rpl-type-p'
  },
  secondary: {
    title: 'rpl-type-h4-fixed rpl-u-text-center',
    content: 'rpl-type-p-small rpl-u-text-center'
  }
}

const classes = computed(() => sizing[props.variant])
</script>

<style>
.tide-search-empty-index--secondary p {
  margin-inline: auto;
}
</style>
