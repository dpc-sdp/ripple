<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenuAction' }
</script>

<script setup lang="ts">
import { RplPrimaryNavItem } from './constants'
import RplIcon from '../icon/icon.vue'

interface Props {
  item: RplPrimaryNavItem
  type: 'toggle' | 'link'
  isItemExpanded?: (id: string) => boolean
  toggleItem?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  isItemExpanded: undefined,
  toggleItem: undefined
})

const clickHandler = (id: string) => {
  if (props.type == 'toggle') {
    props.toggleItem(id)
  }
}
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__mega-menu-action': true,
      'rpl-primary-nav__mega-menu-action--toggle': type === 'toggle',
      'rpl-primary-nav__mega-menu-action--link': type === 'link',
      'rpl-primary-nav__mega-menu-action--active': isItemExpanded
        ? isItemExpanded(props.item.id)
        : false,
      'rpl-u-focusable-block': true,
      'rpl-type-p-small': true
    }"
    :href="type == 'link' ? props.item.href : undefined"
    @click="clickHandler(props.item.id)"
  >
    <span>{{ props.item.text }}</span>
    <span class="rpl-primary-nav__mega-menu-action-icon">
      <RplIcon v-if="type === 'toggle'" name="icon-chevron-right" size="xs" />
    </span>
  </component>
</template>
