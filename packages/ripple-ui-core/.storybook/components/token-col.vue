<template>
  <div class="sb-token-table__col">
    <slot></slot>
  </div>
</template>

<style>
.sb-token-table__col {
  display: flex;
  font-size: 1.4em;
  flex-direction: row;
  margin: 0 var(--rpl-space-2);
  align-items: center;
  width: 100%;
}
</style>
