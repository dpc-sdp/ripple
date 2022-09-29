<script lang="ts">
export default { name: 'RplPrimaryMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryMegaMenuList from './mega-menu-list.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  item: RplPrimaryNavItem
  isItemExpanded: (id: string) => boolean
  toggleItem: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {})

const level3ActiveItem = computed(() => {
  return props.item.items?.find((item) => props.isItemExpanded(item.id))
})

const level4ActiveItem = computed(() => {
  return level3ActiveItem.value?.items?.find((item) =>
    props.isItemExpanded(item.id)
  )
})
</script>

<template>
  <div class="rpl-primary-nav__mega-menu">
    <div class="rpl-primary-nav__mega-menu-section-title rpl-type-h3-fixed">
      {{ props.item.text }}
    </div>

    <!-- Level 2 -->
    <div
      class="
        rpl-primary-nav__mega-menu-column
        rpl-primary-nav__mega-menu-column--level-2
      "
    >
      <RplPrimaryMegaMenuList
        :parent="props.item"
        :items="props.item.items ? props.item.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />
    </div>

    <!-- Level 3 -->
    <div
      v-if="level3ActiveItem?.items?.length"
      class="
        rpl-primary-nav__mega-menu-column
        rpl-primary-nav__mega-menu-column--level-3
      "
    >
      <RplPrimaryMegaMenuList
        :parent="level3ActiveItem"
        :items="level3ActiveItem.items ? level3ActiveItem.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />
    </div>

    <!-- Level 4 -->
    <div
      v-if="level4ActiveItem?.items?.length"
      class="
        rpl-primary-nav__mega-menu-column
        rpl-primary-nav__mega-menu-column--level-4
      "
    >
      <RplPrimaryMegaMenuList
        :parent="level4ActiveItem"
        :items="level4ActiveItem.items ? level4ActiveItem.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />
    </div>
  </div>
</template>
