<script lang="ts">
export default { name: 'RplPrimaryNavSearchForm' }
</script>

<script setup lang="ts">
import RplPrimaryNavQuickExit from '../quick-exit/quick-exit.vue'
import RplSearchBar from '../../../search-bar/search-bar.vue'

interface Props {
  showQuickExit: boolean
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="rpl-primary-nav__search-form">
    <!-- Quick links -->
    <div v-if="showQuickExit" class="rpl-primary-nav__search-form-quick-links">
      <RplPrimaryNavQuickExit />
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

<style src="./search-form.css" />
