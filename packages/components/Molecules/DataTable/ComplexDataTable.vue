<template>
  <table class="rpl-complex-data-table">
    <caption v-if="caption" class="rpl-complex-data-table__caption">{{caption}}</caption>
    <thead>
      <tr role="row">
        <template v-for="(header, hdrIdx) in columns">
          <th v-if="header.key !== '__moreInfo'" :key="`th-${hdrIdx}`" role="columnheader" scope="col"  :id="`th-${hdrIdx + 1}`">{{getColumnLabel(header)}}</th>
          <td v-if="header.key === '__moreInfo'" :key="`th-${hdrIdx}`"></td>
        </template>
      </tr>
    </thead>
    <tbody v-if="rows">
      <template v-for="(row, rowIdx) in rows">
        <tr role="row" class="rpl-complex-data-table__row" :class="{ 'rpl-complex-data-table__row-open': isRowExpanded(rowIdx), 'rpl-complex-data-table__row-alt': getZebraOrder(rowIdx) }" :key="getRowId(rowIdx)" :id="getRowId(rowIdx)">
          <template v-for="(col, colIdx) in columns">
            <component :is="rowHeaders ? 'th' : 'td'" v-if="colIdx === 0" :scope="rowHeaders ? 'rowgroup' : undefined" :id="`row-${rowIdx}-header`" :key="`row${getRowKey(rowIdx)}-col${colIdx}`" :rowspan="isRowExpanded(rowIdx) ? getExpandableRows(row).length + 1 : 1" >
              <span aria-hidden="true" class="rpl-complex-data-table__label">{{col}}</span>
              <component v-if="columns && columns[colIdx] && columns[colIdx].hasOwnProperty('component')" :is="columns[colIdx].component" v-bind="row[colIdx]"></component>
              <span v-else v-html="row[colIdx]" />
            </component>
            <td v-if="colIdx !== 0 && !Array.isArray(row[colIdx])" role="cell" :key="`row${rowIdx}-col${colIdx}`" rowspan="1" >
              <span aria-hidden="true" class="rpl-complex-data-table__label">{{col.label || col}}</span>
              <component v-if="columns && columns[colIdx] && columns[colIdx].hasOwnProperty('component')" class="rpl-complex-data-table__value" :is="columns[colIdx].component" v-bind="row[colIdx]">{{row[colIdx]}}</component>
              <span class="rpl-complex-data-table__value" v-else v-html="row[colIdx]" />
            </td>
            <td role="cell" :key="`row${getRowKey(rowIdx)}-col${colIdx + 1}`" :rowspan="1" v-if="Array.isArray(row[colIdx])">
              <rpl-expander
                class="rpl-complex-data-table__show-more-btn"
                :aria-label="`Click to show ${isRowExpanded(rowIdx) ? 'Less' : 'More'} info for ${row[0]}`"
                :title="`${isRowExpanded(rowIdx) ? 'Less' : 'More'} info`"
                :aria-controls="getHiddenRowIds(rowIdx)"
                :aria-expanded="isRowExpanded(rowIdx)"
                :expanded="isRowExpanded(rowIdx)"
                @expanded="toggleExpandRow(rowIdx)" />
            </td>
          </template>
        </tr>
        <slot name="hiddenContentRows" v-bind:hiddenRows="getExpandableRows(row)" v-for="(hiddenRow, hiddenRowIdx) in getExpandableRows(row)" >
          <tr role="row" class="rpl-complex-data-table__row rpl-complex-data-table__hidden-row" :class="{ 'rpl-complex-data-table__hidden-row--expanded': isRowExpanded(rowIdx), 'rpl-complex-data-table__row-alt': getZebraOrder(rowIdx) }" v-show="isRowExpanded(rowIdx)" :key="getHiddenRowId(rowIdx, hiddenRowIdx)" :id="getHiddenRowId(rowIdx, hiddenRowIdx)">
            <td role="cell" headers="th-1"  rowspan="1" :colspan="columns.length - 1" v-for="(col, colIdx) in hiddenRow" :key="`row${rowIdx}-hidden-${hiddenRowIdx}-col${colIdx}`">
              <div class="rpl-complex-data-table__hidden-row-content">
                <slot v-bind:coldata="col" :aria-label="`${row[0]} more info`" name="hiddenContentCell">
                  <span v-html="col" />
                </slot>
              </div>
            </td>
          </tr>
        </slot>
      </template>
    </tbody>
  </table>
</template>

<script>
import { RplExpander } from '@dpc-sdp/ripple-data-table'
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'
import { RplIcon } from '@dpc-sdp/ripple-icon'
export default {
  name: 'rpl-complex-data-table',
  mixins: [uniqueid],
  components: {
    RplExpander,
    RplIcon
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowHeaders: {
      type: Boolean,
      default: false
    },
    zebraStripes: {
      type: [String, Boolean],
      default: 'even'
    },
    caption: {
      type: String
    }
  },
  data () {
    return {
      expandedRows: []
    }
  },
  methods: {
    collapseAllRows () {
      this.expandedRows = []
    },
    getRowKey (rowIdx) {
      return `${this.rows[rowIdx][0]}-${rowIdx}`
    },
    getColumnLabel (col) {
      if (typeof col === 'string') {
        return col
      } else if (typeof col === 'object' && col.hasOwnProperty('label')) {
        return col.label
      }
    },
    getExpandableRows (row) {
      const filteredRows = row.filter(col => Array.isArray(col))
      if (filteredRows.length > 0) {
        return filteredRows[0]
      }
    },
    getHiddenRowCols (colIdx, row) {
      if (row.length === 1) {
        return this.columns.length
      } else if (row.length > 1 && colIdx === row.length - 1) {
        return this.columns.length - row.length
      }
    },
    isRowExpanded (rowIdx) {
      if (this.expandedRows.includes(this.getRowKey(rowIdx))) {
        return true
      }
      return false
    },
    toggleExpandRow (rowIdx) {
      if (this.isRowExpanded(rowIdx)) {
        this.expandedRows = this.expandedRows.filter(itm => itm !== this.getRowKey(rowIdx))
        this.$emit('collapse-row', rowIdx)
      } else {
        this.expandedRows.push(this.getRowKey(rowIdx))
        this.$emit('expand-row', rowIdx)
      }
    },
    getHiddenRowIds (rowIdx) {
      const hiddenRows = this.getExpandableRows(this.rows[rowIdx])
      if (hiddenRows.length > 0) {
        return hiddenRows.map((row, hiddenRowIdx) => {
          return this.getHiddenRowId(rowIdx, hiddenRowIdx)
        }).join(' ')
      }
    },
    getRowId (rowIdx) {
      return `table-${this.getIdFromLocalRegistry()}-row-${rowIdx + 1}`
    },
    getHiddenRowId (rowIdx, hiddenRowIdx) {
      return `${this.getRowId(rowIdx)}-hidden-${hiddenRowIdx + 1}`
    },
    getZebraOrder (rowIdx) {
      if (this.zebraStripes === 'even') {
        return this.zebraStripes && rowIdx % 2 === 0
      } else if (this.zebraStripes === 'odd') {
        return this.zebraStripes && rowIdx % 2 !== 0
      }
    }
  },
  computed: {
    rows () {
      return this.items
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$rpl-complex-data-table-body-color: rpl_color('extra_dark_neutral');
$rpl-complex-data-table-regular-header-ruleset: ('xs', 1.5em, 'regular') !default;
$rpl-complex-data-table-bold-header-ruleset: ('xs', 1.5em, 'bold') !default;
$rpl-complex-data-table-row-label-max-width: rem(140px);
$rpl-complex-data-table-row-label-ruleset: (
  'xs': ('l', 1.2em, 'bold'),
  'l': ('s', 1.5em, 'bold'),
) !default;

$rpl-complex-data-table-label-header-ruleset: (
  'xs': ('xs', 1.5em, 'bold')
) !default;
$rpl-complex-data-table-show-more-btn-typography: ('xs', 1.35em, 'bold') !default;
$rpl-complex-data-table-show-more-btn-color: rpl_color('primary') !default;
$rpl-complex-data-table-show-more-btn-icon-size: rem(14px) !default;
$rpl-complex-data-table-font-size-xs: rem(14px) !default;
$rpl-complex-data-table-line-height-xs: 1.4em !default;
$rpl-complex-data-table-cell-padding: $rpl-space-4 !default;
$rpl-complex-data-table-cell-padding-mobile: $rpl-space-2 $rpl-space-4 !default;
$rpl-complex-data-table-row-padding-mobile: $rpl-space-2 0 !default;
$rpl-complex-data-table-hidden-content-padding: $rpl-space-2 !default;
$rpl-complex-data-table-row-color: rpl-color('white') !default;
$rpl-complex-data-table-row-alt-color: rpl-color('light_neutral') !default;
$rpl-complex-data-table-row-border: 0 !default;
$rpl-complex-data-table-body-border: 1px solid rpl-color('mid_neutral_1') !default;
$rpl-complex-data-table-bp: 'l';
.rpl-complex-data-table {
  $root: &;
  border-collapse: collapse;
  width: 100%;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    /* fix for table column width in ie11 https://stackoverflow.com/a/25201990 */
    table-layout: fixed;
  }

  &__show-more-btn {
    @include rpl_breakpoint_down($rpl-complex-data-table-bp) {
      margin-left: auto;
    }
    @include rpl_breakpoint($rpl-complex-data-table-bp) {
      .expander {
        justify-content: flex-end;
      }
    }
  }

  &__caption {
    @include rpl_visually_hidden;
  }

  &__value,
  &__label {
    display: flex;
  }

  &__label {
    flex: 1;
    @include rpl_typography_ruleset($rpl-complex-data-table-label-header-ruleset);

    @include rpl_breakpoint($rpl-complex-data-table-bp) {
      display: none;
    }
    @include rpl_print {
      display: none;
    }
    th & {
      display: none;
    }
  }

  &__value {
    flex: 3;
  }

  th,
  td {
    padding: $rpl-complex-data-table-cell-padding-mobile;
    color: $rpl-complex-data-table-body-color;
    @include rpl_breakpoint_between('xs', 's') {
      font-size: $rpl-complex-data-table-font-size-xs;
      line-height: $rpl-complex-data-table-line-height-xs;
    }
    @include rpl_breakpoint($rpl-complex-data-table-bp) {
      padding: $rpl-complex-data-table-cell-padding;
    }
  }

  thead {
    @include rpl_breakpoint_down($rpl-complex-data-table-bp) {
      @include rpl_visually_hidden;
    }
    th {
      text-align: left;
      @include rpl_typography_ruleset($rpl-complex-data-table-bold-header-ruleset);
    }
  }

  tbody {
    border-top: $rpl-complex-data-table-body-border;
    border-bottom: $rpl-complex-data-table-body-border;
    tr {
      display: flex;
      flex-direction: column;
      td {
        flex-direction: column;
      }

      @include rpl_breakpoint_down($rpl-complex-data-table-bp) {
        padding: $rpl-complex-data-table-row-padding-mobile;
      }
      @include rpl_breakpoint($rpl-complex-data-table-bp) {
        display: table-row;
        td {
          display: table-cell;
        }
      }
      @include rpl_print {
        display: table-row;
      }
    }
    th {
      text-align: left;
      @include rpl_typography_ruleset($rpl-complex-data-table-row-label-ruleset);
      @include rpl_breakpoint($rpl-complex-data-table-bp) {
        max-width: $rpl-complex-data-table-row-label-max-width;
      }
    }
  }
  &__row {
    border-top: $rpl-complex-data-table-row-border;
    background-color: $rpl-complex-data-table-row-color;
    vertical-align: top;
    &-alt {
      background-color: $rpl-complex-data-table-row-alt-color;
    }
  }
  &__hidden-row {
    border-top: 0;
  }

  td {
    display: flex;
    @include rpl_typography_ruleset($rpl-complex-data-table-regular-header-ruleset);
    @include rpl_breakpoint($rpl-complex-data-table-bp) {
      display: table-cell;
    }
    @include rpl_print {
      display: table-cell;
    }
    &:not([rowspan='1']) {
      vertical-align: top;
    }
  }
}
</style>
