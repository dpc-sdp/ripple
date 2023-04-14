<script setup lang="ts">
import { ref } from 'vue'
import RplButton from '../../../button/RplButton.vue'
import { usePrimaryNavFocus } from '../../../../composables/usePrimaryNavFocus'

interface Props {
  url?: string
  label?: string
  parent?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://www.google.com',
  label: 'Quick Exit',
  parent: undefined
})

const exit = ref(null)

const { setFocus, navCollapsed } = usePrimaryNavFocus(exit, 'links:exit')

const clickHandler = () => {
  const newTab = window.open(props.url, '_blank')

  if (newTab) {
    newTab.focus()
  }
}

const handleBackFocus = (event) => {
  // Only hijack tabbing if the quick exit is within a menu
  if (props.parent || navCollapsed) {
    event.preventDefault()
    setFocus(navCollapsed ? 'menu:toggle' : `list:1:${props?.parent}`)
  }
}
</script>

<template>
  <RplButton
    ref="exit"
    el="a"
    :url="url"
    :label="label"
    variant="destructive"
    @click="clickHandler()"
    @keydown.shift.tab.exact="handleBackFocus"
  />
</template>
