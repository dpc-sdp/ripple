<script setup lang="ts">
import { ref } from 'vue'
import { usePrimaryNavFocus } from '../../../../composables/usePrimaryNavFocus'

interface Props {
  type: string
  id?: string
  href?: string | undefined
  active?: boolean
  focusKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  active: false,
  href: undefined,
  focusKey: undefined
})

const action = ref(null)

const { setFocus, forceFocus, hasQuickExit, hasUserActions } =
  usePrimaryNavFocus(action, props.focusKey)

const handleFocus = (event) => {
  if (!props.active) return

  event.preventDefault()

  if (hasQuickExit) {
    setFocus('links:exit')
    return
  } else if (hasUserActions) {
    const foundAction = forceFocus(
      '.rpl-primary-nav__mega-menu-user-action :is(a, button)'
    )

    if (foundAction) return
  }

  setFocus(
    props.focusKey === 'menu:toggle' ? 'list:home' : `list:2:${props.id}`
  )
}
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    ref="action"
    :type="type === 'toggle' ? 'button' : undefined"
    :class="{
      'rpl-primary-nav__nav-bar-action': true,
      'rpl-primary-nav__nav-bar-action--toggle': type === 'toggle',
      'rpl-primary-nav__nav-bar-action--link': type === 'link',
      'rpl-primary-nav__nav-bar-action--active': active,
      'rpl-type-label-small': true,
      'rpl-type-weight-bold': true,
      'rpl-u-focusable-block': true
    }"
    :href="type === 'toggle' ? undefined : href"
    @keydown.tab.exact="handleFocus"
  >
    <span class="rpl-primary-nav__nav-bar-action-wrapper">
      <slot></slot>
    </span>
  </component>
</template>
