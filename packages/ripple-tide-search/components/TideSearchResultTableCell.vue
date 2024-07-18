<template>
  <div class="tide-search-result-cell"><slot></slot></div>
</template>

<style>
.tide-search-result-cell {
  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-3);

  address {
    font-style: normal;
  }
}
</style>
