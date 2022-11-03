<script lang="ts">
export default { name: 'RplPrimaryNavSearchForm' }
</script>

<script setup lang="ts">
import RplPrimaryNavQuickExit from './quick-exit.vue'
import RplSearchBar from '../search-bar/search-bar.vue'

interface Props {
  showQuickExit: boolean
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="rpl-primary-nav__search-form">
    <!-- Quick links -->
    <div class="rpl-primary-nav__search-form-quick-links">
      <RplPrimaryNavQuickExit v-if="props.showQuickExit" />
    </div>

    <div class="rpl-primary-nav__search-bar-wrapper">
      <RplSearchBar
        id="primary-nav-search"
        variant="menu"
        placeholder="Placeholder text"
      />
    </div>
  </div>
</template>
