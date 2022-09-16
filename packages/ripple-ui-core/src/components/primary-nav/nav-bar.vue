<script lang="ts">
export default { name: 'RplPrimaryNavBar' }
</script>

<script setup lang="ts">
import RplIcon from '../icon/icon.vue'
import RplPrimaryNavBarAction from './nav-bar-action.vue'
import { RplPrimaryNavLogo, RplPrimaryNavItem } from './constants'

interface Props {
  primaryLogo: RplPrimaryNavLogo
  secondaryLogo?: RplPrimaryNavLogo
  items: RplPrimaryNavItem[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="rpl-primary-nav__nav-bar">
    <!-- Logos -->
    <div class="rpl-primary-nav__logos">
      <!-- Primary logo -->
      <a
        class="rpl-primary-nav__primary-logo-link rpl-u-focusable-outline"
        :href="props.primaryLogo.href"
      >
        <img
          class="rpl-primary-nav__primary-logo-image"
          :src="props.primaryLogo.src"
          :alt="props.primaryLogo.altText"
        />
      </a>

      <!-- Logo divider -->
      <div
        v-if="props.secondaryLogo"
        class="rpl-primary-nav__logo-divider"
      ></div>

      <!-- Secondary logo -->
      <a
        v-if="props.secondaryLogo"
        class="rpl-primary-nav__secondary-logo-link rpl-u-focusable-outline"
        :href="props.secondaryLogo.href"
      >
        <img
          class="rpl-primary-nav__secondary-logo-image"
          :src="props.secondaryLogo.src"
          :alt="props.secondaryLogo.altText"
        />
      </a>
    </div>

    <!-- Menu -->
    <ul class="rpl-primary-nav__nav-bar-actions-list">
      <li v-for="(item, index) in items" :key="index">
        <!-- Toggle -->
        <RplPrimaryNavBarAction v-if="item.items" type="toggle">
          <span>{{ item.text }}</span
          >&NoBreak;<span class="rpl-primary-nav__nav-bar-icon rpl-u-margin-l-2"
            ><RplIcon name="icon-chevron-down" size="xs"></RplIcon
          ></span>
        </RplPrimaryNavBarAction>

        <RplPrimaryNavBarAction v-else type="link" :href="item.href">
          <span>{{ item.text }}</span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- Login slot -->
      <li>
        <RplPrimaryNavBarAction type="link" href="#">
          <span
            class="
              rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large
              rpl-u-margin-r-2
            "
            ><RplIcon name="icon-user-circle-filled"></RplIcon></span
          >&NoBreak;<span>Login</span>
        </RplPrimaryNavBarAction>
      </li>

      <!-- Search slot -->
      <li>
        <RplPrimaryNavBarAction type="toggle">
          <span>Search</span>&NoBreak;<span
            class="
              rpl-primary-nav__nav-bar-icon rpl-primary-nav__nav-bar-icon--large
              rpl-u-margin-l-2
            "
            ><RplIcon name="icon-search"></RplIcon>
          </span>
        </RplPrimaryNavBarAction>
      </li>
    </ul>
  </div>
</template>
