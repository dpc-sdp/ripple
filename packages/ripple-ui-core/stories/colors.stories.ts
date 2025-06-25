import { Meta, StoryObj } from '@storybook/vue3'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'
import { getColorSwatches, getColorSwatchCollection, tokens } from './colors'

export default {
  title: 'Base Styles/Colors',
  argTypes: {
    columns: { table: { disable: true } }
  }
} satisfies Meta

const Template = (args: any) => ({
  components: {
    sbTokenTable,
    sbTokenTableRow,
    sbTokenTableCol,
    sbTokenTableSwatch
  },
  setup() {
    return { args }
  },
  template: `
    <sbTokenTable :columns="args.columns">
      <sbTokenTableRow v-for="item in args.items" :key="item">
        <sbTokenTableCol>{{ item.value }}</sbTokenTableCol>
        <sbTokenTableCol collapse width="50px">
          <sbTokenTableSwatch :size="24" :color="'var('+item.var+')'"></sbTokenTableSwatch>
        </sbTokenTableCol>
        <sbTokenTableCol expand>{{ item.var }}</sbTokenTableCol>
      </sbTokenTableRow>
    </sbTokenTable>
  `
})

export const Primary: StoryObj = {
  render: Template,
  args: {
    columns: ['Primary'],
    items: getColorSwatchCollection('clr.primary')
  }
}

export const Accent: StoryObj = {
  render: Template,
  args: {
    columns: ['Accent'],
    items: getColorSwatchCollection('clr.accent')
  }
}

export const Type: StoryObj = {
  render: Template,
  args: {
    columns: ['Type'],
    items: getColorSwatches([
      'clr.type.default',
      'clr.type.light',
      'clr.type.primary.contrast',
      'clr.type.accent.contrast'
    ])
  }
}

export const Link: StoryObj = {
  render: Template,
  args: {
    columns: ['Link'],
    items: getColorSwatches(['clr.link', 'clr.link-visited', 'clr.focus'])
  }
}

export const Neutral: StoryObj = {
  render: Template,
  args: {
    columns: ['Neutrals'],
    items: getColorSwatchCollection('clr.neutral')
  }
}

export const Helper: StoryObj = {
  render: Template,
  args: {
    columns: ['Helper'],
    items: getColorSwatches(['clr.light', 'clr.dark'])
  }
}

export const Semantic: StoryObj = {
  render: Template,
  args: {
    columns: ['Semantic'],
    items: getColorSwatches([
      'clr.information._',
      'clr.information.light',
      'clr.information.dark',
      'clr.success._',
      'clr.success.light',
      'clr.success.dark',
      'clr.warning._',
      'clr.warning.light',
      'clr.warning.dark',
      'clr.error._',
      'clr.error.light',
      'clr.error.dark'
    ])
  }
}

const GradientTemplate = (args: any) => ({
  components: {
    sbTokenTable,
    sbTokenTableRow,
    sbTokenTableCol,
    sbTokenTableSwatch
  },
  setup() {
    return { args }
  },
  template: `
    <sbTokenTable :columns="args.columns">
      <sbTokenTableRow v-for="item in args.items" :key="item">
        <sbTokenTableCol>{{ item.value }}</sbTokenTableCol>
        <sbTokenTableCol v-if="item.bgvar" collapse width="50px">
          <sbTokenTableSwatch :size="24" :style="'background: var('+item.bgvar+')'"></sbTokenTableSwatch>
        </sbTokenTableCol>
        <sbTokenTableCol v-else collapse width="50px">
          <sbTokenTableSwatch :size="24" :style="'background: '+item.var+''"></sbTokenTableSwatch>
        </sbTokenTableCol>
        <sbTokenTableCol expand>{{ item.label }}</sbTokenTableCol>
      </sbTokenTableRow>
    </sbTokenTable>
  `
})

export const Gradient: StoryObj = {
  render: GradientTemplate,
  args: {
    columns: ['Gradient'],
    items: [
      {
        value: '',
        bgvar: '--rpl-clr-gradient-horizontal',
        label: '--rpl-clr-gradient-horizontal'
      },
      {
        value: '',
        bgvar: '--rpl-clr-gradient-vertical',
        label: '--rpl-clr-gradient-vertical'
      },
      ...Object.keys(tokens.theme.clr.gradient).map((v: string) => ({
        value: tokens.theme.clr.gradient[v],
        var: tokens.theme.clr.gradient[v],
        label: v + '%'
      }))
    ]
  }
}
