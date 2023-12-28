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
      html: '<p><strong>R2 test heading</strong></p><p>R2 test content</p>'
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
    __extraContent: {
      items: [
        {
          heading: 'R3 test heading',
          content: 'R3 test content'
        }
      ]
    }
  }
]

export const RplDataTableComplexItems = [
  {
    title: 'Turtle',
    url: 'www.google.com',
    speed: 'Slow',
    type: 'Reptile'
  },
  {
    title: 'Dog',
    url: 'www.google.com',
    speed: 'Medium',
    type: 'Mammal'
  },
  {
    title: 'Horse',
    url: 'www.google.com',
    speed: 'Fast',
    type: 'Mammal'
  },
  {
    title: 'Cheetah',
    url: 'www.google.com',
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
