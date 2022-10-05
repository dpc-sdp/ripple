<script lang="ts">
export default { name: 'RplPrimaryNavMegaMenu' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
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
    return 1
  }

  if (!level3ActiveItem.value) {
    return 2
  }

  if (!level4ActiveItem.value) {
    return 3
  }

  return 4
})

const backButtonLabel = computed(() => {
  if (currentLevel.value == 4 && level3ActiveItem.value) {
    return level3ActiveItem.value.text
  }

  if (currentLevel.value == 3 && level2ActiveItem.value) {
    return level2ActiveItem.value.text
  }

  return 'Main menu'
})

const backButtonHandler = () => {
  // Go back to level 3
  if (currentLevel.value == 4 && level4ActiveItem.value) {
    props.toggleItem(level4ActiveItem.value.id)
  }

  // Go back to level 2
  if (currentLevel.value == 3 && level3ActiveItem.value) {
    props.toggleItem(level3ActiveItem.value.id)
  }

  // Go back to level 1
  if (currentLevel.value == 2 && level2ActiveItem.value) {
    props.toggleItem(level2ActiveItem.value.id)
  }
}

const sectionTitleMobile = computed(() => {
  if (currentLevel.value == 4 && level4ActiveItem.value) {
    return level4ActiveItem.value.text
  }

  if (currentLevel.value == 3 && level3ActiveItem.value) {
    return level3ActiveItem.value.text
  }

  return level2ActiveItem?.value?.text
})
</script>

<template>
  <div
    :class="`
      rpl-primary-nav__mega-menu
      rpl-primary-nav__mega-menu--current-level-${currentLevel}
    `"
  >
    <!-- Supplementary mobile links -->
    <ul class="rpl-primary-nav__supplementary-mobile-links">
      <li><RplPrimaryNavQuickExit /></li>
      <li>
        <slot name="login">
          <a
            class="
              rpl-primary-nav__mega-menu-mobile-link
              rpl-u-focusable-inline rpl-type-label-small rpl-type-weight-bold
            "
            href="/login"
          >
            <span
              class="
                rpl-primary-nav__nav-bar-icon
                rpl-primary-nav__nav-bar-icon--large
                rpl-u-margin-r-2
              "
              ><RplIcon name="icon-user-circle-filled"></RplIcon></span
            >&NoBreak;<span>Login</span>
          </a>
        </slot>
      </li>
    </ul>

    <div class="rpl-primary-nav__mega-menu-grid rpl-grid">
      <!-- Level 1 - Only visible on mobile -->
      <RplPrimaryNavMegaMenuList
        v-if="props.items.length"
        level="1"
        :items="props.items ? props.items : []"
        :is-item-expanded="isItemExpanded"
        :toggle-item="toggleItem"
      />

      <!-- Back button - Only visible on mobile -->
      <div
        v-if="currentLevel != 1"
        class="rpl-primary-nav__mega-menu-back-container rpl-col-12"
      >
        <button
          class="
            rpl-primary-nav__mega-menu-back
            rpl-type-label-small rpl-type-weight-bold
          "
          @click="backButtonHandler()"
        >
          <RplIcon
            name="icon-chevron-left"
            size="xs"
            class="rpl-u-margin-r-2"
          ></RplIcon>
          <span>{{ backButtonLabel }}</span>
        </button>
      </div>

      <!-- Section title -->
      <div
        v-if="currentLevel > 1"
        class="
          rpl-primary-nav__mega-menu-section-title
          rpl-primary-nav__mega-menu-section-title--mobile
          rpl-type-h3-fixed rpl-col-12
        "
      >
        {{ sectionTitleMobile }}
      </div>
      <div
        v-if="level2ActiveItem"
        class="
          rpl-primary-nav__mega-menu-section-title
          rpl-primary-nav__mega-menu-section-title--desktop
          rpl-type-h3-fixed rpl-col-12-l rpl-col-3-xl
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
