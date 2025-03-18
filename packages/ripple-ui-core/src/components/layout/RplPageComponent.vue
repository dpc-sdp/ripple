<script setup lang="ts">
import useEventContext from '../../composables/useEventContext'

export interface Props {
  id?: string
  title?: string
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  title: '',
  fullWidth: false
})

useEventContext({ id: props?.id, name: props?.title, mode: '' })
</script>

<template>
  <div
    :id="id"
    :class="{
      'rpl-page-component': true,
      'rpl-page-component--full-width': fullWidth
    }"
  >
    <h2
      v-if="title"
      class="rpl-type-h2 rpl-u-margin-b-2"
      data-cy="page-component-title"
    >
      {{ title }}
    </h2>
    <slot></slot>
  </div>
</template>

<style src="./RplPageComponent.css" />
