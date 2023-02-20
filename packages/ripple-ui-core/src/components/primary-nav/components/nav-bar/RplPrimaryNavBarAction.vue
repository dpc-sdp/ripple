<script setup lang="ts">
interface Props {
  type: string
  href?: string | undefined
  active?: boolean
}

withDefaults(defineProps<Props>(), {
  active: false,
  href: undefined
})
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__nav-bar-action': true,
      'rpl-primary-nav__nav-bar-action--toggle': type === 'toggle',
      'rpl-primary-nav__nav-bar-action--link': type === 'link',
      'rpl-primary-nav__nav-bar-action--active': active,
      'rpl-type-label-small': true,
      'rpl-type-weight-bold': true,
      'rpl-u-focusable-block': true
    }"
    :href="href"
  >
    <div>
      <slot></slot>
    </div>
  </component>
</template>
