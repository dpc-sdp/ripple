<script lang="ts">
export default { name: 'RplPrimaryNavBarAction' }
</script>

<script setup lang="ts">
interface Props {
  type: string
  href?: string
}

const props = withDefaults(defineProps<Props>(), {
  href: undefined
})
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__nav-bar-action': true,
      'rpl-primary-nav__nav-bar-action--toggle': props.type === 'toggle',
      'rpl-primary-nav__nav-bar-action--link': props.type === 'link',
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
