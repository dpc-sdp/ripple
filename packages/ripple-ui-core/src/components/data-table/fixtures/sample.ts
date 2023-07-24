import { ref, defineAsyncComponent } from 'vue'

export const RplDataTableColumns = [
  'Column 1',
  'Column 2',
  'Column 3',
  'Column 4'
]

export const RplDataTableItems = [
  [
    'R1 - C1',
    'R1 - C2',
    'R1 - C3',
    'R1 - C4',
    ['<p><strong>R1 test heading</strong></p><p>R1 test content</p>']
  ],
  [
    'R2 - C1',
    'R2 - C2',
    'R2 - C3',
    'R2 - C4',
    ['<p><strong>R2 test heading</strong></p><p>R2 test content</p>']
  ],
  ['R3 - C1', 'R3 - C2', 'R3 - C3', 'R3 - C4', ['R3 test content text only']]
]

export const RplDataTableComplexItems = [
  [
    {
      title: 'Turtle',
      url: 'www.google.com'
    },
    'Slow',
    'Reptile'
  ],
  [
    {
      title: 'Dog',
      url: 'www.google.com'
    },
    'Medium',
    'Mammal'
  ],
  [
    {
      title: 'Horse',
      url: 'www.google.com'
    },
    'Fast',
    'Mammal'
  ],
  [
    {
      title: 'Cheetah',
      url: 'www.google.com'
    },
    'Fastest',
    'Mammal'
  ]
]

const basicComponent = {
  props: {
    item: Object
  },
  template: `
    <a :href="item.url">
      {{ item.title }}
    </a>`
}

export const RplDataTableColumnConfig = [
  {
    label: 'Name',
    component: basicComponent
  },
  'Speed',
  'Type'
]
