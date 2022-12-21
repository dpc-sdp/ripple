export interface RplPrimaryNavLogo {
  href: string
  src: string
  altText: string
}

export interface RplPrimaryNavItem {
  id: string
  text: string
  url: string
  items?: RplPrimaryNavItem[]
  active: boolean
}

export interface RplPrimaryNavActiveItems {
  level1?: RplPrimaryNavItem
  level2?: RplPrimaryNavItem
  level3?: RplPrimaryNavItem
}

export const RplPrimaryNavItems = [
  {
    id: '1',
    text: 'First level A',
    url: '#',
    items: [
      {
        id: '2',
        text: 'Second level A',
        url: '#',
        items: [
          {
            id: '3',
            text: 'Third level A link with some text that will need to wrap',
            url: '#',
            items: [{ id: '4', text: 'Fourth level A', url: '#' }]
          }
        ]
      },
      {
        id: '55',
        text: 'Second level C',
        url: '#',
        items: [
          {
            id: '22',
            text: 'Third level A',
            url: '#',
            items: [
              {
                id: '33',
                text: 'Fourth level A link with some text that will need to wrap',
                url: '#'
              }
            ]
          }
        ]
      },
      { id: '6', text: 'Second level D', url: '#' },
      { id: '7', text: 'Second level E', url: '#' },
      { id: '8', text: 'Second level F', url: '#' },
      { id: '9', text: 'Second level G', url: '#' },
      { id: '10', text: 'Second level H', url: '#' },
      { id: '11', text: 'Second level I', url: '#' },
      { id: '12', text: 'Second level J', url: '#' },
      { id: '13', text: 'Second level K', url: '#' },
      { id: '14', text: 'Second level L', url: '#' },
      { id: '15', text: 'Second level M', url: '#' },
      { id: '16', text: 'Second level N', url: '#' },
      { id: '17', text: 'Second level O', url: '#' },
      { id: '18', text: 'Second level P', url: '#' },
      { id: '19', text: 'Second level Q', url: '#' }
    ]
  },
  {
    id: '20',
    text: 'First level B will go over two lines',
    url: '#',
    items: [
      {
        id: '21',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '22',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '23', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '24', text: 'Second level', url: '#' },
      { id: '25', text: 'Second level', url: '#' }
    ]
  },
  { id: '26', text: 'First level C', url: '#' },
  {
    id: '27',
    text: 'First level D',
    url: '#',
    items: [
      {
        id: '28',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '29',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [{ id: '30', text: 'Fourth level', url: '#' }]
          }
        ]
      },
      { id: '31', text: 'Second level', url: '#' },
      { id: '32', text: 'Second level', url: '#' }
    ]
  },
  { id: '26', text: 'First level E', url: '#' }
]
