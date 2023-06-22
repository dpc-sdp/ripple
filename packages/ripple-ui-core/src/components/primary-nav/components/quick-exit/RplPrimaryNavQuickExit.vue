<script setup lang="ts">
import { ref } from 'vue'
import RplButton from '../../../button/RplButton.vue'
import { usePrimaryNavFocus } from '../../../../composables/usePrimaryNavFocus'

interface Props {
  url?: string
  label?: string
  parent?: string
  variant?: 'inline' | 'fixed'
}

const props = withDefaults(defineProps<Props>(), {
  url: 'https://www.google.com',
  label: 'Quick Exit',
  parent: undefined,
  variant: 'inline'
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
  if ((props.parent || navCollapsed) && props.variant !== 'fixed') {
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
    :class="`rpl-primary-nav__quick-exit rpl-primary-nav__quick-exit--${variant}`"
    @click="clickHandler()"
    @keydown.shift.tab.exact="handleBackFocus"
  />
</template>

<style src="./RplPrimaryNavQuickExit.css" />
