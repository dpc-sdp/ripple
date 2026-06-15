export const RplDataTableColumns = [
  { label: 'Column 1', objectKey: 'col1' },
  { label: 'Column 2', objectKey: 'col2' },
  { label: 'Column 3', objectKey: 'col3' },
  { label: 'Column 4', objectKey: 'col4' }
]

export const RplDataTableItems = [
  {
    col1: 'R1 - C1',
    col2: 'R1 - C2',
    col3: 'R1 - C3',
    col4: 'R1 - C4',
    __extraContent: {
      html: '<p><strong>R1 test heading</strong></p><p>R1 test content</p>'
    }
  },
  {
    col1: 'R2 - C1',
    col2: 'R2 - C2',
    col3: 'R2 - C3',
    col4: 'R2 - C4',
    __extraContent: {
      html: '<p><strong>R2 test heading</strong></p><p><em>R2 test content</em></p>'
    }
  },
  {
    col1: 'R3 - C1',
    col2: 'R3 - C2',
    col3: 'R3 - C3',
    col4: 'R3 - C4',
    __extraContent: {
      html: 'R3 test content text only'
    }
  }
]

export const RplDataTableItemsSimple = [
  {
    col1: 'R1 - C1',
    col2: 'R1 - C2',
    col3: 'R1 - C3',
    col4: 'R1 - C4'
  },
  {
    col1: 'R2 - C1',
    col2: 'R2 - C2',
    col3: 'R2 - C3',
    col4: 'R2 - C4'
  },
  {
    col1: 'R3 - C1',
    col2: 'R3 - C2',
    col3: 'R3 - C3',
    col4: 'R3 - C4'
  },
  {
    col1: 'R4 - C1',
    col2: 'R4 - C2',
    col3: 'R4 - C3',
    col4: 'R4 - C4'
  }
]

export const RplDataTableStructuredColumns = [
  { label: 'Column 1', objectKey: 'col1' },
  { label: 'Column 2', objectKey: 'col2' },
  { label: 'Column 3', objectKey: 'col3' },
  { label: 'Column 4', objectKey: 'col4' }
]

export const RplDataTableStructuredItems = [
  {
    col1: 'R1 - C1',
    col2: 'R1 - C2',
    col3: 'R1 - C3',
    col4: 'R1 - C4',
    __extraContent: {
      items: [
        {
          heading: 'R1 test heading',
          content: 'R1 test content'
        },
        {
          heading: 'R1 test heading 2',
          content: 'R1 test content 2'
        }
      ]
    }
  },
  {
    col1: 'R2 - C1',
    col2: 'R2 - C2',
    col3: 'R2 - C3',
    col4: 'R2 - C4',
    __extraContent: {
      items: [
        {
          heading: 'R2 test heading',
          content: 'R2 test content'
        },
        {
          heading: 'R2 test heading 2',
          content: 'R2 test content 2'
        },
        {
          heading: 'R2 test heading 3',
          content: 'R2 test content 3'
        }
      ]
    }
  },
  {
    col1: 'R3 - C1',
    col2: 'R3 - C2',
    col3: 'R3 - C3',
    col4: 'R3 - C4',
    col5: 'R3 - Extra content cell',
    col6: 'R3 - Extra content cell value rendered with custom component',
    __extraContent: {
      items: [
        {
          heading: 'R3 with object key',
          objectKey: 'col5'
        },
        {
          heading: 'R3 with object key',
          objectKey: 'col6',
          component: {
            props: {
              item: Object,
              column: Object
            },
            template: `
              <RplLink url="#">
                {{ item[column.objectKey] }}
              </RplLink>`
          }
        }
      ]
    }
  },
  {
    col1: 'R4 - C1',
    col2: 'R4 - C2',
    col3: 'R4 - C3',
    col4: 'R4 - C4'
  },
  {
    col1: 'R5 - C1',
    col2: 'R5 - C2',
    col3: 'R5 - C3',
    col4: 'R5 - C4'
  }
]

export const RplDataTableComplexItems = [
  {
    title: 'Turtle',
    url: 'https://www.google.com',
    speed: 'Slow',
    type: 'Reptile'
  },
  {
    title: 'Dog',
    url: 'https://duckduckgo.com',
    speed: 'Medium',
    type: 'Mammal'
  },
  {
    title: 'Horse',
    url: 'https://www.vic.gov.au',
    speed: 'Fast',
    type: 'Mammal'
  },
  {
    title: 'Cheetah',
    url: 'https://www.ripple.sdp.vic.gov.au',
    speed: 'Fastest',
    type: 'Mammal'
  }
]

export const RplDataTableColumnConfig = [
  {
    label: 'Name',
    component: {
      props: {
        item: Object
      },
      template: `
        <a :href="item.url">
          {{ item.title }}
        </a>`
    }
  },
  {
    label: 'Speed',
    objectKey: 'speed'
  },
  {
    label: 'Type',
    objectKey: 'type'
  }
]

export const RplDataTableObjectKeyColumnConfig = [
  {
    label: 'Name',
    objectKey: 'name'
  },
  {
    label: 'Age',
    objectKey: 'age'
  },
  {
    label: 'Animal Type',
    objectKey: 'type'
  }
]

export const RplDataTableObjectKeyColumnHTMLConfig = [
  {
    label: '<em>Nominative descriptor</em>',
    objectKey: 'name',
    isLabelHTML: true
  },
  {
    label: 'Duration<sup>1</sup>',
    objectKey: 'age',
    isLabelHTML: true
  },
  {
    label: 'Species',
    objectKey: 'type'
  }
]

export const RplDataTableObjects = [
  {
    name: 'George',
    age: 20,
    type: 'Lizard'
  },
  {
    name: 'Fred',
    age: 50,
    type: 'Cat'
  },
  {
    name: 'Sue',
    age: 20,
    type: 'Dog'
  },
  {
    name: 'Megan',
    age: 30,
    type: 'Bird'
  }
]

export const RplDataTableExtraComponents = [
  {
    name: 'George',
    age: 20,
    type: 'Lizard',
    image: '/img/image-landscape-s.jpg',
    __extraContent: {
      component: {
        props: {
          item: Object
        },
        template: `<RplImg :src="item.image" width="200" />`
      }
    }
  },
  {
    name: 'Fred',
    age: 50,
    type: 'Cat',
    __extraContent: {
      component: {
        props: {
          item: Object
        },
        template: `
          <h4>{{ item.name }} the {{ item.age }} year old {{ item.type }} was an inspiration to us all.</h4>`
      }
    }
  },
  {
    name: 'Sue',
    age: 20,
    type: 'Dog',
    __extraContent: {
      component: {
        props: {
          item: Object
        },
        template: `
          <RplLink url="#">
            Find out more about {{ item.name }} the {{ item.age }} year old {{ item.type }}
          </RplLink>`
      }
    }
  }
]

export const RplDataTableMixedColumns = [
  { label: 'Design plan', objectKey: 'col0' },
  {
    label: 'Time frame',
    component: {
      props: {
        item: Object
      },
      template: `⏰ {{ item.col1 }}`
    }
  },
  { label: 'Budget <sup>$</sup>', objectKey: 'col2', isLabelHTML: true },
  { label: 'Risk', objectKey: 'col3', isHTML: true }
]

export const RplDataTableMixedItems = [
  {
    col0: 'Design ideas',
    col1: '2-4 weeks',
    col2: '$50k',
    col3: 'High <sup>H</sup>'
  },
  {
    col0: 'Co-design solutions',
    col1: '8-10 weeks',
    col2: '$60k',
    col3: 'Medium <sup>M</sup>'
  },
  {
    col0: 'Single solution',
    col1: '12 weeks',
    col2: '$100k',
    col3: 'Low <sup>L</sup>'
  },
  {
    col0: 'Development',
    col1: '16 weeks',
    col2: '$125k',
    col3: 'High <sup>H</sup>'
  }
]

export const RplDataTableColumnsCustom = [
  {
    label: 'Fruit',
    objectKey: 'col0'
  },
  { label: 'Vegetable', objectKey: 'col1' },
  { label: 'Elements', objectKey: 'col2' }
]

export const RplDataTableItemsCustom = [
  { col0: 'Apple', col1: 'Potato', col2: 'Zinc' },
  { col0: 'Orange', col1: 'Broccoli', col2: 'Copper' },
  {
    col0: 'Banana',
    col1: 'Pumpkin',
    col2: 'Iron'
  },
  { col0: 'Pear', col1: 'Carrot', col2: 'Bronze' },
  { col0: 'Mango', col1: 'Mushrooms', col2: 'Slate' }
]
