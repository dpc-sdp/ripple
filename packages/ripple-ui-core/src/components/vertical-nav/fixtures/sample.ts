export const verticalNavExample1 = [
  {
    id: '1',
    text: 'First level',
    url: '#',
    active: true,
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
                id: '41',
                text: 'Fourth level',
                url: '#',
                items: [{ id: '51', text: 'Fifth level', url: '#' }]
              },
              {
                id: '42',
                text: 'Fourth level item 2',
                url: '#'
              }
            ]
          },
          {
            id: '5',
            text: 'Third level item 2',
            url: '#'
          },
          {
            id: '6',
            text: 'Third level item 3',
            url: '#'
          }
        ]
      },
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
  { id: '16', text: 'First level no children', url: '#' },
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

export const verticalNavExample2 = [
  {
    id: '1',
    text: 'First level',
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
  }
]

export const verticalNavExample3 = [
  {
    id: '1',
    text: 'First level',
    url: '#',
    active: true,
    items: [
      {
        id: '3',
        text: 'Second level',
        url: '#',
        active: true,
        items: [
          {
            id: '4',
            text: 'NESTED_ACTIVE_TEST',
            url: '#',
            active: true,
            items: [
              {
                id: '5',
                text: 'Fourth level',
                url: '#',
                items: [{ id: '51', text: 'Fifth level', url: '#' }]
              },
              {
                id: '6',
                text: 'Fourth level item 2',
                url: '#'
              }
            ]
          }
        ]
      },
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
  }
]

export const verticalNavExample4 = [
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

export const verticalNavExample5 = [
  {
    id: '1',
    text: 'First level with link',
    url: '#',
    items: [
      {
        id: '3',
        text: 'Second level no link',
        items: [
          {
            id: '4',
            text: 'Third level link in item 1',
            url: '#',
            items: [
              {
                id: '41',
                text: 'Fourth level item 1',
                url: '#'
              },
              {
                id: '42',
                text: 'Fourth level item 2',
                url: '#'
              }
            ]
          },
          {
            id: '5',
            text: 'Third level item 2',
            url: '#'
          },
          {
            id: '6',
            text: 'Third level item 3',
            url: '#'
          }
        ]
      },
      { id: '7', text: 'Second level', url: '#' }
    ]
  },
  {
    id: '8',
    text: 'First level no link',
    items: [
      {
        id: '10',
        text: 'Second level with link',
        url: '#',
        items: [
          {
            id: '11',
            text: 'Third level in item 2',
            url: '#'
          }
        ]
      },
      { id: '13', text: 'Second level item 2', url: '#' }
    ]
  },
  { id: '15', text: 'First level no children', url: '#' }
]
