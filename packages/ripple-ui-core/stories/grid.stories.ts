import { Meta, StoryObj } from '@storybook/vue3'

export default {
  title: 'Base Styles/Grid',
  decorators: [
    () => ({ template: '<div class="rpl-storybook__grid"><story /></div>' })
  ]
} satisfies Meta

const template = (template: string) => () => ({ template })

export const GridColumnsXSDefault: StoryObj = {
  name: 'Grid/Columns/XS - Default',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12">Span 12</div>
      <div class="rpl-col-6">Span 6</div>
      <div class="rpl-col-6">Span 6</div>
    </div>
  `)
}

export const GridColumnsS: StoryObj = {
  name: 'Grid/Columns/S',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12-s">Span 12 - S</div>
      <div class="rpl-col-6-s">Span 6 - S</div>
      <div class="rpl-col-6-s">Span 6 - S</div>
      <div class="rpl-col-4-s">Span 4 - S</div>
      <div class="rpl-col-4-s">Span 4 - S</div>
      <div class="rpl-col-4-s">Span 4 - S</div>
      <div class="rpl-col-7-s">Span 7 - S</div>
      <div class="rpl-col-4-s rpl-col-start-9-s">Span 4 - S, Start at 9 - S</div>
    </div>
  `)
}

export const GridColumnsM: StoryObj = {
  name: 'Grid/Columns/M',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12-m">Span 12 - M</div>
      <div class="rpl-col-6-m">Span 6 - M</div>
      <div class="rpl-col-6-m">Span 6 - M</div>
      <div class="rpl-col-4-m">Span 4 - M</div>
      <div class="rpl-col-4-m">Span 4 - M</div>
      <div class="rpl-col-4-m">Span 4 - M</div>
      <div class="rpl-col-7-m">Span 7 - M</div>
      <div class="rpl-col-4-m rpl-col-start-9-m">Span 4 - M, Start at 9 - M</div>
    </div>
  `)
}

export const GridColumnsL: StoryObj = {
  name: 'Grid/Columns/L',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12-l">Span 12 - L</div>
      <div class="rpl-col-6-l">Span 6 - L</div>
      <div class="rpl-col-6-l">Span 6 - L</div>
      <div class="rpl-col-4-l">Span 4 - L</div>
      <div class="rpl-col-4-l">Span 4 - L</div>
      <div class="rpl-col-4-l">Span 4 - L</div>
      <div class="rpl-col-3-l">Span 3 - L</div>
      <div class="rpl-col-3-l">Span 3 - L</div>
      <div class="rpl-col-3-l">Span 3 - L</div>
      <div class="rpl-col-3-l">Span 3 - L</div>
      <div class="rpl-col-7-l">Span 7 - L</div>
      <div class="rpl-col-4-l rpl-col-start-9-l">Span 4 - L, Start at 9 - L</div>
    </div>
  `)
}

export const GridColumnsXL: StoryObj = {
  name: 'Grid/Columns/XL',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12-xl">Span 12 - XL</div>
      <div class="rpl-col-6-xl">Span 6 - XL</div>
      <div class="rpl-col-6-xl">Span 6 - XL</div>
      <div class="rpl-col-4-xl">Span 4 - XL</div>
      <div class="rpl-col-4-xl">Span 4 - XL</div>
      <div class="rpl-col-4-xl">Span 4 - XL</div>
      <div class="rpl-col-3-xl">Span 3 - XL</div>
      <div class="rpl-col-3-xl">Span 3 - XL</div>
      <div class="rpl-col-3-xl">Span 3 - XL</div>
      <div class="rpl-col-3-xl">Span 3 - XL</div>
      <div class="rpl-col-7-xl">Span 7 - XL</div>
      <div class="rpl-col-4-xl rpl-col-start-9-xl">Span 4 - XL, Start at 9 - XL</div>
    </div>
  `)
}

export const GridExampleSimple: StoryObj = {
  name: 'Grid/Example/Simple',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12 rpl-col-6-m rpl-col-3-l">Span 12 / 6 (M) / 3 (L)</div>
    </div>
  `)
}

export const GridExampleLayout: StoryObj = {
  name: 'Grid/Example/Layout',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-12"><u>Header</u></div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
      <div class="rpl-col-12 rpl-col-7-m rpl-col-start-1-m"></div>
      <div class="rpl-col-12 rpl-col-4-m rpl-col-start-9-m">Side menu</div>
    </div>
  `)
}

export const GridModifiersNoRowGap: StoryObj = {
  name: 'Grid/Modifiers/No row gap',
  render: template(`
    <div class="rpl-grid rpl-grid--no-row-gap">
      <div class="rpl-col-12"><u>Header</u></div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
      <div class="rpl-col-6 rpl-col-4-m rpl-col-3-l">Menu item</div>
    </div>
  `)
}

export const GridModifiersStartingColumn: StoryObj = {
  name: 'Grid/Modifiers/Starting column',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-2 rpl-col-start-1">Start at 1st</div>
      <div class="rpl-col-2 rpl-col-start-2">Start at 2nd</div>
      <div class="rpl-col-2 rpl-col-start-3">Start at 3rd</div>
      <div class="rpl-col-2 rpl-col-start-4">Start at 4th</div>
      <div class="rpl-col-2 rpl-col-start-5">Start at 5th</div>
      <div class="rpl-col-2 rpl-col-start-6">Start at 6th</div>
      <div class="rpl-col-2 rpl-col-start-7">Start at 7th</div>
      <div class="rpl-col-2 rpl-col-start-8">Start at 8th</div>
      <div class="rpl-col-2 rpl-col-start-9">Start at 9th</div>
      <div class="rpl-col-2 rpl-col-start-10">Start at 10th</div>
      <div class="rpl-col-2 rpl-col-start-11">Start at 11th</div>
      <div class="rpl-col-1 rpl-col-start-12">Start at 12th</div>
    </div>
  `)
}

export const GridModifiersNestedGrids: StoryObj = {
  name: 'Grid/Modifiers/Nested grids',
  render: template(`
    <div class="rpl-grid">
      <div class="rpl-col-6">
        Parent 6 cols
        <div class="rpl-grid">
          <div class="rpl-col-2">
            Child 2 cols
          </div>
          <div class="rpl-col-3 rpl-col-start-4">
            Child 3 cols (start at 4)
            <div class="rpl-grid">
              <div class="rpl-col-1">
                Child 1 col
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rpl-col-4 rpl-col-start-9">
        Parent 4 cols
        <div class="rpl-grid">
          <div class="rpl-col-2">
            Child 2 cols
          </div>
        </div>
      </div>
    </div>
  `)
}
