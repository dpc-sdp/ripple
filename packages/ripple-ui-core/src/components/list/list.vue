<script lang="ts">
export default { name: 'RplList' }
</script>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { RplListTypes, RplListItemArray } from './constants'
import RplIcon from '../icon/icon.vue'
import RplList from '../list/list.vue'
import RplTextLink from '../text-link/text-link.vue'

const props = defineProps({
  items: {
    type: Array as PropType<typeof RplListItemArray[]>,
    default: () => []
  },
  type: {
    type: String as PropType<typeof RplListTypes[number]>,
    default: 'ul'
  },
  itemClass: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  }
})

const componentPrefix = 'rpl-list'

const itemClasses = computed(() => {
  const classes = [`${componentPrefix}__item`]
  if (props.itemClass) classes.push(props.itemClass)
  return classes.join(' ')
})

const containerClasses = computed(() => {
  const classes = [`${componentPrefix}__items`]
  if (props.containerClass) classes.push(props.containerClass)
  return classes.join(' ')
})
</script>

<template>
  <component :is="type" v-if="items.length > 0" :class="containerClasses">
    <li v-for="(item, index) of items" :key="index" :class="itemClasses">
      <RplTextLink
        v-if="item.url"
        :url="item.url"
        :class="`${componentPrefix}__link`"
      >
        <RplIcon
          v-if="item.icon"
          :name="item.icon"
          :class="`${componentPrefix}__icon`"
        ></RplIcon
        ><span :class="`${componentPrefix}__label`">{{ item.text }}</span>
      </RplTextLink>
      <RplList
        v-if="item.items"
        :items="item.items"
        :component-prefix="componentPrefix"
        :item-class="itemClass"
        :container-class="`${componentPrefix}__items--sub`"
      ></RplList>
    </li>
  </component>
</template>
