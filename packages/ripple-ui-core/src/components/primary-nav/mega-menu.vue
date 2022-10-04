<script lang="ts">
export default { name: 'RplPrimaryMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryMegaMenuList from './mega-menu-list.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  items: RplPrimaryNavItem[]
  isItemExpanded: (id: string) => boolean
  toggleItem: (id: string) => void
}

const props = withDefaults(defineProps<Props>(), {})

const level2ActiveItem = computed(() => {
  return props.items?.find((item) => props.isItemExpanded(item.id))
})

const level3ActiveItem = computed(() => {
  return level2ActiveItem.value?.items?.find((item) =>
    props.isItemExpanded(item.id)
  )
})

const level4ActiveItem = computed(() => {
  return level3ActiveItem.value?.items?.find((item) =>
    props.isItemExpanded(item.id)
  )
})
</script>

<template>
  <div class="rpl-primary-nav__mega-menu rpl-grid">
    <!-- Level 1 - Only visible on mobile -->
    <RplPrimaryMegaMenuList
      v-if="props.items.length"
      level="1"
      :items="props.items ? props.items : []"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    />

    <!-- Section title -->
    <div
      v-if="level2ActiveItem"
      class="
        rpl-primary-nav__mega-menu-section-title
        rpl-col-12 rpl-type-h3-fixed rpl-col-12-l rpl-col-3-xl
      "
    >
      {{ level2ActiveItem.text }}
    </div>

    <!-- Level 2 -->
    <RplPrimaryMegaMenuList
      v-if="level2ActiveItem?.items?.length"
      level="2"
      :parent="level2ActiveItem"
      :items="level2ActiveItem.items ? level2ActiveItem.items : []"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    />

    <!-- Level 3 -->
    <RplPrimaryMegaMenuList
      v-if="level3ActiveItem?.items?.length"
      level="3"
      :parent="level3ActiveItem"
      :items="level3ActiveItem.items ? level3ActiveItem.items : []"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    />

    <!-- Level 4 -->
    <RplPrimaryMegaMenuList
      v-if="level4ActiveItem?.items?.length"
      level="4"
      :parent="level4ActiveItem"
      :items="level4ActiveItem.items ? level4ActiveItem.items : []"
      :is-item-expanded="isItemExpanded"
      :toggle-item="toggleItem"
    />
  </div>
</template>
