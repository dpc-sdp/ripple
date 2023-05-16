<script setup lang="ts">
import RplIcon from '../../../icon/RplIcon.vue'
import { usePrimaryNavFocus } from '../../../../composables/usePrimaryNavFocus'
import { ref } from 'vue'

const home = ref(null)

const { setFocus } = usePrimaryNavFocus(home, 'list:home')

const handleFocus = () => setFocus('menu:toggle')
</script>

<template>
  <RplLink
    ref="home"
    class="rpl-primary-nav__mega-menu-action rpl-primary-nav__mega-menu-action--home rpl-u-focusable-block rpl-type-p-small"
    url="/"
    @keydown.shift.tab.exact.prevent="handleFocus"
  >
    <span class="rpl-primary-nav__mega-menu-action-icon rpl-u-margin-r-2">
      <RplIcon name="icon-home" size="s" />
    </span>
    <span class="rpl-primary-nav__mega-menu-action-text">Home</span>
  </RplLink>
</template>
