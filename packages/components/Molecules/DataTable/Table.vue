<template>
  <table v-if="headers || rows" class="rpl-table">
    <thead v-if="headers">
      <tr><th v-for="(header, index) in headers" :key="`header${index}`" v-html="header" /></tr>
    </thead>
    <tbody v-if="rows">
      <tr v-for="(row, index) in rows" :key="`row${index}`">
        <td v-for="(col, index) in row" :key="`col${index}`" v-html="col" />
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'RplTable',
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-table-stripe-color: rpl-color('light_neutral') !default;
$data-table-regular-header-ruleset: ('s', 1.5em, 'regular') !default;
$data-table-font-size-xs: rem(14px) !default;
$data-table-line-height-xs: 1.4em !default;
$rpl-table-padding: $rpl-space-4 !default;
$rpl-table-background-color: rpl-color('white') !default;

.rpl-table {
  border-collapse: collapse;
  width: 100%;

  thead {
    tr {
      background-color: $rpl-table-stripe-color;
    }
  }

  tbody {
    tr {
      background-color: $rpl-table-background-color;
      &:nth-child(even) {
        background-color: $rpl-table-stripe-color;
      }
    }
  }

  th {
    text-align: left;
  }

  td {
    @include rpl_typography_ruleset($data-table-regular-header-ruleset);
  }

  th,
  td {
    padding: $rpl-table-padding;
    @include rpl_breakpoint_between('xs', 's') {
      font-size: $data-table-font-size-xs;
      line-height: $data-table-line-height-xs;
    }
  }
}
</style>
