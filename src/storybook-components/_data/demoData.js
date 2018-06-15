// TODO: centralize all demo data here for all stories.
// This will help avoiding duplicated data in stories.

import {
  text,
  object,
  array,
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
      image: 'data:image/svg+xml,<svg width="92" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M4.765 10.761L0 .24h3.177l2.647 5.738L8.47.239h3.177L6.883 10.76H4.765zm7.928 0V.24h2.842V10.76h-2.842zM22.46 0c1.992 0 3.79.884 4.876 2.483l-2.368 1.46c-.53-.73-1.282-1.221-2.37-1.221-1.448 0-2.702 1.333-2.702 2.778s1.254 2.778 2.703 2.778c1.087 0 1.84-.491 2.369-1.22l2.368 1.459C26.25 10.117 24.452 11 22.46 11c-2.954 0-5.601-2.371-5.601-5.5s2.647-5.5 5.6-5.5zm7.189 10.874a1.355 1.355 0 0 1 0-2.708 1.36 1.36 0 0 1 1.365 1.36c0 .744-.613 1.348-1.365 1.348zm8.778-4.111V4.32h4.737v4.196C42.077 10.117 40.28 11 38.287 11c-2.954 0-5.6-2.371-5.6-5.5s2.646-5.5 5.6-5.5c1.714 0 3.274.66 4.375 1.852L40.53 3.634c-.501-.547-1.184-.912-2.103-.912-1.45 0-2.703 1.333-2.703 2.778s1.254 2.778 2.703 2.778c.822 0 1.476-.21 1.978-.631v-.884h-1.978zM56.079 5.5c0 3.129-2.689 5.5-5.796 5.5s-5.796-2.371-5.796-5.5S47.177 0 50.283 0c3.107 0 5.796 2.371 5.796 5.5zm-8.554 0c0 1.53 1.24 2.778 2.758 2.778 1.519 0 2.759-1.249 2.759-2.778 0-1.53-1.24-2.778-2.759-2.778-1.518 0-2.758 1.249-2.758 2.778zm14.016 5.261L56.776.24h3.177L62.6 5.977 65.247.239h3.177L63.659 10.76H61.54zm6.927.113a1.355 1.355 0 0 1 0-2.708 1.36 1.36 0 0 1 1.365 1.36c0 .744-.613 1.348-1.365 1.348zM77.218.239l4.834 10.522h-3.093l-.53-1.206h-3.622l-.53 1.206h-3.093L76.02.24h1.198zm-1.505 7h1.81l-.835-2.272h-.14l-.835 2.273zM92 .24v6.538C92 9.527 90.286 11 87.514 11c-2.745 0-4.459-1.473-4.459-4.223V.239h2.898v6.664c0 .968.6 1.586 1.56 1.586.962 0 1.575-.618 1.575-1.586V.24H92z" fill="#FFF" fill-rule="evenodd"/></svg>'
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
    tags: array('Tags', ['News']),
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
