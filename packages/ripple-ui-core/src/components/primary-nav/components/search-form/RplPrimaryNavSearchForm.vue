<script setup lang="ts">
import RplPrimaryNavQuickExit from '../quick-exit/RplPrimaryNavQuickExit.vue'
import RplSearchBar from '../../../search-bar/RplSearchBar.vue'

interface Props {
  showQuickExit: boolean
}

withDefaults(defineProps<Props>(), {})

const handleSubmit = (value) => {
  window.location.href = `/search?q=${value}`
}
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
        @on-submit="handleSubmit"
      />
    </div>
  </div>
</template>

<style src="./RplPrimaryNavSearchForm.css" />
