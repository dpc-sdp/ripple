<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryNavMegaMenuList from './mega-menu-list.vue'
import RplPrimaryNavQuickExit from './quick-exit.vue'
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

const currentLevel = computed(() => {
  if (!level2ActiveItem.value) {
    return '1'
  }

  if (!level3ActiveItem.value) {
    return '2'
  }

  if (!level4ActiveItem.value) {
    return '3'
  }

  return 4
})
</script>

<template>
  <div
    :class="`
      rpl-primary-nav__mega-menu
      rpl-primary-nav__mega-menu--current-level-${currentLevel}
    `"
  >
    <!-- Mobile additional links -->
    <div class="rpl-primary-nav__mega-menu-mobile-links">
      <ul>
        <li><RplPrimaryNavQuickExit /></li>
        <li>Login</li>
      </ul>
    </div>

    <div class="rpl-primary-nav__mega-menu-grid rpl-grid">
      <!-- Level 1 - Only visible on mobile -->
      <RplPrimaryNavMegaMenuList
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
      <RplPrimaryNavMegaMenuList
        v-if="level2ActiveItem?.items?.length"
        level="2"
        :parent="level2ActiveItem"
        :items="level2ActiveItem.items ? level2ActiveItem.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />

      <!-- Level 3 -->
      <RplPrimaryNavMegaMenuList
        v-if="level3ActiveItem?.items?.length"
        level="3"
        :parent="level3ActiveItem"
        :items="level3ActiveItem.items ? level3ActiveItem.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />

      <!-- Level 4 -->
      <RplPrimaryNavMegaMenuList
        v-if="level4ActiveItem?.items?.length"
        level="4"
        :parent="level4ActiveItem"
        :items="level4ActiveItem.items ? level4ActiveItem.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />
    </div>
  </div>
</template>
