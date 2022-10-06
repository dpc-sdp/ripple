export const verticalNavItems = [
  { text: 'First level', items: [
    { text: 'First level repeat', url: '#' },
    { text: 'Second level', url: '#', items: [
      { text: 'Third level link with some text that will need to wrap', url: '#', items: [
        { text: 'Fourth level', url: '#' }
      ]}
    ]},
    { text: 'Second level active', url: '#' },
    { text: 'Second level', url: '#' }
  ]},
  { text: 'First level', items: [
    { text: 'First level repeat', url: '#' },
    { text: 'Second level', url: '#', items: [
      { text: 'Third level link with some text that will need to wrap', url: '#', items: [
        { text: 'Fourth level', url: '#' }
      ]}
    ]},
    { text: 'Second level', url: '#' },
    { text: 'Second level', url: '#' }
  ]},
  { text: 'First level no children', url: '#' },
  { text: 'First level no children active', url: '#' },
  { text: 'First level', items: [
    { text: 'First level repeat', url: '#' },
    { text: 'Second level', url: '#', items: [
      { text: 'Third level link with some text that will need to wrap', url: '#', items: [
        { text: 'Fourth level', url: '#' }
      ]}
    ]},
    { text: 'Second level', url: '#' },
    { text: 'Second level', url: '#' }
  ]}
]
