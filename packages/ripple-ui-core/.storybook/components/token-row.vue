<template>
  <div class="sb-token-table__row">
    <slot></slot>
  </div>
</template>

<style>
.sb-token-table__row {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  margin: var(--rpl-space-3);
}
</style>
