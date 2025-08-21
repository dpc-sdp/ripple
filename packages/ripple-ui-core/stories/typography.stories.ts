import { Meta, StoryObj } from '@storybook/vue3'
import { RplTypeStyles } from './constants'
import sbTokenTable from './components/token-table.vue'
import sbTokenTableRow from './components/token-row.vue'
import sbTokenTableCol from './components/token-col.vue'
import sbTokenTableSwatch from './components/token-swatch.vue'

export default {
  title: 'Base Styles/Typography',
  argTypes: {
    columns: { table: { disable: true } }
  }
} satisfies Meta

export const Lists: StoryObj = {
  render: () => ({
    components: {
      sbTokenTable,
      sbTokenTableRow,
      sbTokenTableCol,
      sbTokenTableSwatch
    },
    setup() {
      return {
        columns: ['Style', 'class'],
        items: RplTypeStyles
      }
    },
    template: `
      <div>
        <p class="rpl-type-p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed
          lorem at magna hendrerit eleifend sed non mauris. Praesent ut libero eu
          sapien accumsan mollis sit amet a massa.
        </p>
        <ol class="rpl-type-list-ol">
          <li>Ordered list item / L1</li>
          <li>Another ordered list item / L1
            <ol class="rpl-type-list-ol">
              <li>Ordered list item / L2</li>
              <li>Another ordered list item / L2
                <ol class="rpl-type-list-ol">
                  <li>Ordered list item / L3</li>
                  <li>Another ordered list item / L3</li>
                  <li>Yet another ordered list item / L3</li>
                  <li>Even more ordered list item / L3</li>
                </ol>
              </li>
            </ol>
          </li>
          <li>Another ordered list item / L1 lorem ipsum dolor sit amet</li>
        </ol>
        <ol class="rpl-type-list-ol">
          <li>Ordered list item / L1</li>
          <li>Another ordered list item / L1
            <ul class="rpl-type-list-ul">
              <li>Ordered list item / L2</li>
              <li>Another ordered list item / L2
                <ol class="rpl-type-list-ol">
                  <li>Ordered list item / L3</li>
                  <li>Another ordered list item / L3</li>
                  <li>Yet another ordered list item / L3</li>
                  <li>Even more ordered list item / L3</li>
                </ol>
              </li>
            </ul>
          </li>
        </ol>
        <ul class="rpl-type-list-ul">
          <li>Unordered list item / L1</li>
          <li>Another Unordered list item / L1
            <ul class="rpl-type-list-ul">
              <li>Unordered list item / L2</li>
              <li>Another Unordered list item / L2
              </li>
            </ul>
          </li>
        </ul>
      </div>
    `
  })
}

export const Typography: StoryObj = {
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
        items: RplTypeStyles
      }
    },
    template: `
      <sbTokenTable :columns="columns" full class="rpl-u-margin-b-10">
        <sbTokenTableRow lined v-for="item in items" :key="item">
          <sbTokenTableCol><span :class="item.class">{{ item.title }}</span></sbTokenTableCol>
          <sbTokenTableCol>{{ item.class }}</sbTokenTableCol>
        </sbTokenTableRow>
      </sbTokenTable>
    `
  })
}

export const Hyphenation: StoryObj = {
  render: () => ({
    template: `
    <section style="display:flex; justify-content:space-between;">
      <div class="rpl-u-padding-3" style="width:50%;max-width:240px;background:var(--rpl-clr-accent-alt)">
        <h1 class="rpl-type-h1">An inappropriately long title to demonstrate hyphenation on a small screen.</h1>
      </div>
      <div class="rpl-u-padding-3" style="width:50%;max-width:240px;background:var(--rpl-clr-accent-alt)">
        <h1 class="rpl-type-h1 rpl-u-hyphenate">An inappropriately long title to demonstrate hyphenation on a small screen.</h1>
      </div>
    </section>
  `
  })
}
