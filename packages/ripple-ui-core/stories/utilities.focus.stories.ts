import { Meta, StoryObj } from '@storybook/vue3'
// @ts-ignore: Cannot find module
import rplSpacing from '../src/tokens/settings/spacing.yaml'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'
import RplIcon from './../src/components/icon/RplIcon.vue'
import RplButton from './../src/components/button/RplButton.vue'

export default {
  title: 'Base Styles/Utilities',
  argTypes: {
    columns: { table: { disable: true } }
  }
} satisfies Meta

export const Focus: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch,
      RplIcon,
      RplButton
    },
    setup() {
      const items = Object.keys(rplSpacing?.sp).map((k) => rplSpacing.sp[k])
      return {
        columns: [
          'Example',
          '.rpl-u-focusable-outline--alt-colour',
          'Utility class'
        ],
        items
      }
    },
    template: `
      <sbTokenTable :columns="columns" full>
        <sbTokenTableRow lined>
          <sbTokenTableCol>
            <div class="sb-demo-container">
              <p class="rpl-type-p rpl-u-margin-b-4">
                <a href="#" class="rpl-u-focusable-inline">A multiline link to test the inline focus style</a>
              </p>
              <p class="rpl-type-p">
                <a href="#" class="rpl-u-focusable-inline rpl-u-focusable--force-on">A multiline link to test the inline focus style</a>
              </p>
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>
            <div class="sb-demo-container sb-demo-container--dark">
              <p class="rpl-type-p rpl-u-margin-b-4">
                <a href="#" class="rpl-u-focusable-inline rpl-u-focusable--alt-colour">A multiline link to test the inline focus style</a>
              </p>
              <p class="rpl-type-p">
                <a href="#" class="rpl-u-focusable-inline rpl-u-focusable--alt-colour rpl-u-focusable--force-on">A multiline link to test the inline focus style</a>
              </p>
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>.rpl-u-focusable-inline</sbTokenTableCol>
        </sbTokenTableRow>
        <sbTokenTableRow lined>
          <sbTokenTableCol>
            <div class="sb-demo-container">
              <a href="#" class="rpl-type-p rpl-u-margin-b-4 rpl-u-focusable-block">A multiline link to test the block focus style</a>
              <a href="#" class="rpl-type-p rpl-u-focusable-block rpl-u-focusable--force-on">A multiline link to test the block focus style</a>
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>
            <div class="sb-demo-container sb-demo-container--dark">
              <a href="#" class="rpl-type-p rpl-u-margin-b-4 rpl-u-focusable-block rpl-u-focusable--alt-colour">A multiline link to test the block focus style</a>
              <a href="#" class="rpl-type-p rpl-u-focusable-block rpl-u-focusable--alt-colour rpl-u-focusable--force-on">A multiline link to test the block focus style</a>
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>.rpl-u-focusable-block</sbTokenTableCol>
        </sbTokenTableRow>
        <sbTokenTableRow lined>
          <sbTokenTableCol>
            <div class="sb-demo-container">
              <input type="text" placeholder="With border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline" />
              <input type="text" placeholder="With border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--force-on" />
              <input type="text" placeholder="Rounded" class="sb-demo-input sb-demo-input--rounded rpl-u-margin-b-4 rpl-u-focusable-outline" />
              <input type="text" placeholder="Rounded" class="sb-demo-input sb-demo-input--rounded rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--force-on" />
              <input type="text" placeholder="Without border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable-outline--no-border" />
              <input type="text" placeholder="Without border" class="sb-demo-input rpl-u-focusable-outline rpl-u-focusable-outline--no-border rpl-u-focusable--force-on" />
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>
            <div class="sb-demo-container sb-demo-container--dark">
              <input type="text" placeholder="With border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--alt-colour" />
              <input type="text" placeholder="With border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--alt-colour rpl-u-focusable--force-on" />
              <input type="text" placeholder="Rounded" class="sb-demo-input sb-demo-input--rounded rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--alt-colour" />
              <input type="text" placeholder="Rounded" class="sb-demo-input sb-demo-input--rounded rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable--alt-colour rpl-u-focusable--force-on" />
              <input type="text" placeholder="Without border" class="sb-demo-input rpl-u-margin-b-4 rpl-u-focusable-outline rpl-u-focusable-outline--no-border rpl-u-focusable--alt-colour" />
              <input type="text" placeholder="Without border" class="sb-demo-input rpl-u-focusable-outline rpl-u-focusable-outline--no-border rpl-u-focusable--alt-colour rpl-u-focusable--force-on" />
            </div>
          </sbTokenTableCol>
          <sbTokenTableCol>.rpl-u-focusable-outline<br>.rpl-u-focusable-outline--no-border</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}
