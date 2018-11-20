// TODO: centralize all demo data here for all stories.
// This will help avoiding duplicated data in stories.

// TODO: We must change `selectV2` to `select` when updating to Storybook version 5.
// Reference: https://github.com/storybooks/storybook/pull/1745#issuecomment-357679148
import {
  text,
  object,
  boolean,
  number,
  selectV2
} from '@storybook/addon-knobs/vue'

// We can use general data for some common data type.
// These data value can be reused.
const generalData = { // eslint-disable-line no-unused-vars
  url: '#',
  text: 'Lorem ipsum dolor sit amet'
}

const demoData = {
  header: () => ({
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
    sticky: boolean('Sticky', false),
    hideOnScroll: boolean('Hide On Scroll', false),
    showSearch: boolean('Show search', false)
  }),

  campaign: () => ({
    heroBackgroundImage: text('Hero background image', '/herobg.jpg')
  }),

  landingPage: () => ({
    backgroundGraphic: text('Background Graphic', '/bggraphic.png')
  }),

  heroBanner: () => ({
    title: text('Title', 'This is display copy that wraps 2 lines'),
    introText: text('Intro Text', 'This is supplimentary intro text that can also wrap over a couple of lines.'),
    linkHeading: text('Link Heading', 'Want to know more about...'),
    links: object('Links', [
      { text: 'First journey based link', url: '#' },
      { text: 'Secondary journey based link', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Fourth journey based link', url: '#' }
    ]),
    moreLink: object('More Link', { text: 'See more', url: '#' }),
    theme: selectV2('Theme', {dark: 'dark', light: 'light'}, 'light'),
    showLinks: boolean('Show Links', true),
    logo: text('Logo', '/herologo.png'),
    backgroundGraphic: text('Background Graphic', '/bggraphiclower.png')
  }),

  introBanner: () => ({
    title: text('Title', 'Welcome to Victoria Police Museum'),
    introText: text('Intro Text', 'From the largest collection of Kelly Gang armour in Australia to forensic evidence from some of Melbourne\'s most notorious crimes, the Victoria Police Museum presents visitors with an intriguing insight into the social history of policing and crime.'),
    linkHeading: text('Link Heading', ''),
    links: object('Links', [
      { text: 'Plan your visit', url: '#' },
      { text: 'Collections', url: '#' },
      { text: 'School Programs', url: '#' },
      { text: 'Group Bookings', url: '#' }
    ]),
    showLinks: boolean('Show Links', true)
  }),

  breadcrumbs: () => ({
    crumbs: object('Crumbs', [
      { text: 'Home', url: '#' },
      { text: 'Level 1 page title', url: '#' },
      { text: 'Level 2 page title' }
    ])
  }),

  cardContent: () => ({
    link: object('Link', { text: 'Read more', url: '#' }),
    image: text('Image', 'https://placehold.it/580x340'),
    border: boolean('Border', true),
    type: selectV2('Type', {default: 'default', simple: 'simple', inline: 'inline'}, 'default'),
    content: text('HTML content', '<h2>Custom Content</h2><p>Lorem ipsum dolor sit amet.</p>')
  }),

  cardNavigation: () => ({
    title: text('Title', 'First navigation card'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    link: object('Link', { text: 'Read more', url: '#' })
  }),

  cardNavigationFeatured: () => ({
    title: text('Title', 'This is display copy that wraps 2 lines'),
    summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
    url: text('Url', '#'),
    image: text('Image', 'https://placehold.it/818x497'),
    date: text('Date', '2018-03-23T09:00:00.000+10:00'),
    topic: text('Topic', 'Community')
  }),

  cardImageNavigation: () => ({
    image: text('Image', 'https://placehold.it/304x199'),
    date: text('Date', '2018-03-23T09:00:00.000+10:00'),
    topic: text('Topic', 'Community'),
    title: text('Title', 'This heading could wrap over two lines'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.'),
    link: object('Link', { text: 'Call to action', url: '#' })
  }),

  cardPromotion: () => ({
    image: text('Image', 'https://placehold.it/580x340'),
    date: text('Date', '2018-07-10T09:00:00.000+10:00'),
    topic: text('Topic', 'News'),
    title: text('Title', 'This is display copy that wraps 2 lines'),
    summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.'),
    link: object('Link', { text: 'Read more', url: '#' })
  }),

  cardKeydates: () => ({
    title: text('Title', 'Key calendar dates'),
    keydates: object('Keydates', [
      { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
      { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
    ]),
    link: object('Link', { text: 'See the events calendar', url: '#' })
  }),

  cardEvent: () => ({
    image: text('Image', 'https://placehold.it/580x340'),
    dateStart: text('Date Start', '2018-07-10T09:00:00.000+10:00'),
    dateEnd: text('Date End', '2018-07-11T09:00:00.000+10:00'),
    location: text('Location', 'South Yarra'),
    title: text('Title', 'This is the headline of an event with a location that will stretch over over 3 lines'),
    summary: text('Summary', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte'),
    link: object('Link', { text: 'See event details', url: '#' })
  }),

  cardCta: () => ({
    image: text('Image', 'https://placehold.it/148x148'),
    title: text('Title', 'Want to submit an event?'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.'),
    link: object('Link', { text: 'Submit a listing', url: '#' })
  }),

  cardCarousel: () => ({
    title: text('Title', 'Featured Content'),
    cards: object('Cards', [
      {
        name: 'rpl-card-event',
        data: {
          image: 'https://placehold.it/580x340',
          dateStart: '2018-07-10T09:00:00.000+10:00',
          location: 'South Yarra',
          title: 'This is the headline of an event',
          summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte',
          link: { text: 'See event details', url: '#' }
        }
      },
      {
        name: 'rpl-card-keydates',
        data: {
          title: 'Key calendar dates',
          keydates: [
            { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
            { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
          ],
          link: { text: 'See the events calendar', url: '#' }
        }
      },
      {
        name: 'rpl-card-promotion',
        data: {
          image: 'https://placehold.it/580x340',
          date: '2018-07-10T09:00:00.000+10:00',
          topic: 'News',
          title: 'This is display copy that wraps 2 lines',
          summary: 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.',
          link: { text: 'Read more', url: '#' }
        }
      },
      {
        name: 'rpl-card-event',
        data: {
          image: 'https://placehold.it/580x340',
          dateStart: '2018-07-10T09:00:00.000+10:00',
          dateEnd: '2018-07-15T09:00:00.000+10:00',
          location: 'South Yarra',
          title: 'This is the headline of an event',
          summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte',
          link: { text: 'See event details', url: '#' }
        }
      },
      {
        name: 'rpl-card-event',
        data: {
          image: 'https://placehold.it/580x340',
          dateStart: '2018-07-10T09:00:00.000+10:00',
          dateEnd: '2018-09-10T09:00:00.000+10:00',
          location: 'South Yarra',
          title: 'This is the headline of an event',
          summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor lorem ipsum dolor sit amet, consecte',
          link: { text: 'See event details', url: '#' }
        }
      },
      {
        name: 'rpl-card-keydates',
        data: {
          title: 'Key calendar dates',
          keydates: [
            { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
            { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
          ],
          link: { text: 'See the events calendar', url: '#' }
        }
      },
      {
        name: 'rpl-card-promotion',
        data: {
          image: 'https://placehold.it/580x340',
          date: '2018-07-10T09:00:00.000+10:00',
          topic: 'News',
          title: 'This is display copy that wraps 2 lines',
          summary: 'We are looking at ways to make housing more affordable and renting more securey. Tell us what works for you or find out whats happening.',
          link: { text: 'Read more', url: '#' }
        }
      },
      {
        name: 'rpl-card-keydates',
        data: {
          title: 'Key calendar dates',
          keydates: [
            { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
            { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
          ],
          link: { text: 'See the events calendar', url: '#' }
        }
      },
      {
        name: 'rpl-card-keydates',
        data: {
          title: 'Key calendar dates',
          keydates: [
            { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
            { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
          ],
          link: { text: 'See the events calendar', url: '#' }
        }
      }
    ])
  }),

  relatedLinks: () => ({
    title: text('Title', 'Related links'),
    links: object('Links', [
      { text: 'Link to external content', url: 'http://www.google.com' },
      { text: 'Second link it goes right here', url: '#' },
      { text: 'Third link to extra content', url: '#' },
      { text: 'This is a long link to extra content', url: '#' }
    ])
  }),

  whatsNext: () => ({
    title: text('Title', 'What\'s next?'),
    links: object('Links', [
      { text: 'Link to external content', url: 'http://www.google.com' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Link to additional content', url: '#' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'This is another link', url: '#' }
    ])
  }),

  anchorLinks: () => ({
    title: text('Title', 'On this page:'),
    links: object('Links', [
      { text: 'This is the first anchor link', url: '#' },
      { text: 'Second link to extra content', url: '#' },
      { text: 'Third link goes here', url: '#' },
      { text: 'Link to additional content', url: '#' },
      { text: 'Another link to extra content', url: '#' },
      { text: 'This is another link', url: '#' }
    ])
  }),

  campaignSecondary: () => ({
    title: text('Title', 'Secondary campaign headline'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: text('Image', 'http://placehold.it/699x411')
  }),

  contact: () => ({
    title: text('Title', 'Need additional help?'),
    name: text('Name', 'First Last Name (Job Title)'),
    department: text('Department', 'Department name'),
    postal: text('Postal', 'PO Box 123, Suburb VIC 3421'),
    address: text('Address', '13 Street Name, Suburb VIC 3056'),
    phone: object('Phone', [
      '03 9876 6754',
      '03 9876 1234'
    ]),
    email: text('Email', 'emailaddress@vic.gov.au'),
    social: object('Social', [
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
    ])
  }),

  shareThis: () => ({
    title: text('Title', 'Share this'),
    url: text('Url', 'https://app-vic-gov-au-develop.lagoon.vicsdp.amazee.io/')
  }),

  footer: () => ({
    nav: object('Nav', [
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
    ]),
    links: object('Links', [
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
    ]),
    copyright: text('Copyright', '© Copyright State Government of Victoria'),
    acknowledgement: text('Acknowledgement', 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'),
    logos: object('Logos', [
      {
        src: 'https://placehold.it/112x52',
        alt: 'Max native size',
        url: '#'
      },
      {
        src: 'https://placehold.it/32x32',
        alt: 'Smaller than max size',
        url: '#'
      },
      {
        src: 'https://placehold.it/80x200',
        alt: 'Portrait',
        url: '#'
      },
      {
        src: 'https://placehold.it/200x80',
        alt: 'Landscape',
        url: '#'
      }
    ])
  }),

  newsListing: () => ({
    title: text('Title', 'Latest News'),
    list: object('List', [
      {
        date: '2018-03-26T09:00:00.000+10:00',
        tag: 'Event',
        title: 'Australian Indigenous Tourism Conference',
        url: '#'
      },
      {
        date: '2018-03-25T09:00:00.000+10:00',
        tag: 'Community',
        title: 'Respect Women: Call it Out',
        url: '#'
      },
      {
        date: '2018-03-24T09:00:00.000+10:00',
        tag: 'Arts & Culture',
        title: 'NGV Triennial',
        url: '#'
      },
      {
        date: '2018-02-22T09:00:00.000+10:00',
        tag: 'Sports',
        title: 'The World Games Facilities Fund',
        url: '#'
      },
      {
        date: '2018-02-21T09:00:00.000+10:00',
        tag: 'Law & Justice',
        title: 'Access to Justice Review',
        url: '#'
      },
      {
        date: '2018-02-19T09:00:00.000+10:00',
        tag: 'Family Violence',
        title: 'New Bendigo Refuge for Families Escaping Family Violence',
        url: '#'
      }
    ])
  }),

  pagination: () => ({
    totalSteps: number('Total steps', 8),
    initialStep: number('Initial step', 1),
    stepsAround: number('Step count around current', 2)
  }),

  sitemap: () => ({
    menu: object('Menu Links', [
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
    ])
  }),

  embeddedVideo: () => ({
    width: text('width', '854'),
    height: text('height', '480'),
    src: text('field_media_video_embed_field', 'https://www.youtube.com/embed/bSlnfyGTiss'),
    lang: text('langcode', 'en'),
    transcript: text('field_media_transcript', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'),
    variant: selectV2('Variant', {full: 'full', link: 'link'}, 'full'),
    mediaLink: text('field_media_link', 'View transcript')
  }),

  callToAction: () => ({
    title: text('Title', 'Card prompting an action'),
    summary: text('Summary', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolore que laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: object('Image', { src: 'http://placehold.it/336x249', alt: '' })
  }),

  campaignPrimary: () => ({
    title: text('Title', 'Primary campaign headline'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: text('Image', 'http://placehold.it/699x411')
  }),

  updatedDate: () => ({
    date: text('Date', '2018-07-10T09:00:00.000+10:00'),
    prefix: text('Prefix', 'Reviewed'),
    locale: text('Locale', 'en-au')
  }),

  siteSectionNavigation: () => ({
    title: text('Title', 'Branch name goes here'),
    menu: object('Menu Links', [
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
                  { text: 'Sub child X', url: '/active-link' },
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
    activeLink: text('Active Link', '/active-link')
  }),

  searchForm: () => ({
    title: text('Title', 'Search results'),
    searchPlaceholder: text('Search Placeholder', 'Enter keywords'),
    prefillSearchTerm: text('Prefilled Search Term', 'Bananas'),
    filterForm: object('Filter Form', {
      tideId: 'tide_search_form',
      model: {
        topic: ''
      },
      schema: {
        fields: [{
          type: 'rplchecklist',
          label: 'Select a topic',
          model: 'topic',
          values: [
            'Topic A',
            'Topic B',
            'Topic C',
            'Topic D'
          ],
          placeholder: 'Select a topic'
        }, {
          type: 'rplsubmitloader',
          buttonText: 'Apply change',
          loading: false
        }]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      formState: {}
    }),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light'),
    allowBlank: boolean('Allow Blank', false)
  }),

  eventSearchForm: () => ({
    title: text('Title', 'Events search page'),
    searchPlaceholder: text('Search Placeholder', 'Enter keywords'),
    prefillSearchTerm: text('Prefilled Search Term', 'Search by keyword or location'),
    filterForm: object('Filter Form', {
      tideId: 'tide_search_form',
      model: {
        text: '',
        topic: ''
      },
      schema: {
        fields: [{
          type: 'rplchecklist',
          label: 'Select an event category',
          model: 'topic',
          values: [
            'Topic A',
            'Topic B',
            'Topic C',
            'Topic D'
          ],
          placeholder: 'Select a topic'
        }, {
          type: 'input',
          inputType: 'text',
          label: 'Enter a location',
          required: true,
          placeholder: 'Start typing suburb or postcode…',
          model: 'text'
        }, {
          type: 'vueMultiSelect',
          model: 'select',
          label: 'Event requirements',
          values: [
            'Accessible venue',
            'Child friendly',
            'Free admission',
            'Online webinar',
            'Seniors'
          ]
        }, {
          type: 'rplsubmitloader',
          buttonText: 'Display 18 results',
          loading: false
        }]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      formState: {}
    }),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light')
  }),

  searchResult: () => ({
    title: text('Title', 'Schools private policy'),
    link: object('Link', {
      linkText: 'www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx',
      linkUrl: '//www.education.vic.gov.au/Pages/schoolsprivacypolicy.aspx'
    }),
    date: text('Date', '2018-07-10T09:00:00.000+10:00'),
    description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem'),
    tags: object('Tags', [{
      linkText: 'This is a content tag',
      linkUrl: '#'
    }, {
      linkText: 'This is a content tag',
      linkUrl: '#'
    }]),
    locale: text('Locale', 'en-au')
  }),

  eventSearchResultItems: () => (
    [
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        title: 'This is the headline of an event with a location that will stretch over over 3 lines',
        summary: 'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: {text: 'See event details', url: '#'}
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        title: 'This is the headline of an event with a location that will stretch over over 3 lines',
        summary: 'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: {text: 'See event details', url: '#'}
      },
      {
        image: '',
        date: '2018-07-10T09:00:00.000+10:00',
        title: 'This event has no image.',
        summary: 'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: {text: 'See event details', url: '#'}
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        title: 'This is the headline of an event with a location that will stretch over over 3 lines',
        summary: 'This event occurs in 2018. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: {text: 'See event details', url: '#'}
      }
    ]
  ),

  searchResults: () => ({
    count: number('Count', 10),
    type: 'default',
    responseSize: number('Response size', 2),
    errorMsg: text('Error message', 'Search isn\'t working right now, please try again later.'),
    noResultsMsg: text('No results message', 'Sorry! We couldn\'t find any matches for bananas')
  }),

  eventSearchResults: () => ({
    count: number('Count', 10),
    type: 'RplCardEvent',
    responseSize: number('Response size', 4),
    errorMsg: text('Error message', 'Search isn\'t working right now, please try again later.'),
    noResultsMsg: text('No results message', 'Sorry! We couldn\'t find any matches for bananas')
  }),

  siteLayout: () => ({
    cardCols: {
      m: 6,
      l: 4,
      xxxl: 3
    },
    cardColsWithSidebar: {
      m: 6,
      xxxl: 4
    }
  }),

  form: () => ({
    formData: {

      model: {
        hidden: '',
        text: '',
        email: '',
        tel: '',
        number: '',
        radio: null,
        textArea: '',
        dateRange: ['', ''],
        date: ''
      },

      schema: {
        fields: [
          {
            type: 'input',
            inputType: 'hidden',
            model: 'hidden'
          },

          {
            type: 'input',
            inputType: 'text',
            label: 'Text',
            hint: 'This is a hint text',
            required: true,
            placeholder: 'Enter some text...',
            model: 'text'
          },

          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            hint: 'This is a hint text',
            model: 'email'
          },

          {
            type: 'input',
            inputType: 'tel',
            label: 'Tel',
            model: 'tel'
          },

          {
            type: 'input',
            inputType: 'number',
            label: 'Number',
            placeholder: 'x10',
            min: 0,
            step: 10,
            max: 100,
            model: 'number'
          },

          {
            type: 'vueMultiSelect',
            model: 'select',
            label: 'Select',
            hint: 'This is a hint text',
            values: [
              'option A',
              'option B'
            ]
          },

          {
            type: 'radios',
            label: 'Radio',
            model: 'radio',
            hint: 'This is a hint text',
            values: [
              'Yes',
              'No'
            ]
          },

          {
            type: 'textArea',
            label: 'text area',
            model: 'textArea',
            placeholder: 'Start typing...',
            hint: 'This is a hint text',
            rows: 4,
            required: true,

            visible (model) {
              return model && model.was_this_page_helpful !== null
            }
          },

          {
            type: 'rpldatepicker',
            range: true,
            label: 'Date Range',
            model: 'dateRange',
            startPlaceholder: 'Start',
            endPlaceholder: 'End'
          },

          {
            type: 'rpldatepicker',
            ranged: false,
            label: 'Date',
            model: 'date',
            placeholder: 'Enter a date'
          },

          {
            type: 'submit',
            buttonText: 'Submit'
          }
        ]
      },

      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },

      formState: {}
    }
  }),

  metaTag: () => ({
    linkText: text('Text', 'Meta Tag'),
    linkUrl: text('Link', '#'),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light')
  }),

  link: () => ({
    content: text('Content', 'Ripple Link'),
    href: text('href', '#'),
    target: text('target', '')
  }),

  textLink: () => ({
    url: text('URL', '#'),
    text: text('Text', 'Text Link'),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light'),
    size: selectV2('Size', {small: 'small', large: 'large', none: 'none'}, 'small'),
    underline: boolean('Underline', false),
    emphasis: boolean('Emphasis', false),
    iconSymbol: text('Icon Symbol', 'arrow_right_primary'),
    iconColor: text('Icon Color', 'primary'),
    iconSize: text('Icon Size', 'm'),
    iconPlacement: selectV2('Icon Placement', {before: 'before', after: 'after'}, 'after')
  }),

  icon: () => ({
    icon: text('Symbol', 'search'),
    color: text('Color', 'primary'),
    size: text('Size', 'm')
  }),

  iconLibrary: () => ({
    color: text('Color', 'primary'),
    size: text('Size', 'm'),
    icons: [
      'accessible',
      'addition',
      'alert_fire',
      'alert_flood',
      'alert_high_temperature',
      'alert_information',
      'alert_lightning',
      'alert_medical',
      'alert_smoke',
      'alert_transport',
      'arrow_down_primary',
      'arrow_down_tertiary',
      'arrow_left_primary',
      'arrow_left_secondary',
      'arrow_right_primary',
      'arrow_right_primary_s',
      'arrow_right_secondary',
      'arrow_up_primary',
      'attach',
      'blank_solid',
      'calendar',
      'child_friendly',
      'close',
      'csv',
      'doc',
      'document',
      'document_transparent',
      'docx',
      'dollar_negative',
      'dot',
      'dotm',
      'dotx',
      'down',
      'download',
      'email_solid',
      'email_transparent',
      'external_link',
      'facebook',
      'free',
      'fullscreen',
      'hamburger',
      'help',
      'home',
      'instagram',
      'left',
      'link',
      'link_65',
      'link_90',
      'linkedin',
      'loading_star',
      'lock',
      'map_marker',
      'microphone',
      'pause',
      'pdf',
      'phone_number',
      'play',
      'ppt',
      'pptx',
      'right',
      'search',
      'senior',
      'share',
      'share_alternative',
      'star',
      'stop',
      'success',
      'tick',
      'trash',
      'twitter',
      'txt',
      'up',
      'upload',
      'user',
      'view',
      'webinar',
      'xls',
      'xlsm',
      'xlsx',
      'zoom_in',
      'zoom_out'
    ]
  }),

  button: () => ({
    content: text('Content', 'Ripple Button'),
    href: text('href', '#'),
    theme: selectV2('Theme', {primary: 'primary', secondary: 'secondary'}, 'primary'),
    disabled: boolean('Disabled', false)
  }),

  grid: () => ({
    cols: text('Cols default', 'full'),
    colsBp: object('Cols in breakpoints', {
      m: 6,
      l: 4,
      xxxl: 3
    }),
    push: object('Push', {
      m: 6
    }),
    pull: object('Pull', {})
  }),

  list: () => ({
    title: text('Title', 'My List'),
    size: selectV2('Size', {normal: 'normal', large: 'large'}, 'normal'),
    iconScale: number('Icon Scale', 1),
    iconColor: text('Icon Color', 'primary'),
    list: object('List', [{
      symbol: 'calendar',
      size: '1',
      text: '26 January 2019 - 29 January 2019'
    }, {
      symbol: 'map_marker',
      color: 'danger',
      size: '1.2',
      text: 'Level 10,  101 Collins Street, Melbourne'
    }, {
      symbol: 'help',
      size: '0.8',
      text: '$30 - $50'
    }, {
      symbol: 'star',
      color: 'success',
      link: 'https://www.palacecinemas.com.au/festivals/volvo-scn-film-festival/',
      text: 'https://www.palacecinemas.com.au/festivals/volvo-scn-film-festival/'
    }, {
      symbol: 'addition',
      text: 'Accessible venue'
    }, {
      symbol: 'addition',
      text: 'Child friendly'
    }])
  }),

  publishDateAndAuthor: () => ({
    date: text('Date', '2018-04-22T11:00:00.000+10:00'),
    location: text('Location', 'location'),
    author: text('Author', 'department goes here'),
    locale: text('Locale', 'en-au')
  }),

  figure: () => ({
    image: object('Image', {
      src: 'https://placehold.it/800x400',
      alt: 'A generic square placeholder image.'
    }),
    caption: text('Caption', '1.2 Caption to go here. This should be restricted in characters.')
  }),

  featuredNews: () => ({
    list: object('List', [
      {
        image: 'https://placehold.it/818x497',
        date: '2018-03-23T09:00:00.000+10:00',
        topic: 'Community',
        title: 'This heading could wrap over two lines',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Call to action', url: '#' }
      },
      {
        image: 'https://placehold.it/818x497',
        date: '2018-03-23T09:00:00.000+10:00',
        topic: 'Community',
        title: 'This heading could wrap over two lines',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Call to action', url: '#' }
      },
      {
        image: 'https://placehold.it/818x497',
        date: '2018-03-23T09:00:00.000+10:00',
        topic: 'Community',
        title: 'This heading could wrap over two lines',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.',
        link: { text: 'Call to action', url: '#' }
      }
    ])
  }),

  latestEvents: () => ({
    title: text('Title', 'Optional heading'),
    events: object('Events', [
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2018-12-25T09:00:00.000+10:00',
        dateEnd: '2019-01-05T09:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event',
        summary: 'This event range occurs in 2018 and goes to 2019. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: { text: 'See event details', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2018-05-09T09:00:00.000+10:00',
        dateEnd: '2018-05-10T09:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event',
        summary: 'This event range occurs in 2018, same month different day.',
        link: { text: 'See event details', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2018-02-12T09:00:00.000+10:00',
        dateEnd: '2018-02-12T15:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event',
        summary: 'This event range occurs in 2018, same day, different time.',
        link: { text: 'See event details', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2018-08-01T09:00:00.000+10:00',
        dateEnd: '2018-09-02T09:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event',
        summary: 'This event range occurs in 2018. Same year, different month.',
        link: { text: 'See event details', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2020-02-02T09:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event with a location that will stretch over over 3 lines',
        summary: 'This single date event occurs in 2020. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: { text: 'See event details', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        dateStart: '2019-07-10T09:00:00.000+10:00',
        location: 'South Yarra',
        title: 'This is the headline of an event with a location that will stretch over over 3 lines',
        summary: 'This single date event occurs in 2019. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet.',
        link: { text: 'See event details', url: '#' }
      }
    ]),
    cta: object('Call to Action', {
      image: 'https://placehold.it/148x148',
      title: 'Want to submit an event?',
      summary: 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.',
      link: { text: 'Submit a listing', url: '#' }
    }),
    link: object('Link', { text: 'See all events', url: '#' })
  }),

  imageGallery: () => ({
    gallery: object('Gallery Data', [{
      image: 'https://placehold.it/1024x768/900/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/900/fff',
      caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate.'
    }, {
      image: 'https://placehold.it/1056x540/090/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/090/fff',
      caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia.'
    }, {
      image: 'https://placehold.it/597x843/009/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/009/fff',
      caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate. Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptate.'
    }, {
      image: 'https://placehold.it/2560x1880/099/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/099/fff',
      caption: 'A small caption.'
    }, {
      image: 'https://placehold.it/1920x350/909/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/909/fff',
      caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium.'
    }, {
      image: 'https://placehold.it/1024x768/990/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/990/fff',
      caption: 'Sed ut perspiciatis unde omnis. Iste natus error sit voluptatem accuntium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta. Nemo enim.'
    }, {
      image: 'https://placehold.it/1024x768/000/fff',
      alt: 'A test image',
      title: 'Image title here',
      thumbnail: 'https://placehold.it/604x309/000/fff',
      caption: 'Sed ut perspiciatis unde omnis.'
    }
    ]),
    enlargeText: text('Enlarge Text', 'Click to enlarge')
  }),

  grantsOverview: () => ({
    title: text('Title', 'Program Overview'),
    funding: text('Funding', '$80,000'),
    audience: text('Audience', 'individuals, organisations, local council'),
    startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
    enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
    description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'),
    link: object('Call to action', { text: 'Apply Now', url: '#' })
  }),

  alertBase: () => ({
    content: text('HTML Content', 'Draft only and not yet published'),
    iconSymbol: text('Icon Symbol', 'alert_information'),
    backgroundColor: text('Background Color', 'dark_neutral'),
    textColor: text('Text Color', 'white'),
    iconColor: text('Icon Color', 'white'),
    closeIconColor: text('Close Icon Color', 'white')
  }),

  alert: () => ({
    title: text('Title', 'This is an emergency alert.'),
    type: selectV2('Type', {
      'Emergency': 'Emergency',
      'Fire': 'Fire',
      'Flood': 'Flood',
      'Medical': 'Medical',
      'Lightening': 'Lightening',
      'Pollution': 'Pollution',
      'Heat wave': 'Heat wave',
      'Traffic': 'Traffic',
      'Success': 'Success'
    }, 'Emergency'),
    link: object('Link', { text: 'Find out more', url: '#' }),
    alertId: text('Alert ID', 'test_id')
  }),

  timeline: () => ({
    title: text('Title', 'Timeline Heading'),
    list: object('List', [{
      image: 'https://placehold.it/320x240',
      title: 'Timeline item with link',
      url: '#',
      dateStart: '2019-01-01T09:00:00.000+10:00',
      dateEnd: '2020-12-01T09:00:00.000+10:00',
      description: 'Contains image, title, internal URL, different start / end date and description.'
    }, {
      title: 'Timeline item 2',
      subtitle: 'Contains title and custom subtitle.'
    }, {
      image: 'https://placehold.it/88x88',
      title: 'Timeline item 3',
      dateStart: '2018-01-01T09:00:00.000+10:00',
      dateEnd: '2018-01-15T09:00:00.000+10:00',
      subtitle: 'Custom subtitle - this should not show.',
      description: 'Contains image, title, different start / end date, subtitle (hidden) and description.'
    }, {
      title: 'Timeline item 4',
      dateStart: '2018-03-01T09:00:00.000+10:00',
      dateEnd: '2018-03-01T09:00:00.000+10:00',
      description: 'Contains title, matching start / end date and description.'
    }, {
      image: 'https://placehold.it/88x88',
      title: 'Timeline item 5 with link',
      url: 'https://www.google.com',
      description: 'Contains an image, title, external URL and description.'
    }
    ])
  })
}

/**
 * demoData - Returns an object with all data attached. This will not add the
 * properties to knobs.
 * This is for use on demo pages.
 */
let demoDataLocked = {}
for (let key in demoData) {
  demoDataLocked[key] = demoData[key]()
}
export {demoDataLocked}

/**
 * demoData - Returns an object with functions to create data. This will add the
 * properties to knobs.
 * This is for use on components.
 */
export {demoData}

export default demoData
