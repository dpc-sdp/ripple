<template>
  <div class="rpl-data-table">
    <!-- Desktop display -->
    <rpl-table
      :headers="headers"
      :rows="rows"
      class="rpl-data-table__table"
      v-bind:class="{ 'rpl-data-table__table--col-header': isFirstColHeader, 'rpl-data-table__table--row-header': isFirstRowHeader }"
    />
    <!-- Mobile display -->
    <div class="rpl-data-table__mobile-layout">
      <rpl-table
        v-if="isStackableColumns"
        :rows="stackableColumns"
        class="rpl-data-table__single-column"
        v-bind:class="{ 'rpl-data-table__single-column--row-header': isFirstRowHeader}"
      />
      <template v-else>
        <div
          v-for="(item, i) in responsiveItems"
          class="rpl-data-table__dl-container"
          v-bind:class="{ 'rpl-data-table__dl-container--col-header': isFirstColHeader, 'rpl-data-table__dl-container--row-header': isFirstRowHeader }"
          :key="`item${i}`"
        >
          <dl v-for="(header, j) in responsiveHeaders" :key="`header${j}${i}`">
            <dt :key="`dt${i}${j}`" v-html="header" />
            <dd :key="`dd${i}${j}`" v-html="item[j]" />
          </dl>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import RplTable from './Table'
/**
 * ## Data table has different mobile layout variations.
 *
 * ### 1. Row oriented
 * When viewed on mobile:
 *
 * * If ‘use first row as header’ is selected, then display as double column
 * * If ‘use first row as header’ is not selected, then display as single column
 *
 * ### 2. Column oriented
 * When viewed on mobile:
 *
 * * If ‘use first column as header’ is selected, then display as double column
 * * If ‘use first column as header’ is not selected, then display as single column
 */
export default {
  name: 'RplDataTable',
  components: {
    RplTable
  },
  props: {
    isRowOriented: {
      type: Boolean,
      default: true
    },
    isFirstRowHeader: {
      type: Boolean,
      default: false
    },
    isFirstColHeader: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      headers: [],
      rows: [],
      responsiveItems: [],
      responsiveHeaders: [],
      isStackableColumns: false,
      stackableColumns: []
    }
  },
  mounted () {
    this.$forceUpdate()
    if (!this.items.length) return

    this.tableData(this.items)
    this.responsiveHeaders = this.headers
    this.responsiveItems = this.rows

    if (this.isRowOriented && this.isFirstRowHeader !== true) {
      this.isStackableColumns = true
      this.stackableColumns = [...this.items]
    }

    if (this.isRowOriented === false && this.isFirstColHeader !== true) {
      this.isStackableColumns = true
      this.formatStackableColumns(this.items)
    }

    // restructure items for column oriented format
    if (this.isRowOriented !== true) {
      this.responsiveData(this.items)
    }
  },
  methods: {
    responsiveData ([...items]) {
      // header is fixed - taken from col 1 of each row
      const headers = items.map(item => Array.isArray(item) ? item.slice(0, 1)[0] : item)
      this.responsiveHeaders = headers

      // convert rows to columns
      let formattedRows = []
      let itemsRows = items.map(item => item.slice(1)) // remove the headers

      for (let i = 0; i < itemsRows[0].length; i++) {
        let newRows = []
        itemsRows.map((item) => {
          let rowValue = item.slice(i, i + 1)
          if (rowValue && rowValue[0]) {
            newRows.push(rowValue[0])
          }
        })
        formattedRows.push(newRows)
      }
      this.responsiveItems = formattedRows
    },
    formatStackableColumns ([...items]) {
      if (items && !items[0].length) return

      // convert columns to rows so mobile layout can easily be handled via css under "&__single-column"
      let formattedRows = []
      for (let i = 0; i < items[0].length; i++) {
        let newRows = []
        items.map((item) => {
          let rowValue = item.slice(i, i + 1)
          if (rowValue && rowValue[0]) {
            newRows.push(rowValue[0])
          }
        })
        if (newRows.length) {
          formattedRows.push(newRows)
        }
      }

      this.stackableColumns = formattedRows
    },
    tableData ([...items]) {
      this.headers = items.shift()
      this.rows = items
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$data-table-stripe-color: rpl-color('light_neutral') !default;
$data-table-border: 1px solid rpl-color('mid_neutral_1') !default;
$data-table-header-ruleset: ('s', 1.5em, 'bold') !default;
$data-table-dt-dl-font-size-xs: rem(14px) !default;
$data-table-dt-dl-line-height-xs: 1.4em !default;
$data-table-regular-header-ruleset: ('s', 1.5em, 'regular') !default;
$data-table-padding: $rpl-space-4 !default;
$data-table-background-color: rpl-color('white') !default;
$data-table-link-color: rpl-color('primary') !default;

.rpl-data-table {
  border: $data-table-border;
  border-radius: rem(4px);
  background-color: $data-table-background-color;
  overflow: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes

  a {
    color: $data-table-link-color;
    text-decoration: none;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  &__table {
    @include rpl_breakpoint('xs') {
      display: none;
    }
    @include rpl_breakpoint('m') {
      display: table;
    }

    th {
      @include rpl_typography_ruleset($data-table-regular-header-ruleset);
    }

    &--row-header {
      th {
        @include rpl_typography_ruleset($data-table-header-ruleset);
      }
    }

    &--col-header {
      th:first-child,
      td:first-child {
        @include rpl_typography_ruleset($data-table-header-ruleset);
      }
    }
  }

  &__single-column {
    tbody, tr, td {
      display: block;
      text-align: left;
    }

    tr {
      background-color: $data-table-background-color;

      &:nth-child(even) {
        background-color: $data-table-stripe-color;
      }
    }

    tbody tr:first-child td:first-child {
      border-top: none;
    }

    td {
      border-top: $data-table-border;
    }

    &--row-header {
      td:first-child {
        @include rpl_typography_ruleset($data-table-header-ruleset);
      }
    }
  }

  &__mobile-layout {
    @include rpl_breakpoint('xs') {
      display: block;
    }
    @include rpl_breakpoint('m') {
      display: none;
    }
  }

  &__dl-container {
    &:nth-child(odd) dl {
      background-color: $data-table-stripe-color;
    }

    &--row-header dl:first-child {
      @include rpl_typography_ruleset($data-table-header-ruleset);
    }

    dl {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      padding: $data-table-padding;
      border-top: $data-table-border;
      margin: 0;

      dt {
        @include rpl_typography_ruleset($data-table-header-ruleset);
      }
      dt,
      dd {
        @include rpl_breakpoint('xs') {
          font-size: $data-table-dt-dl-font-size-xs;
          line-height: $data-table-dt-dl-line-height-xs;
        }
      }
    }

    dl > * {
      flex: 0 0 50%;
      margin: 0;
    }
  }

}

</style>
