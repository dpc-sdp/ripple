export const primaryNavItems = [
  {
    id: '1',
    text: 'First level A',
    href: '#',
    items: [
      {
        id: '2',
        text: 'Second level A',
        href: '#',
        items: [
          {
            id: '3',
            text: 'Third level A link with some text that will need to wrap',
            href: '#',
            items: [{ id: '4', text: 'Fourth level A', href: '#' }]
          }
        ]
      },
      { id: '5', text: 'Second level C', href: '#' },
      { id: '6', text: 'Second level D', href: '#' },
      { id: '7', text: 'Second level E', href: '#' },
      { id: '8', text: 'Second level F', href: '#' },
      { id: '9', text: 'Second level G', href: '#' },
      { id: '10', text: 'Second level H', href: '#' },
      { id: '11', text: 'Second level I', href: '#' },
      { id: '12', text: 'Second level J', href: '#' },
      { id: '13', text: 'Second level K', href: '#' },
      { id: '14', text: 'Second level L', href: '#' },
      { id: '15', text: 'Second level M', href: '#' },
      { id: '16', text: 'Second level N', href: '#' },
      { id: '17', text: 'Second level O', href: '#' },
      { id: '18', text: 'Second level P', href: '#' },
      { id: '19', text: 'Second level Q', href: '#' }
    ]
  },
  {
    id: '20',
    text: 'First level B will go over two lines',
    href: '#',
    items: [
      {
        id: '21',
        text: 'Second level',
        href: '#',
        items: [
          {
            id: '22',
            text: 'Third level link with some text that will need to wrap',
            href: '#',
            items: [{ id: '23', text: 'Fourth level', href: '#' }]
          }
        ]
      },
      { id: '24', text: 'Second level', href: '#' },
      { id: '25', text: 'Second level', href: '#' }
    ]
  },
  { id: '26', text: 'First level C', href: '#' },
  {
    id: '27',
    text: 'First level D',
    href: '#',
    items: [
      {
        id: '28',
        text: 'Second level',
        href: '#',
        items: [
          {
            id: '29',
            text: 'Third level link with some text that will need to wrap',
            href: '#',
            items: [{ id: '30', text: 'Fourth level', href: '#' }]
          }
        ]
      },
      { id: '31', text: 'Second level', href: '#' },
      { id: '32', text: 'Second level', href: '#' }
    ]
  }
]

export const verticalNavItems = [
  {
    id: '1',
    text: 'First level',
    active: true,
    items: [
      { id: '2', text: 'First level repeat', url: '#' },
      {
        id: '3',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '4',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '5', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '6', text: 'Second level active', url: '#', active: true },
      { id: '7', text: 'Second level', url: '#' }
    ]
  },
  {
    id: '8',
    text: 'First level',
    items: [
      { id: '9', text: 'First level repeat', url: '#' },
      {
        id: '10',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '11',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '12', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '13', text: 'Second level', url: '#' },
      { id: '14', text: 'Second level', url: '#' }
    ]
  },
  { id: '15', text: 'First level no children', url: '#' },
  { id: '16', text: 'First level no children active', url: '#', active: true },
  {
    id: '17',
    text: 'First level',
    items: [
      { id: '18', text: 'First level repeat', url: '#' },
      {
        id: '19',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '20',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '21', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '22', text: 'Second level', url: '#' },
      { id: '23', text: 'Second level', url: '#' }
    ]
  }
]
