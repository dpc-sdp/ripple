<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenuAction' }
</script>

<script setup lang="ts">
import { RplPrimaryNavItem } from '../../constants'
import RplIcon from '../../../icon/icon.vue'

interface Props {
  item: RplPrimaryNavItem
  type: 'toggle' | 'link'
  isItemActive?: (id: string) => boolean
  toggleItem?: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  isItemActive: undefined,
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
      'rpl-primary-nav__mega-menu-action--active': isItemActive
        ? isItemActive(item.id)
        : false,
      'rpl-u-focusable-block': true,
      'rpl-type-p-small': true
    }"
    :href="type == 'link' ? item.url : undefined"
    @click="clickHandler(item.id)"
  >
    <span>{{ item.text }}</span>
    <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-l-2">
      <RplIcon v-if="type === 'toggle'" name="icon-chevron-right" size="xs" />
    </span>
  </component>
</template>
