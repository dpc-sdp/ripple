<template>
  <div class="rpl-data-table">
    <div v-if="caption" class="rpl-data-table__caption">{{ caption }}</div>
    <!-- Desktop display -->
    <table v-if="headers || rows" class="rpl-data-table__table" v-bind:class="{ 'rpl-data-table__table--col-oriented': !isRowOriented }">
      <thead v-if="headers">
        <tr><th v-for="(header, index) in headers" :key="`header${index}`" v-html="header" /></tr>
      </thead>
      <tbody v-if="rows">
        <tr v-for="(row, index) in rows" :key="`row${index}`">
          <td v-for="(col, index) in row" :key="`col${index}`" v-html="col" />
        </tr>
      </tbody>
    </table>

    <!-- Mobile display -->
    <div class="rpl-data-table__mobile-layout">
      <table v-if="isStackableColumns" class="rpl-data-table--single-column">
        <tbody v-if="stackableColumns">
          <template v-for="(row, index) in stackableColumns">
            <tr :key="`stackablerow${index}`">
              <td v-for="(col, index) in row" :key="`stackablecol${index}`" v-html="col" />
            </tr>
          </template>
        </tbody>
      </table>
      <template v-else>
        <div v-for="(item, i) in responsiveItems" class="rpl-data-table__dl-container" :key="`item${i}`">
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
export default {
  name: 'RplDataTable',
  props: {
    caption: {
      type: String,
      default: ''
    },
    isRowOriented: {
      type: Boolean,
      default: true
    },
    isStackableColumns: {
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
      stackableColumns: []
    }
  },
  mounted () {
    this.$forceUpdate()
    if (!this.items.length) return

    this.tableData(this.items)
    this.responsiveHeaders = this.headers
    this.responsiveItems = this.rows

    // format items for column oriented format
    if (this.isRowOriented !== true) {
      this.responsiveData(this.items)
    }

    if (this.isStackableColumns === true) {
      this.formatStackableColumns(this.items)
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
$data-table-header-ruleset: ('s', 1em, 'bold') !default;
$data-table-col-oriented-header-ruleset: ('s', 1em, 'regular') !default;
$data-table-padding: $rpl-space-4 !default;
$data-table-background-color: rpl-color('white') !default;
$data-table-stripe-color: rpl-color('light_neutral') !default;
$data-table-border: 1px solid rpl-color('mid_neutral_1') !default;
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

  &__caption {
    text-align: left;
    padding: $data-table-padding;
    vertical-align: top;
  }

  &__table {
    @include rpl_breakpoint('xs') {
      display: none;
    }
    @include rpl_breakpoint('m') {
      display: table;
    }

    border-collapse: collapse;
    width: 100%;

    thead {
      tr {
        background-color: $data-table-stripe-color;
      }
    }

    tbody {
      tr {
        background-color: $data-table-background-color;
        &:nth-child(even) {
          background-color: $data-table-stripe-color;
        }
      }
    }

    th {
      @include rpl_typography_ruleset($data-table-header-ruleset);
      text-align: left;
    }

    th,
    td {
      padding: $data-table-padding;
    }

    &--col-oriented {
      th:first-child,
      td:first-child {
        @include rpl_typography_ruleset($data-table-header-ruleset);
      }

      th {
        @include rpl_typography_ruleset($data-table-col-oriented-header-ruleset);
      }
    }
  }

  &--single-column {
    border-collapse: collapse;
    width: 100%;
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

    td {
      padding: $data-table-padding;
      border-top: $data-table-border;

      &:first-child {
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
    }

    dl > * {
      flex: 0 0 50%;
      margin: 0;
    }
  }

}

</style>
