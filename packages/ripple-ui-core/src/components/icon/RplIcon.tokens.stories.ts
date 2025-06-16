import type { Meta, StoryObj } from '@storybook/vue3'
import RplIcon from './RplIcon.vue'
import sbTokenTable from './../../../stories/components/token-table.vue'
import sbTokenTableRow from './../../../stories/components/token-row.vue'
import sbTokenTableCol from './../../../stories/components/token-col.vue'
import sbTokenTableSwatch from './../../../stories/components/token-swatch.vue'
import {
  RplCoreIconNames,
  RplCustomIconNames,
  RplIconGroups,
  RplIconSizes
} from './constants'
import { RplColorThemes } from '../../lib/constants'

type ExtendedIconProps = Partial<typeof RplIcon> & {
  items: any
  columns: string[]
}

export default {
  title: 'Base Styles/Icons',
  parameters: { viewMode: 'docs' },
  argTypes: {
    colour: {
      control: { type: 'select' },
      options: RplColorThemes
    },
    size: {
      control: { type: 'select' },
      options: RplIconSizes
    }
  },
  args: {
    colour: 'default',
    size: 'm'
  }
} satisfies Meta<ExtendedIconProps>

type Story = StoryObj<ExtendedIconProps>

const IconListTemplate = (args: any) => ({
  components: {
    sbTokenTable,
    sbTokenTableRow,
    sbTokenTableCol,
    sbTokenTableSwatch,
    RplIcon
  },
  setup() {
    return { args }
  },
  template: `
      <sbTokenTable :columns="args.columns">
        <sbTokenTableRow v-for="item in args.items" :key="item">
          <sbTokenTableCol>{{ item }}</sbTokenTableCol>
          <sbTokenTableCol>
            <RplIcon :name="item" :colour="args.colour" :size="args.size"/>
          </sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
})

export const Alert: Story = {
  render: IconListTemplate,
  name: 'Alert',
  args: {
    columns: ['Alert'],
    items: RplIconGroups.alert
  }
}

export const Social: Story = {
  render: IconListTemplate,
  name: 'Social',
  args: {
    columns: ['Social'],
    items: RplIconGroups.social
  }
}

export const Standard: Story = {
  render: IconListTemplate,
  name: 'Standard',
  args: {
    columns: ['Standard'],
    items: RplIconGroups.standard
  }
}

const IconSpriteSheetOnDemandTemplate = (args: any) => ({
  components: {
    sbTokenTable,
    sbTokenTableRow,
    sbTokenTableCol,
    sbTokenTableSwatch,
    RplIcon
  },
  setup() {
    return { args }
  },
  template: `
      <sbTokenTable :columns="args.columns">
        <sbTokenTableRow v-for="item in args.items" :key="item">
          <sbTokenTableCol>{{ item }}</sbTokenTableCol>
          <sbTokenTableCol>
            <RplIcon :name="item" :colour="args.colour" :size="args.size"/>
          </sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
})

export const IconsInSpriteSheet: Story = {
  render: IconSpriteSheetOnDemandTemplate,
  name: 'Icons in sprite sheet',
  args: {
    columns: ['Sprite sheet'],
    items: RplCoreIconNames
  }
}

export const IconsOnDemand: Story = {
  render: IconSpriteSheetOnDemandTemplate,
  name: 'Icons on demand',
  args: {
    columns: ['On Demand'],
    items: RplCustomIconNames
  }
}
