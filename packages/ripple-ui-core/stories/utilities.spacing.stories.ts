import { Meta, StoryObj } from '@storybook/vue3'
import {
  RplMarginUtilities,
  RplPaddingUtilities,
  RplSizeUtilities
} from './constants'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'

export default {
  title: 'Base Styles/Utilities/Spacing'
} satisfies Meta

export const Margin: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      return {
        columns: ['Style', 'Class'],
        RplMarginUtilities,
        getItemStyles: (item: any) =>
          `background-color: ${item.color}; display: inline-block;`
      }
    },
    template: `
      <sbTokenTable :columns="columns" full>
        <sbTokenTableRow lined v-for="item in RplMarginUtilities" :key="item">
          <sbTokenTableCol>
            <div :style="getItemStyles(item)" :class="item.class">
              {{ item.title }}
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>.{{ item.class }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const Padding: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      return {
        columns: ['Style', 'Class'],
        RplPaddingUtilities,
        getItemStyles: (item: any) =>
          `background-color: ${item.color}; display: inline-block;`
      }
    },
    template: `
      <sbTokenTable :columns="columns" full>
        <sbTokenTableRow lined v-for="item in RplPaddingUtilities" :key="item">
          <sbTokenTableCol>
            <div :style="getItemStyles(item)" :class="item.class">
              {{ item.title }}
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>.{{ item.class }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const Size: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      return {
        columns: ['Style', 'Size', 'Class'],
        RplSizeUtilities,
        getItemStyles: (item: any) =>
          `background-color: ${item.color}; display: inline-block;`
      }
    },
    template: `
      <sbTokenTable :columns="columns" full>
        <sbTokenTableRow lined v-for="item in RplSizeUtilities" :key="item">
          <sbTokenTableCol>
            <div :style="getItemStyles(item)" :class="item.class"></div>
          </sbTokenTableCol>
          <sbTokenTableCol>
            {{ item.value }}px
          </sbTokenTableCol>
          <sbTokenTableCol>.{{ item.class }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}
