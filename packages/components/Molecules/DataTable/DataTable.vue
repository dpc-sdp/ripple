<template>
  <div class="rpl-data-table">
    <div class="rpl-data-table__title">{{ title }}</div>
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
    <div class="rpl-data-table__responsive">
      <dl v-for="(item, i) in responsiveItems" class="rpl-data-table__responsive-data" :key="`item${i}`">
        <template v-for="(header, j) in responsiveHeaders">
          <dt :key="`dt${i}${j}`">{{ header }}</dt>
          <dd :key="`dd${i}${j}`">{{ item[j] }}</dd>
        </template>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RplDataTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    isRowOriented: {
      type: Boolean,
      default: true
    },
    items: {
      type: [Array, Object],
      required: true
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
    if (!this.items) return

    this.tableData(this.items)
    this.responsiveHeaders = this.headers
    this.responsiveItems = this.rows

    // format items for column oriented format
    if (this.isRowOriented !== true) {
      this.responsiveData(this.items)
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
$data-table-header-ruleset: ('s', 1em, 'bold');
$data-table-padding: $rpl-space-3 0;
$data-search-table-link-ruleset: ('s', 1em, 'bold');

.rpl-data-table {

  &__table {
    @include rpl_breakpoint('xs') {
      display: none;
    }
    @include rpl_breakpoint('m') {
      display: table;
    }
    overflow: auto;
    -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes
    border-collapse: collapse;
    width: 100%;
    @include rpl_text_color(rpl_color('extra_dark_neutral'));

    thead {
      position: relative;
      tr {
        background-color: white;
        th {
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        border-bottom: $data-table-border;
        border-top: $data-table-border;
        display: table-row;
      }
    }

    th {
      @include rpl_typography_ruleset($data-table-header-ruleset);
      text-align: left;
    }

    th,
    td {
      padding: $data-table-padding;
      vertical-align: top;
    }
  }

  &__responsive {
    @include rpl_breakpoint('xs') {
      display: block;
    }
    @include rpl_breakpoint('m') {
      display: none;
    }
  }

  &__responsive-data {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    &:nth-child(odd) {
      background-color: #eee;
    }
  }

  &__responsive-data>* {
    flex: 0 0 50%;
    margin: 0;
  }
}

</style>
