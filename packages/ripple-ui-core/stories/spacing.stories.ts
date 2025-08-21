import { Meta, StoryObj } from '@storybook/vue3'
// @ts-ignore: Cannot find module
import rplSpacing from '../src/tokens/settings/spacing.yaml'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'

export default {
  title: 'Base Styles/Layout',
  argTypes: {
    columns: { table: { disable: true } }
  }
} satisfies Meta

export const Spacing: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      const items = Object.keys(rplSpacing?.sp).map((k) => rplSpacing.sp[k])
      return {
        columns: ['Size (px)'],
        items
      }
    },
    template: `
      <sbTokenTable :columns="columns">
        <sbTokenTableRow lined v-for="(item, i) in items" :key="item">
          <sbTokenTableCol collapse width="10%">{{ item.value }}</sbTokenTableCol>
          <sbTokenTableCol center>
            <sbTokenTableSwatch :size="item.value" :color="item.color">{{ item.value }}</sbTokenTableSwatch>
          </sbTokenTableCol>
          <sbTokenTableCol>--rpl-sp-{{ i + 1 }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}
