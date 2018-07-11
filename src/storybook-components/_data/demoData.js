// TODO: centralize all demo data here for all stories.
// This will help avoiding duplicated data in stories.

import {
  text,
  object,
  boolean,
  number
} from '@storybook/addon-knobs/vue'

const demoData = {
  // We can use general data for some common data type.
  // These data value can be reused.
  general: {
    url: '#'
  },

  header: {
    logo: object('Logo', {
      alt: 'vic.gov.au',
      url: '#',
      image: '/logo.svg'
    }),
    breakpoint: number('Menu Breakpoint', 992),
    links: object('Menu Links', [
      {
        text: 'Your services',
        url: '#',
        children: [
          { text: 'Sub child A', url: '#' },
          {
            text: 'Sub child B',
            url: '#',
            children: [
              { text: 'Sub child I', url: '#' },
              { text: 'Sub child II', url: '#' },
              { text: 'Sub child III', url: '#' }
            ]
          },
          {
            text: 'Test Path 2',
            url: '#',
            children: [
              { text: 'Sub child IV', url: '#' },
              {
                text: 'Test Path 3',
                url: '#',
                children: [
                  { text: 'Sub child X', url: '#' },
                  { text: 'Sub child Y', url: '#' },
                  { text: 'Sub child Z', url: '#' }
                ]
              },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child XIII', url: '#' },
              { text: 'Sub child IV', url: '#' },
              { text: 'Sub child V', url: '#' },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child XIII', url: '#' },
              { text: 'Sub child IV', url: '#' },
              { text: 'Sub child V', url: '#' },
              { text: 'Sub child VI', url: '#' },
              { text: 'Sub child VII', url: '#' },
              { text: 'Sub child VIII', url: '#' },
              { text: 'Sub child IX', url: '#' },
              { text: 'Sub child X', url: '#' },
              { text: 'Sub child XI', url: '#' },
              { text: 'Sub child XII', url: '#' },
              { text: 'Sub child Last', url: '#' }
            ]
          }
        ]
      },
      { text: 'About VIC Government', url: '#' },
      {
        text: 'News',
        url: '#',
        children: [
          {
            text: 'Sub child 2',
            url: '#',
            children: [
              { text: 'Sub child 3', url: '#' },
              { text: 'Sub child 4', url: '#' },
              { text: 'Sub child 5', url: '#' }
            ]
          }
        ]
      },
      {
        text: 'Events',
        url: '#',
        children: [
          { text: 'Sub child 3', url: '#' },
          { text: 'Sub child 4', url: '#' },
          { text: 'Sub child 5', url: '#' }
        ]
      },
      { text: 'Connect with us', url: '#' }
    ]),
    searchTerms: object('Search Terms', [
      {
        linkText: 'Road works',
        linkUrl: '#'
      },
      {
        linkText: 'School holidays',
        linkUrl: '#'
      }
    ]),
    sticky: boolean('Sticky', false)
  },

  heroBanner: {
    title: text('Title', 'This is display copy that wraps 2 lines'),
    introText: text('Intro Text', 'This is supplimentary intro text that can also wrap over a couple of lines.'),
    linkHeading: text('Link Heading', 'Want to know more about...'),
    links: object('Links', [
      { text: 'First journey based link', url: '#' },
      { text: 'Secondary journey based link', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Fourth journey based link', url: '#' }
    ]),
    moreLink: object('More Link', { text: 'See more', url: '#' })
  },

  breadcrumbs: {
    crumbs: [
      { text: 'Home', url: '#' },
      { text: 'Level 1 parent link', url: '#' },
      { text: 'Level 2 page title' }
    ]
  },

  cardNavigation: {
    title: text('Title', 'First navigation card'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    url: text('Url', '#')
  },

  cardNavigationFeatured: {
    title: text('Title', 'This is display copy that wraps 2 lines'),
    summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
    url: text('Url', '#'),
    image: text('Image', 'https://placehold.it/818x497')
  },

  cardPromotion: {
    image: text('Image', 'https://placehold.it/580x340'),
    date: text('Date', '2018-05-31'),
    topic: text('Topic', 'News'),
    title: text('Title', 'This is display copy that wraps 2 lines'),
    summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
    link: object('Link', { text: 'Read more', url: '#' })
  },

  cardKeydates: {
    title: text('Title', 'Key calendar dates'),
    keydates: object('Keydates', [
      { date: '2018-05-03', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
      { date: '2018-05-23', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
    ]),
    link: object('Link', { text: 'See the events calendar', url: '#' })
  },

  cardEvent: {
    image: text('Image', 'https://placehold.it/580x340'),
    date: text('Date', '2018-05-31'),
    location: text('Location', 'South Yarra'),
    title: text('Title', 'This is the headline of an event with a location'),
    summary: text('Summary', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte'),
    link: object('Link', { text: 'See event details', url: '#' })
  },

  relatedLinks: {
    title: text('Title', 'Related links'),
    links: object('Links', [
      { text: 'Link to additional content', url: '#' },
      { text: 'Second link it goes right here', url: '#' },
      { text: 'Third link to extra content', url: '#' },
      { text: 'This is a long link to extra content', url: '#' }
    ])
  },

  whatsNext: {
    title: text('Title', 'What\'s next?'),
    links: object('Links', [
      { text: 'Link to additional content', url: '#' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Link to additional content', url: '#' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'This is another link', url: '#' }
    ])
  },

  anchorLinks: {
    title: text('Title', 'On this page:'),
    links: object('Links', [
      { text: 'This is the first anchor link', url: '#' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Link to additional content', url: '#' },
      { text: 'Another link to extra content', url: '#' },
      { text: 'This is another link', url: '#' }
    ])
  },

  campaignSecondary: {
    title: text('Title', 'Secondary campaign headline'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: text('Image', 'http://placehold.it/699x411')
  },

  contact: {
    title: 'Need additional help?',
    name: 'First Last Name (Job Title)',
    department: 'Department name',
    postal: 'PO Box 123, Suburb VIC 3421',
    address: '13 Street Name, Suburb VIC 3056',
    phone: [
      '03 9876 6754',
      '03 9876 1234'
    ],
    email: 'emailaddress@vic.gov.au',
    social: [
      {
        icon: 'facebook',
        title: 'Name of Facebook Page',
        url: 'https://www.facebook.com'
      },
      {
        icon: 'twitter',
        title: 'Name of Twitter account',
        url: 'https://www.twitter.com'
      },
      {
        icon: 'linkedin',
        title: 'Name of LinkedIn profile',
        url: 'https://www.linkedin.com'
      },
      {
        icon: 'instagram',
        title: 'Name of Instagram account',
        url: 'https://www.intagram.com'
      }
    ]
  },

  footer: {
    nav: [
      {
        text: 'Your Services',
        link: '#',
        children: [
          {
            text: 'Grants awards and assistance',
            link: '#'
          },
          {
            text: 'Law and safety',
            link: '#'
          },
          {
            text: 'Business and Industry',
            link: '#'
          },
          {
            text: 'Jobs and the Workplace',
            link: '#'
          },
          {
            text: 'Transport and Traffic',
            link: '#'
          },
          {
            text: 'Education',
            link: '#'
          },
          {
            text: 'Housing and Property',
            link: '#'
          },
          {
            text: 'Health',
            link: '#'
          },
          {
            text: 'Community',
            link: '#'
          },
          {
            text: 'Art, Culture and Sport',
            link: '#'
          },
          {
            text: 'Environment and Water',
            link: '#'
          }
        ]
      },
      {
        text: 'About VIC Government',
        link: '#',
        children: [
          {
            text: 'Grants awards and assistance',
            link: '#'
          },
          {
            text: 'Law and safety',
            link: '#'
          },
          {
            text: 'Business and Industry',
            link: '#'
          },
          {
            text: 'Jobs and the Workplace',
            link: '#'
          },
          {
            text: 'Transport and Traffic',
            link: '#'
          },
          {
            text: 'Education',
            link: '#'
          },
          {
            text: 'Housing and Property',
            link: '#'
          },
          {
            text: 'Health',
            link: '#'
          },
          {
            text: 'Community',
            link: '#'
          },
          {
            text: 'Art, Culture and Sport',
            link: '#'
          },
          {
            text: 'Environment and Water',
            link: '#'
          }
        ]
      },
      {
        text: 'News',
        link: '#'
      },
      {
        text: 'Events',
        link: '#'
      },
      {
        text: 'Connect with us',
        link: '#',
        children: [
          {
            text: 'Education',
            link: '#'
          },
          {
            text: 'Housing and Property',
            link: '#'
          },
          {
            text: 'Health',
            link: '#'
          }
        ]
      }
    ],
    links: [
      {
        text: 'Privacy',
        link: '#'
      },
      {
        text: 'Disclaimer',
        link: '#'
      },
      {
        text: 'Terms of use',
        link: '#'
      },
      {
        text: 'Sitemap',
        link: '#'
      },
      {
        text: 'Accessibility Statement',
        link: '#'
      },
      {
        text: 'Help',
        link: '#'
      }
    ],
    copyright: '© Copyright State Government of Victoria'
  }
}

export default demoData
