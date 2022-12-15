<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenuAction' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RplPrimaryNavItem, RplPrimaryNavActiveItems } from '../../constants'
import RplIcon from '../../../icon/icon.vue'

interface Props {
  item: RplPrimaryNavItem
  type: 'toggle' | 'link'
  level?: 1 | 2 | 3 | 4
  activeNavItems?: RplPrimaryNavActiveItems
  toggleItem?: (level: 1 | 2 | 3, item: RplPrimaryNavItem) => void
}

const props = withDefaults(defineProps<Props>(), {
  level: undefined,
  activeNavItems: undefined,
  toggleItem: undefined
})

const clickHandler = (item: RplPrimaryNavItem) => {
  if (props.type == 'toggle' && props.level != 4) {
    props.toggleItem(props.level, item)
  }
}

const isActive = computed(() => {
  if (
    props.level &&
    props.activeNavItems &&
    props.activeNavItems['level' + props.level]?.id == props.item.id
  ) {
    return true
  }

  return false
})
</script>

<template>
  <component
    :is="type === 'toggle' ? 'button' : 'a'"
    :class="{
      'rpl-primary-nav__mega-menu-action': true,
      'rpl-primary-nav__mega-menu-action--toggle': type === 'toggle',
      'rpl-primary-nav__mega-menu-action--link': type === 'link',
      'rpl-primary-nav__mega-menu-action--active': isActive,
      'rpl-u-focusable-block': true,
      'rpl-type-p-small': true
    }"
    :href="type == 'link' ? item.url : undefined"
    @click="clickHandler(item)"
  >
    <span class="rpl-primary-nav__mega-menu-action-text">{{ item.text }}</span>
    <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-l-5">
      <RplIcon v-if="type === 'toggle'" name="icon-chevron-right" size="xs" />
    </span>
  </component>
</template>
