<script lang="ts">
export default { name: 'RplPrimaryNavQuickExit' }
</script>

<script setup lang="ts">
import RplButton from '../../../button/button.vue'

interface Props {
  url?: string
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://www.google.com',
  label: 'Quick Exit'
})

const clickHandler = () => {
  const newTab = window.open(props.url, '_blank')

  if (newTab) {
    newTab.focus()
  }
}
</script>

<template>
  <RplButton
    el="a"
    :url="url"
    :label="label"
    variant="destructive"
    @click="clickHandler()"
  />
</template>
