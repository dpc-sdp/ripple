<script lang="ts">
import sbTokenTableRow from './token-row.vue'
import sbTokenTableCol from './token-col.vue'

export default {
  components: { sbTokenTableRow, sbTokenTableCol },
  props: {
    columns: {
      type: Array,
      required: true
    },
    full: Boolean
  }
}
</script>

<template>
  <div class="sb-token-table" :class="{ 'sb-token-table--full-width': full }">
    <sbTokenTableRow class="sb-token-table__title">
      <sbTokenTableCol v-for="col in columns" :key="col">
        {{ col }}
      </sbTokenTableCol>
    </sbTokenTableRow>
    <slot></slot>
  </div>
</template>

<style>
.sb-token-table {
  display: flex;
  flex-direction: column;
  width: 469px;
  &--full-width {
    width: 100%;
  }
  &__title {
    font-weight: 700;
    padding-bottom: var(--rpl-sp-2);
    border-bottom: 2px solid black;
    &.sb-token-table__row {
      font-size: 1.2em;
    }
  }
}
</style>
