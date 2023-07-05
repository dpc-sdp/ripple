<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  IRplPrimaryNavItem,
  IRplPrimaryNavActiveItems,
  RplPrimaryNavToggleItemOptions
} from '../../constants'
import RplIcon from '../../../icon/RplIcon.vue'
import { usePrimaryNavFocus } from '../../../../composables/usePrimaryNavFocus'
import {
  useRippleEvent,
  rplEventPayload
} from '../../../../composables/useRippleEvent'

interface Props {
  item: IRplPrimaryNavItem
  parent?: string
  type: 'toggle' | 'link'
  level: 1 | 2 | 3 | 4
  position?: 'first' | 'last'
  activeNavItems?: IRplPrimaryNavActiveItems
  toggleItem?: (...args: RplPrimaryNavToggleItemOptions) => void
}

const props = withDefaults(defineProps<Props>(), {
  parent: undefined,
  position: undefined,
  activeNavItems: undefined,
  toggleItem: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const action = ref(null)

const { setFocus, navCollapsed } = usePrimaryNavFocus(
  action,
  `list:${props.level}:${props.item.id}`
)

const { emitRplEvent } = useRippleEvent('rpl-primary-nav', emit)

const clickHandler = (item: IRplPrimaryNavItem) => {
  if (props.type == 'toggle' && props.level != 4) {
    props.toggleItem(props.level, item)
  }

  if (props.type == 'link') {
    emitRplEvent(
      'navigate',
      {
        action: 'click',
        value: props.item.url,
        text: props.item.text,
        type: 'nav'
      },
      { global: true }
    )
  }
}

const focusHandler = (event) => {
  const next = props.level + 1
  const previous = props.level - 1

  if (event.shiftKey && props.position === 'first') {
    event.preventDefault()
    props.toggleItem(previous, props.item)
    setFocus(`list:${previous}:${props.item.id}`)
  } else if (!event.shiftKey && isActive.value && props.item?.items) {
    event.preventDefault()
    setFocus(`list:${next}:${props.item.id}`)
  } else if (!event.shiftKey && props.position === 'last') {
    event.preventDefault()
    props.toggleItem(previous, props.activeNavItems?.['level' + previous])
    setFocus(
      navCollapsed && props.level === 1
        ? 'menu:toggle'
        : `list:${previous}:${props?.parent}`
    )
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
    :is="type === 'toggle' ? 'button' : 'RplLink'"
    ref="action"
    :class="{
      'rpl-primary-nav__mega-menu-action': true,
      'rpl-primary-nav__mega-menu-action--toggle': type === 'toggle',
      'rpl-primary-nav__mega-menu-action--link': type === 'link',
      'rpl-primary-nav__mega-menu-action--active': isActive,
      'rpl-u-focusable-block': true,
      'rpl-type-p-small': true
    }"
    :url="type == 'link' ? item.url : undefined"
    @click="clickHandler(item)"
    @keydown.tab="focusHandler"
  >
    <span class="rpl-primary-nav__mega-menu-action-text">{{ item.text }}</span>
    <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-l-5">
      <RplIcon v-if="type === 'toggle'" name="icon-chevron-right" size="xs" />
    </span>
  </component>
</template>
