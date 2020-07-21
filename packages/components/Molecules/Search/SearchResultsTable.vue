<template>
  <table class="rpl-search-results-table">
    <thead>
      <tr>
        <th v-for="col in columns" :colspan="col.colspan" :class="computeClasses(col)" :key="`th-${col.key}`">{{col.label}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIdx) in rows" :key="`row-${rowIdx}`" :data-tid="`row-${rowIdx}`">
        <td
          :colspan="col.colspan"
          v-for="(col, colIdx) in row"
          :key="`col-${colIdx}-row-${rowIdx}`"
          :class="computeClasses(col)"
          :data-tid="`col-${kebabcase(col.key)}`"
          >
          <span class="rpl-search-results-table__label">{{col.label}}</span>
          <div class="rpl-search-results-table__value" :is="col.component" v-bind="col.component !== 'span' ? col.data : {}">{{col.data}}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import kebabCase from 'lodash.kebabcase'

export default {
  name: 'rpl-search-results-table',
  props: {
    items: {
      type: Array,
      validator: (value) => value.every(item => typeof item === 'object')
    },
    columnConfig: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  methods: {
    computeClasses (col) {
      const classes = []
      const prefix = 'rpl-search-results-table'
      if (col.collapse) {
        classes.push(`${prefix}__col-collapse`)
      }
      if (col.cols) {
        classes.push(`${prefix}__col-${col.cols}`)
      }
      if (col.push) {
        classes.push(`${prefix}__col-push-${col.push}`)
      }
      return classes
    },
    kebabcase (str) {
      return kebabCase(str)
    }
  },
  computed: {
    columns () {
      if (!this.columnConfig || this.columnConfig.length === 0) {
        const firstCol = [...new Set(this.items.map(item => Object.keys(item)))][0]
        return firstCol.map(val => {
          return {
            key: val,
            label: val,
            colspan: 1
          }
        })
      }
      return this.columnConfig
    },
    rows () {
      if (this.items) {
        return this.items.map(item => {
          return this.columns.map(config => {
            const col = item[config.key]
            return {
              component: config ? config.component || 'span' : 'span',
              data: col,
              ...config
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

$table-stripe-color: rpl-color('light_neutral') !default;
$table-border: 1px solid rpl-color('mid_neutral_1') !default;
$table-header-ruleset: ('s', 1em, 'bold');
$table-padding: $rpl-space-3 0;
$search-table-link-ruleset: ('s', 1em, 'bold');

.rpl-search-results-table {
  $root: &;
  overflow: auto;
  width: 100%;
  -webkit-overflow-scrolling: touch; // sass-lint:disable-line no-vendor-prefixes
  border-collapse: collapse;
  width: 100%;
  @include rpl_text_color(rpl_color('extra_dark_neutral'));

  caption {
    text-align: left;
    padding: $table-padding;
    vertical-align: top;
  }

  thead {
    @include rpl_visually_hidden;
    @include rpl_print {
      position: relative;
    }
    @include rpl_breakpoint('m') {
      position: relative;
    }
    tr {
      background-color: white;
      th {
        text-align: left;
      }
    }
  }

  tbody {
    tr {
      border-bottom: $table-border;
      border-top: $table-border;
      display: flex;
      flex-direction: column;

      @include rpl_breakpoint('m') {
        display: table-row;
      }
      @include rpl_print {
        display: table-row;
      }
    }
  }

  th {
    @include rpl_typography_ruleset($table-header-ruleset);
    text-align: left;
  }

  th,
  td {
    padding: $table-padding;
    vertical-align: top;
  }

  td {
    .rpl-text-label {
      @include rpl_typography_font('s', 1.5em, 'semibold');
      color: rpl-color('primary');
    }
    display: flex;

    @include rpl_breakpoint('m') {
      display: table-cell;
    }
    @include rpl_print {
      display: table-cell;
    }
    &:first-child {
      #{$root}__label {
        display: none;
      }
    }
  }

  &__label {
    display: block;
    margin-right: auto;
    @include rpl_typography_ruleset($table-header-ruleset);
    @include rpl_breakpoint('m') {
      display: none;
    }
    @include rpl_print {
      display: none;
    }
  }

  @for $i from 1 through 12 {
    #{$root}__col-#{$i} {
      @include rpl_breakpoint('m') {
        width: calc(#{percentage($i / 12)});
      }
    }
    #{$root}__col-push-#{$i} {
      @include rpl_breakpoint('m') {
        padding-right: calc(#{percentage($i / 12)}) !important;
      }
    }
  }

  &__col-collapse {
    width: 1px;
    white-space: nowrap;
  }

}
</style>
