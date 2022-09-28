<script lang="ts">
export default { name: 'RplPrimaryNavMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplPrimaryNavMenuList from './nav-menu-list.vue'
import { RplPrimaryNavItem } from './constants'

interface Props {
  item: RplPrimaryNavItem
}

const props = withDefaults(defineProps<Props>(), {})

const level2ActiveItem = computed(() => {
  return props.item.items?.find((item) => item.active)
})

const level3ActiveItem = computed(() => {
  return level2ActiveItem.value?.items?.find((item) => item.active)
})
</script>

<template>
  <div class="rpl-primary-nav__nav-menu">
    <div class="rpl-primary-nav__nav-menu-section-title rpl-type-h3-fixed">
      {{ props.item.text }}
    </div>

    <!-- Level 2 -->
    <div
      class="
        rpl-primary-nav__nav-menu-column
        rpl-primary-nav__nav-menu-column--level-2
      "
    >
      <RplPrimaryNavMenuList
        :parent="props.item"
        :items="props.item.items ? props.item.items : []"
      />
    </div>

    <!-- Level 3 -->
    <div
      v-if="level2ActiveItem?.items?.length"
      class="
        rpl-primary-nav__nav-menu-column
        rpl-primary-nav__nav-menu-column--level-3
      "
    >
      <RplPrimaryNavMenuList
        :parent="props.item"
        :items="props.item.items ? props.item.items : []"
      />
    </div>

    <!-- Level 4 -->
    <div
      v-if="level3ActiveItem?.items?.length"
      class="
        rpl-primary-nav__nav-menu-column
        rpl-primary-nav__nav-menu-column--level-4
      "
    >
      <RplPrimaryNavMenuList
        :parent="props.item"
        :items="props.item.items ? props.item.items : []"
      />
    </div>
  </div>
</template>
