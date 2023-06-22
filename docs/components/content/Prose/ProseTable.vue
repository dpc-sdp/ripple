<template>
  <div class="rpl-table">
    <div class="rpl-table__scroll-container">
      <table class="docs-table">
        <slot />
      </table>
    </div>
  </div>
</template>

<style scoped>
.docs-table {
  min-width: 100%;
}
</style>
