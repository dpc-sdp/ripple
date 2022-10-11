<script lang="ts">
export default { name: 'RplPrimaryNavBarAction' }
</script>

<script setup lang="ts">
interface Props {
  type: string
  href: string
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  active: false
})
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__nav-bar-action': true,
      'rpl-primary-nav__nav-bar-action--toggle': props.type === 'toggle',
      'rpl-primary-nav__nav-bar-action--link': props.type === 'link',
      'rpl-primary-nav__nav-bar-action--active': props.active,
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
