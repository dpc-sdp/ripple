<script lang="ts">
export default { name: 'RplPrimaryNavSearchForm' }
</script>

<script setup lang="ts">
import RplPrimaryNavQuickExit from './quick-exit.vue'
</script>

<template>
  <div class="rpl-primary-nav__search-form">
    <!-- Supplementary mobile links -->
    <ul class="rpl-primary-nav__supplementary-mobile-links">
      <li><RplPrimaryNavQuickExit /></li>
    </ul>

    <span class="rpl-type-h4">Search form component will go here. </span>
  </div>
</template>
