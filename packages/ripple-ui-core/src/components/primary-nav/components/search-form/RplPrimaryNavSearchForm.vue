<script setup lang="ts">
import RplPrimaryNavQuickExit from '../quick-exit/RplPrimaryNavQuickExit.vue'
import RplSearchBar from '../../../search-bar/RplSearchBar.vue'
import { ref, onMounted } from 'vue'

interface Props {
  showQuickExit: boolean
  searchUrl: boolean
  maxLength?: number
}

const searchBar = ref(null)

const props = withDefaults(defineProps<Props>(), {
  maxLength: 128
})

const handleSubmit = (event) => {
  window.location.href = `${props.searchUrl}?q=${encodeURIComponent(event.value)}`
}

onMounted(() => {
  const input = searchBar.value.$el.querySelector('input')

  if (input) {
    input.focus()
  }
})
</script>

<template>
  <div id="search-megamenu" class="rpl-primary-nav__search-form">
    <!-- Quick links -->
    <div v-if="showQuickExit" class="rpl-primary-nav__search-form-quick-links">
      <RplPrimaryNavQuickExit />
    </div>

    <div class="rpl-primary-nav__search-bar-wrapper">
      <RplSearchBar
        id="primary-nav-search"
        ref="searchBar"
        variant="menu"
        placeholder="Start typing..."
        :maxlength="maxLength"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<style src="./RplPrimaryNavSearchForm.css" />
