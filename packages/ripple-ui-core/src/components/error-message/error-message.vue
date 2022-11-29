<script lang="ts">
export default { name: 'RplErrorMessage' }
</script>

<script setup lang="ts">
import { RplLink } from '../../lib/constants'
import RplButton from '../button/button.vue'

interface Props {
  title: string
  intro?: string
  link?: RplLink
}

withDefaults(defineProps<Props>(), {
  intro: undefined,
  link: undefined
})
</script>

<template>
  <div class="rpl-error-message">
    <h1 class="rpl-error-message__title rpl-type-weight-bold">
      {{ title }}
    </h1>
    <h2 v-if="intro" class="rpl-error-message__intro rpl-type-p-large">
      {{ intro }}
    </h2>
    <div v-if="$slots.default" class="rpl-error-message__body rpl-type-p">
      <slot></slot>
    </div>
    <RplButton
      v-if="link"
      el="a"
      class="rpl-error-message__button"
      :url="link.url"
    >
      {{ link.text }}
    </RplButton>
  </div>
</template>

<style src="./error-message.css" />
