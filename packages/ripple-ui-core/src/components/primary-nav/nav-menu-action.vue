<script lang="ts">
export default { name: 'RplPrimaryNavMenuAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplPrimaryNavItem } from './constants'
import RplIcon from '../icon/icon.vue'

interface Props {
  item: RplPrimaryNavItem
  isItemExpanded?: (id: string) => boolean
  toggleItem?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  isItemExpanded: undefined,
  toggleItem: undefined
})

const type = computed(() => {
  return props.item.items ? 'toggle' : 'link'
})

const clickHandler = (id: string) => {
  if (type.value == 'toggle') {
    props.toggleItem(id)
  }
}
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__nav-menu-action': true,
      'rpl-primary-nav__nav-menu-action--toggle': type === 'toggle',
      'rpl-primary-nav__nav-menu-action--link': type === 'link',
      'rpl-primary-nav__nav-menu-action--active': isItemExpanded
        ? isItemExpanded(props.item.id)
        : false,
      'rpl-type-p-small': true
    }"
    :href="type == 'link' ? props.item.href : undefined"
    @click="clickHandler(props.item.id)"
  >
    <span>{{ props.item.text }}</span>
    <span class="rpl-primary-nav__nav-menu-action-icon">
      <RplIcon v-if="type === 'toggle'" name="icon-chevron-right" size="xs" />
    </span>
  </component>
</template>
