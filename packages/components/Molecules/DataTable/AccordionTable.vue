<template>
  <table class="rpl-data-table">
    <thead>
      <tr role="row">
        <th role="columnheader" v-for="(header, hdrIdx) in columns" :key="`th-${hdrIdx}`">{{getColumnLabel(header)}}</th>
      </tr>
    </thead>
    <tbody v-if="rows">
      <template v-for="(row, rowIdx) in rows">
        <tr role="row" :key="getRowId(rowIdx)" :id="getRowId(rowIdx)">
          <template v-for="(col, colIdx) in columns">
            <td role="cell" :key="`row${rowIdx}-col${colIdx}`" :rowspan="colIdx === 0 && isRowExpanded(rowIdx) ? getExpandableRows(row).length + 1 : 1" v-if="!Array.isArray(row[colIdx])" >
              <span aria-hidden="true" class="rpl-data-table__label">{{col}}</span>
              <component v-if="columns && columns[colIdx] && columns[colIdx].hasOwnProperty('component')" :is="columns[colIdx].component" v-bind="row[colIdx]"></component>
              <span v-else v-html="row[colIdx]" />
            </td>
            <td role="cell" :key="`row${rowIdx}-col${colIdx + 1}`" :rowspan="colIdx === columns.length -1 && isRowExpanded(rowIdx) ? getExpandableRows(row).length + 1 : 1" v-if="Array.isArray(row[colIdx])">
              <slot name="showmore">
                <button class="rpl-data-table__show-more-btn" @click="toggleExpandRow(rowIdx)" :aria-controls="getHiddenRowIds(rowIdx)" :aria-expanded="isRowExpanded(rowIdx)">
                  <rpl-text-icon aria-hidden="true" :symbol="isRowExpanded(rowIdx) ? 'arrow_down_primary' : 'arrow_up_primary'" color="primary" size="s" text="show more" placement="after" />
                  <span class="rpl-visually-hidden">click to {{isRowExpanded(rowIdx) ? 'hide' : 'show'}} more content</span>
                </button>
              </slot>
            </td>
          </template>
        </tr>
        <slot name="hiddenContentRows" v-bind:hiddenRows="getExpandableRows(row)" v-for="(hiddenRow, hiddenRowIdx) in getExpandableRows(row)" >
          <tr class="rpl-data-table__hidden-row" v-if="isRowExpanded(rowIdx)" :key="getHiddenRowId(rowIdx, hiddenRowIdx)" :id="getHiddenRowId(rowIdx, hiddenRowIdx)">
            <td :aria-label="`${row[0]} more info`" rowspan="1" :colspan="2" v-for="(col, colIdx) in hiddenRow" :key="`row${rowIdx}-hidden-${hiddenRowIdx}-col${colIdx}`">
              <slot v-bind:coldata="col" name="hiddenContentCell">
                <span v-html="col" />
              </slot>
            </td>
          </tr>
        </slot>
      </template>
    </tbody>
  </table>
</template>

<script>
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'
import { RplTextIcon } from '@dpc-sdp/ripple-icon'
export default {
  name: 'rpl-data-table',
  mixins: [uniqueid],
  components: {
    RplTextIcon
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
    isFirstRowHeader: {
      type: Boolean,
      default: false
    },
    isFirstColHeader: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expandedRows: []
    }
  },
  methods: {
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
      if (this.expandedRows.includes(rowIdx)) {
        return true
      }
      return false
    },
    toggleExpandRow (rowIdx) {
      if (this.isRowExpanded(rowIdx)) {
        this.expandedRows = this.expandedRows.filter(itm => itm !== rowIdx)
      } else {
        this.expandedRows.push(rowIdx)
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

$rpl-table-stripe-color: rpl-color('light_neutral') !default;
$data-table-regular-header-ruleset: ('s', 1.5em, 'regular') !default;
$data-table-bold-header-ruleset: ('s', 1.5em, 'bold') !default;
$data-table-font-size-xs: rem(14px) !default;
$data-table-line-height-xs: 1.4em !default;
$rpl-table-padding: $rpl-space-4 !default;
$rpl-table-background-color: rpl-color('white') !default;

.rpl-data-table {
  $root: &;
  border-collapse: collapse;
  width: 100%;

  &__show-more-btn {
    @include rpl_btn_reset;
  }
  &__label {
    display: block;
    margin-right: auto;
    @include rpl_typography_ruleset($data-table-bold-header-ruleset);
    @include rpl_breakpoint('m') {
      display: none;
    }
    @include rpl_print {
      display: none;
    }
  }

  thead {
    @include rpl_breakpoint_down('m') {
      @include rpl_visually_hidden;
    }
    tr {
      background-color: $rpl-table-stripe-color;
    }
  }

  tbody {
    tr {
      display: flex;
      flex-direction: column;
      @include rpl_breakpoint('m') {
        display: table-row;
      }
      @include rpl_print {
        display: table-row;
      }
      &:not(#{$root}__hidden-row) {
        background-color: $rpl-table-background-color;
        &:nth-child(even) {
          background-color: $rpl-table-stripe-color;
        }
        td {
          &:first-child {
            @include rpl_typography_ruleset($data-table-bold-header-ruleset);
          }
        }
      }
    }
  }

  th {
    text-align: left;
  }

  td {
    display: flex;
    @include rpl_typography_ruleset($data-table-regular-header-ruleset);
    @include rpl_breakpoint('m') {
      display: table-cell;
    }
    @include rpl_print {
      display: table-cell;
    }
    &:not([rowspan='1']) {
      vertical-align: top;
    }
    &:first-child {
      @include rpl_breakpoint_down('m') {
        @include rpl_typography_ruleset($data-table-bold-header-ruleset);
      }
      #{$root}__label {
        display: none;
      }
    }
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
