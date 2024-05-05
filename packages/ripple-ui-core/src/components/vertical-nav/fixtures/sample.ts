export const RplVerticalNavItems = [
  {
    id: '1',
    text: 'First level',
    active: true,
    url: '#',
    items: [
      {
        id: '3',
        text: 'Second level',
        url: '#',
        items: [
          {
            id: '4',
            text: 'Third level link with some text that will need to wrap',
            url: '#',
            items: [
              {
                id: '5',
                text: 'Fourth level',
                url: '#',
                items: [{ id: '51', text: 'Fifth level', url: '#' }]
              }
            ]
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
    url: '#',
    items: [
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
    url: '#',
    items: [
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
