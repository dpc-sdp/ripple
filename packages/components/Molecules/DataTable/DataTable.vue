<template>
  <div class="rpl-data-table">
    <div v-if="caption" class="rpl-data-table__caption">{{ caption }}</div>
    <!-- Desktop display -->
    <table v-if="headers || rows" class="rpl-data-table__table">
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
      <div v-for="(item, i) in responsiveItems" class="rpl-data-table__dl-container" :key="`item${i}`">
        <dl v-for="(header, j) in responsiveHeaders" :key="`header${j}${i}`">
          <dt :key="`dt${i}${j}`">{{ header }}</dt>
          <dd :key="`dd${i}${j}`">{{ item[j] }}</dd>
        </dl>
      </div>
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
    items: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      headers: [],
      rows: [],
      responsiveItems: [],
      responsiveHeaders: []
    }
  },
  mounted () {
    if (!Object.values(this.items).length) return
    // remove caption value from object
    if (this.items.hasOwnProperty('caption')) {
      delete this.items.caption
    }

    this.tableData(Object.values(this.items))
    this.responsiveHeaders = this.headers
    this.responsiveItems = this.rows

    // format items for column oriented format
    if (this.isRowOriented !== true) {
      this.responsiveData(Object.values(this.items))
    }
  },
  methods: {
    responsiveData ([...items]) {
      this.responsiveHeaders = items.map(item => item.slice(0, 1)[0])

      let formattedRows = []
      for (let i = 0; i < items.length; i++) {
        // remove the headers
        let itemsRows = items.map(item => item.slice(1))

        let newRows = []
        itemsRows.map((item) => {
          let firstEl = item.splice(i, 1)
          if (firstEl && firstEl[0]) {
            newRows.push(firstEl[0])
          }
        })
        if (newRows.length) {
          formattedRows.push(newRows)
        }
      }
      this.responsiveItems = formattedRows
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
$data-table-padding: $rpl-space-4 !default;
$data-table-background-color: rpl-color('white') !default;
$data-table-stripe-color: rpl-color('light_neutral') !default;
$data-table-border: 1px solid rpl-color('mid_neutral_1') !default;

.rpl-data-table {
  border: $data-table-border;
  border-radius: rem(4px);
  background-color: $data-table-background-color;
  overflow: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes

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

    td:first-child {
      @include rpl_typography_ruleset($data-table-header-ruleset);
    }

    th,
    td {
      padding: $data-table-padding;
      vertical-align: top;
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
