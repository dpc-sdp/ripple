import { Meta, StoryObj } from '@storybook/vue3'
// @ts-ignore: Cannot find module
import rplLayerStyles from '../src/tokens/settings/layers.yaml'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'

export default {
  title: 'Base Styles/Layer styles',
  argTypes: {
    columns: { table: { disable: true } }
  },
  args: {
    columns: ['Style', '', 'Token']
  }
} satisfies Meta

export const BorderRadius: StoryObj = {
  render: (args: any) => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      const items = Object.keys(rplLayerStyles?.border?.radius).map((k) => ({
        var: `--rpl-border-radius-${k}`,
        ...rplLayerStyles.border.radius[k]
      }))
      return {
        ...args,
        items,
        getExampleStyles: (item: any) => ({
          width: 'calc(var(--rpl-sp-4) * 4)',
          height: 'var(--rpl-sp-4)',
          border: `1px solid var(--rpl-clr-neutral-300)`,
          borderRadius: `var(${item.var})`
        })
      }
    },
    template: `
      <sbTokenTable :columns="columns" full>
        <sbTokenTableRow v-for="item in items" :key="item">
          <sbTokenTableCol>{{ item.value }}</sbTokenTableCol>
          <sbTokenTableCol>
            <div :style="getExampleStyles(item)"></div>
          </sbTokenTableCol>
          <sbTokenTableCol>{{ item.var }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const BorderWidth: StoryObj = {
  render: (args: any) => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      const items = Object.keys(rplLayerStyles?.border)
        .filter((k) => !isNaN(Number(k)))
        .map((k) => ({
          var: `--rpl-border-${k}`,
          ...rplLayerStyles.border[k]
        }))
      return {
        ...args,
        items,
        getExampleStyles: (item: any) => ({
          width: 'calc(var(--rpl-sp-4) * 4)',
          height: 'var(--rpl-sp-4)',
          border: `1px solid var(--rpl-clr-neutral-300)`,
          borderWidth: `var(${item.var})`
        })
      }
    },
    template: `
      <sbTokenTable :columns="columns">
        <sbTokenTableRow v-for="item in items" :key="item">
          <sbTokenTableCol>{{ item.value }}</sbTokenTableCol>
          <sbTokenTableCol>
            <div :style="getExampleStyles(item)"></div>
          </sbTokenTableCol>
          <sbTokenTableCol>{{ item.var }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const BorderStyle: StoryObj = {
  render: (args: any) => ({
    components: { sbTokenTable, sbTokenTableRow, sbTokenTableCol },
    setup() {
      return {
        ...args,
        items: [
          {
            value: 'Solid',
            label: '--rpl-border-solid'
          }
        ],
        getExampleStyles: () => ({
          width: 'calc(var(--rpl-sp-4) * 4)',
          height: 'var(--rpl-sp-4)',
          border: `1px solid var(--rpl-clr-dark)`
        })
      }
    },
    template: `
      <sbTokenTable :columns="columns">
        <sbTokenTableRow v-for="item in items" :key="item">
          <sbTokenTableCol>{{ item.value }}</sbTokenTableCol>
          <sbTokenTableCol>
            <div
              style="width: calc(var(--rpl-sp-4) * 4); height: var(--rpl-sp-4); border: 1px solid var(--rpl-clr-dark)"
            ></div>
          </sbTokenTableCol>
          <sbTokenTableCol>{{ item.label }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const Elevation: StoryObj = {
  render: (args: any) => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      const items = Object.keys(rplLayerStyles?.elevation).map((k) => ({
        var: `--rpl-elevation-${k}`,
        ...rplLayerStyles.elevation[k]
      }))
      return {
        ...args,
        items,
        getExampleStyles: (item: any) => ({
          width: 'calc(var(--rpl-sp-4) * 4)',
          height: 'var(--rpl-sp-4)',
          border: `1px solid var(--rpl-clr-neutral-200)`,
          boxShadow: `var(${item.var})`
        })
      }
    },
    template: `
      <sbTokenTable :columns="columns">
        <sbTokenTableRow v-for="item in items" :key="item">
          <sbTokenTableCol>{{ item.comment }}</sbTokenTableCol>
          <sbTokenTableCol>
            <div :style="getExampleStyles(item)"></div>
          </sbTokenTableCol>
          <sbTokenTableCol>{{ item.var }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}
