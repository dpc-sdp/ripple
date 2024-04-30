<script setup lang="ts">
import RplPrimaryNavQuickExit from '../quick-exit/RplPrimaryNavQuickExit.vue'
import RplSearchBar from '../../../search-bar/RplSearchBar.vue'
import { ref, onMounted } from 'vue'

interface Props {
  showQuickExit: boolean
  searchUrl: boolean
}

const searchBar = ref(null)

const props = withDefaults(defineProps<Props>(), {})

const handleSubmit = (event) => {
  window.location.href = `${props.searchUrl}?q=${event.value}`
}

onMounted(() => {
  const input = searchBar.value.$el.querySelector('input')

  if (input) {
    input.focus()
  }
})
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
        ref="searchBar"
        variant="menu"
        placeholder="Start typing..."
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<style src="./RplPrimaryNavSearchForm.css" />
