import type { Meta, StoryObj } from '@storybook/vue3'
import RplDataTable from './RplDataTable.vue'
import { bpMin } from '../../lib/breakpoints'
import {
  RplDataTableColumns,
  RplDataTableItems,
  RplDataTableColumnConfig,
  RplDataTableComplexItems,
  RplDataTableObjectKeyColumnConfig,
  RplDataTableObjectKeyColumnHTMLConfig,
  RplDataTableObjects,
  RplDataTableStructuredColumns,
  RplDataTableStructuredItems,
  RplDataTableExtraComponents,
  RplDataTableItemsSimple,
  RplDataTableMixedColumns,
  RplDataTableMixedItems,
  RplDataTableColumnsCustom,
  RplDataTableItemsCustom
} from './fixtures/sample'

type ExtendedPDataTableProps = Partial<typeof RplDataTable> & {
  columns: Partial<typeof RplDataTable>['columns'] & { component: any }
}

export default {
  title: 'Core/Containers/Data table',
  component: RplDataTable,
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['row', 'column']
    }
  }
} satisfies Meta<ExtendedPDataTableProps>

type Story = StoryObj<ExtendedPDataTableProps>

export const CustomContent: Story = {
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    caption: 'Optional table caption',
    footer: 'Optional table footer',
    columns: RplDataTableColumns,
    items: RplDataTableItems,
    showExtraContent: true,
    headingType: { horizontal: true, vertical: true }
  }
}

export const ComponentCellRenderers: Story = {
  args: {
    caption: 'Fastest animals',
    footer: 'Optional table footer',
    columns: RplDataTableColumnConfig,
    items: RplDataTableComplexItems,
    headingType: { horizontal: true, vertical: true }
  }
}

export const ObjectKeyCellRenderers: Story = {
  args: {
    caption: 'Fastest animals',
    footer: 'Optional table footer',
    columns: RplDataTableObjectKeyColumnConfig,
    items: RplDataTableObjects,
    headingType: { horizontal: true, vertical: false }
  }
}

export const StructuredContent: Story = {
  args: {
    caption: 'Optional table caption',
    footer: 'Optional table footer',
    columns: RplDataTableStructuredColumns,
    items: RplDataTableStructuredItems,
    headingType: { horizontal: true, vertical: true },
    showExtraContent: true,
    offset: 1
  }
}

export const MoreComponent: Story = {
  args: {
    caption: 'Pets',
    footer: 'Extra content displayed without offset',
    columns: RplDataTableObjectKeyColumnConfig,
    items: RplDataTableExtraComponents,
    headingType: { horizontal: true, vertical: true },
    showExtraContent: true,
    offset: 0
  }
}

export const HtmlHeadings: Story = {
  args: {
    caption: 'Pets II: The Return',
    footer: 'HTML passed through to headings',
    columns: RplDataTableObjectKeyColumnHTMLConfig,
    items: RplDataTableExtraComponents,
    headingType: { horizontal: true, vertical: true },
    showExtraContent: true,
    offset: 0
  }
}

export const Simple: Story = {
  args: {
    columns: RplDataTableColumns,
    items: RplDataTableItemsSimple
  }
}

export const NoHeadings: Story = {
  args: {
    columns: RplDataTableColumns,
    items: RplDataTableItemsSimple,
    headingType: { horizontal: false, vertical: false }
  }
}

export const ColumnOrientedNoHeadings: Story = {
  name: 'Column Oriented - No Headings',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    columns: RplDataTableColumnsCustom,
    items: RplDataTableItemsCustom,
    headingType: {
      vertical: false,
      horizontal: false
    },
    orientation: 'column'
  }
}

export const ColumnOrientedHorizontalHeadings: Story = {
  name: 'Column Oriented - Horizontal Headings',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    columns: RplDataTableColumnsCustom,
    items: RplDataTableItemsCustom,
    headingType: {
      vertical: false,
      horizontal: true
    },
    orientation: 'column'
  }
}

export const ColumnOrientedVerticalHeadings: Story = {
  name: 'Column Oriented - Vertical Headings',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    columns: RplDataTableMixedColumns,
    items: RplDataTableMixedItems,
    headingType: {
      vertical: true,
      horizontal: false
    },
    orientation: 'column'
  }
}

export const ColumnOrientedDualHeadings: Story = {
  name: 'Column Oriented - Dual Headings',
  parameters: {
    chromatic: {
      viewports: [bpMin.s, bpMin.l]
    }
  },
  args: {
    columns: RplDataTableMixedColumns,
    items: RplDataTableMixedItems,
    headingType: {
      vertical: true,
      horizontal: true
    },
    orientation: 'column'
  }
}
