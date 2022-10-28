<script lang="ts">
export default { name: 'RplPrimaryNavSearchForm' }
</script>

<script setup lang="ts">
import RplPrimaryNavQuickExit from './quick-exit.vue'
</script>

<template>
  <div class="rpl-primary-nav__search-form">
    <!-- Supplementary mobile links -->
    <div class="rpl-primary-nav__search-form-quick-links">
      <RplPrimaryNavQuickExit />
    </div>

    <span class="rpl-type-h4">Search form component will go here. </span>
  </div>
</template>
