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
      image: '/cobrand-logo.png'
    }),
    breakpoint: number('Menu Breakpoint', 992),
    links: object('Menu Links', [
      {
        text: 'Your services',
        url: '#',
        children: [
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
          { text: 'Sub child A', url: '#' },
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
    showSearch: boolean('Show search', false),
    showLogout: boolean('Show logout', false)
  }),

  campaign: () => ({
    heroBackgroundImage: text('Hero background image', '/herobg.jpg')
  }),

  landingPage: () => ({
    backgroundGraphic: text('Background Graphic', '/bggraphic.png')
  }),

  heroBanner: () => ({
    title: text('Title', 'This is display copy that wraps 2 lines'),
    introText: text('Intro Text', 'This is supplementary intro text that can also wrap over a couple of lines.'),
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

  heroBannerCta: () => ({
    title: text('Title', 'This is display copy that wraps 2 lines'),
    introText: text('Intro Text', 'This is supplementary intro text that can also wrap over a couple of lines.'),
    theme: selectV2('Theme', {dark: 'dark', light: 'light'}, 'light'),
    linkPrimary: object('linkPrimary', { text: 'Call to action', url: '#' }),
    linkSecondary: object('linkSecondary', { text: 'Subscribe for tips to prepare', url: '#' }),
    ctaText: text('ctaText', 'Not ready yet?')
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
    center: boolean('Center', false),
    content: text('HTML content', '<h2>Custom Content</h2><p>Lorem ipsum dolor sit amet.</p>')
  }),

  cardNavigation: () => ({
    title: text('Title', 'First navigation card'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    link: object('Link', { text: 'Read more', url: '#' })
  }),

  cardNavigationFeatured: () => ({
    title: text('Title', 'This is display copy that wraps 2 lines'),
    summary: text('Summary', 'We are looking at ways to make housing more affordable and renting more secure. Tell us what works for you or find out what\'s happening.'),
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
    summary: text('Summary', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.'),
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

  cardEmergencyContact: () => ({
    title: text('Title', 'Emergency Assistance'),
    subtitle: text('Subtitle', 'Urgent'),
    summary: text('Summary', 'Dial 000 for police, fire & ambulance'),
    link: object('Link', { text: 'Call 000', url: 'tel:000' })
  }),

  cardBox: () => ({
    cards: object('Cards', [
      {
        name: 'rpl-card-emergency-contact',
        data: {
          title: 'Emergency Assistance',
          subtitle: 'Urgent',
          summary: 'Dial 000 for police, fire & ambulance',
          link: { text: 'Call 0000', url: 'tel:+0000' }
        }
      },
      {
        name: 'rpl-card-emergency-contact',
        data: {
          title: 'Police Assistance Line',
          subtitle: 'Urgent',
          summary: 'Dial 000 for police, fire & ambulance',
          link: { text: 'Call 000', url: 'tel:000' }
        }
      },
      {
        name: 'rpl-card-emergency-contact',
        data: {
          title: 'Police Assistance Line',
          subtitle: 'Urgent',
          summary: 'Dial 000 for police, fire & ambulance',
          link: { text: 'Internal link', url: '/home' }
        }
      },
      {
        name: 'rpl-card-emergency-contact',
        data: {
          title: 'Police Assistance Line',
          subtitle: null,
          summary: 'Dial 000 for police, fire & ambulance',
          link: { text: 'External link', url: 'http://google.com' }
        }
      }
    ])
  }),

  cardHonourRoll: () => ({
    name: text('Name', 'Stella Young'),
    inductionYear: text('Induction Year', '2017'),
    category: text('Category', 'Local Champion'),
    lifespan: text('Lifespan', '1982 - 2014'),
    summary: text('Summary', 'Journalist, comedian, feminist and fierce disability activist.'),
    link: object('Link', { text: 'Read Stella\'s profile', url: '#' }),
    image: text('Image', 'https://placehold.it/148x148')
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
          summary: 'We are looking at ways to make housing more affordable and renting more secure. Tell us what works for you or find out what\'s happening.',
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
          summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
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
    ]),
    childColsBp: object('Column breakpoints', { l: 4, m: 6 }),
    totalGridColumns: number('Total grid columns', 12)
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

  campaignSecondaryImage: () => ({
    title: text('Title', 'Secondary campaign headline'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: text('Image', 'http://placehold.it/699x411'),
    video: object('Video', null)
  }),

  campaignSecondaryVideo: () => ({
    title: text('Title', 'Secondary campaign headline'),
    summary: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporar incident  incididunt ut labore et dolore magna aliqua. Ut enim ad minim niam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'),
    link: object('Call to action', { text: 'Call to action', url: '#' }),
    image: text('Image', ''),
    video: object('Video', {src: 'https://www.youtube.com/embed/bSlnfyGTiss', mediaLink: { text: 'View transcript', url: '#' }})
  }),

  contact: () => ({
    title: text('Title', 'Need additional help?'),
    name: text('Name', 'First Last Name (Job Title)'),
    department: text('Department', 'Department name'),
    postal: text('Postal', 'PO Box 123, Suburb VIC 3421'),
    address: text('Address', '13 Street Name, Suburb VIC 3056'),
    phone: object('Phone', [
      {number: '03 9876 6754'},
      {number: '0400 000 000', title: 'Mob'}
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
        url: '#',
        children: [
          {
            text: 'Grants awards and assistance',
            url: '#'
          },
          {
            text: 'Law and safety',
            url: '#'
          },
          {
            text: 'Business and Industry',
            url: '#'
          },
          {
            text: 'Jobs and the Workplace',
            url: '#'
          },
          {
            text: 'Transport and Traffic',
            url: '#'
          },
          {
            text: 'Education',
            url: '#'
          },
          {
            text: 'Housing and Property',
            url: '#'
          },
          {
            text: 'Health',
            url: '#'
          },
          {
            text: 'Community',
            url: '#'
          },
          {
            text: 'Art, Culture and Sport',
            url: '#'
          },
          {
            text: 'Environment and Water',
            url: '#'
          }
        ]
      },
      {
        text: 'About VIC Government',
        url: '#',
        children: [
          {
            text: 'Grants awards and assistance',
            url: '#'
          },
          {
            text: 'Law and safety',
            url: '#'
          },
          {
            text: 'Business and Industry',
            url: '#'
          },
          {
            text: 'Jobs and the Workplace',
            url: '#'
          },
          {
            text: 'Transport and Traffic',
            url: '#'
          },
          {
            text: 'Education',
            url: '#'
          },
          {
            text: 'Housing and Property',
            url: '#'
          },
          {
            text: 'Health',
            url: '#'
          },
          {
            text: 'Community',
            url: '#'
          },
          {
            text: 'Art, Culture and Sport',
            url: '#'
          },
          {
            text: 'Environment and Water',
            url: '#'
          }
        ]
      },
      {
        text: 'News',
        url: '#'
      },
      {
        text: 'Events',
        url: '#'
      },
      {
        text: 'Connect with us',
        url: '#',
        children: [
          {
            text: 'Education',
            url: '#'
          },
          {
            text: 'Housing and Property',
            url: '#'
          },
          {
            text: 'Health',
            url: '#'
          }
        ]
      }
    ]),
    links: object('Links', [
      {
        text: 'Privacy',
        url: '#'
      },
      {
        text: 'Disclaimer',
        url: '#'
      },
      {
        text: 'Terms of use',
        url: '#'
      },
      {
        text: 'Sitemap',
        url: '#'
      },
      {
        text: 'Accessibility Statement',
        url: '#'
      },
      {
        text: 'Help',
        url: '#'
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
    mediaLink: object('field_media_link', {text: 'View transcript', url: '#'})
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
    image: object('Image', { src: 'http://placehold.it/699x411', alt: '' })
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
            text: 'Sub child B - With level 3',
            url: '#',
            children: [
              {
                text: 'Sub child I',
                url: '#',
                children: [
                  { text: 'Level 3 child I', url: '#' },
                  { text: 'Level 3 child II', url: '#' },
                  { text: 'Level 3 child III', url: '#' }
                ]
              },
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
    subtitle: text('Subtitle', ''),
    searchPlaceholder: text('Search Placeholder', 'Enter keywords'),
    prefillSearchTerm: text('Prefilled Search Term', 'Bananas'),
    searchInputLabel: text('Search Input Label', 'Search for'),
    buttonLabel: text('Button Label', 'Search'),
    buttonHiddenLabel: boolean('Button Hidden Label', true),
    autoFocus: boolean('Auto Focus', false),
    textSearch: boolean('Text Search', true),
    expandFilters: boolean('Expand Filters', false),
    filterForm: object('Filter Form', {
      tideId: 'tide_search_form',
      model: {
        topic: []
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
    filterText: text('Filter Text', 'Refine search'),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light'),
    type: selectV2('Type', {'two-cols': 'two-cols', default: 'default'}, 'default'),
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
        topic: []
      },
      schema: {
        groups: [
          {
            fields: [
              {
                type: 'rplchecklist',
                label: 'Select an event category',
                model: 'topic',
                styleClasses: ['form-group--col-two'],
                values: [
                  'Topic A',
                  'Topic B',
                  'Topic C',
                  'Topic D'
                ],
                placeholder: 'Select a topic'
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Enter a location',
                required: true,
                styleClasses: ['form-group--col-two'],
                placeholder: 'Start typing suburb or postcode…',
                model: 'text'
              }
            ]
          },
          {
            fields: [
              {
                type: 'vueMultiSelect',
                model: 'select',
                label: 'Event requirements',
                styleClasses: ['form-group--col-two'],
                values: [
                  'Accessible venue',
                  'Child friendly',
                  'Free admission',
                  'Online webinar',
                  'Seniors'
                ]
              }
            ]
          },
          {
            fields: [
              {
                type: 'rplsubmitloader',
                buttonText: 'Submit (with animation)',
                loading: false,
                autoUpdate: true,
                styleClasses: ['form-group--inline']
              },
              {
                type: 'rplclearform',
                buttonText: 'Clear search filters',
                styleClasses: ['form-group--inline']
              }
            ]
          }
        ]
      },
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true
      },
      tag: 'rpl-fieldset',
      formState: {}
    }),
    theme: selectV2('Theme', {light: 'light', dark: 'dark'}, 'light')
  }),

  grantSearchForm: () => ({
    title: text('Title', 'Grants and programs'),
    searchPlaceholder: text('Search Placeholder', 'Search grants and programs'),
    filterForm: object('Filter Form', {
      tideId: 'tide_search_form',
      model: {
        text: '',
        topic: '',
        fundingrange: [10000, 70000]
      },
      schema: {
        fields: [{
          type: 'rplchecklist',
          label: 'View those relevant to',
          model: 'topic',
          values: [
            'Individuals and organisation types',
            'Topic B',
            'Topic C',
            'Topic D'
          ],
          placeholder: 'Select a topic'
        },
        {
          type: 'rplchecklist',
          label: 'Grant or program topic',
          required: true,
          placeholder: 'Select a topic',
          model: 'topic',
          values: [
            'topic',
            'Topic B',
            'Topic C',
            'Topic D'
          ]
        },
        {
          type: 'rplchecklist',
          label: 'Sort list by',
          required: true,
          model: 'sort',
          placeholder: 'Select a value',
          values: [
            'Latest added',
            'Topic B',
            'Topic C',
            'Topic D'
          ]
        },
        {
          type: 'rplslider',
          label: 'Set a funding range',
          model: 'fundingrange',
          step: 5000,
          min: 0,
          max: 80000,
          prefix: '$',
          default: true
        },
        {
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

  newsSearchResultItems: () => (
    [
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      },
      {
        image: 'https://placehold.it/580x340',
        date: '2018-07-10T09:00:00.000+10:00',
        topic: 'News',
        title: 'This is display copy that wraps 2 lines',
        summary: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet lorem ipsum dolor sit amet, consecteten dolor at vero eos et accusamus et iusto odio dignis.',
        link: { text: 'Read more', url: '#' }
      }
    ]
  ),

  honourRollSearchResultItems: () => (
    [
      {
        name: 'Stella Young',
        inductionYear: '2017',
        category: 'Local Champion',
        lifespan: '1982 - 2014',
        summary: 'Journalist, comedian, feminist and fierce disability activist.',
        link: { text: 'Read Stella\'s profile', url: '#' },
        image: 'https://placehold.it/148x148'
      },
      {
        name: 'Stella Young',
        inductionYear: '2017',
        category: 'Local Champion',
        lifespan: '1982 - 2014',
        summary: 'Journalist, comedian, feminist and fierce disability activist.',
        link: { text: 'Read Stella\'s profile', url: '#' },
        image: 'https://placehold.it/148x148'
      },
      {
        name: 'Stella Young',
        inductionYear: '2017',
        category: 'Local Champion',
        lifespan: '1982 - 2014',
        summary: 'Journalist, comedian, feminist and fierce disability activist.',
        link: { text: 'Read Stella\'s profile', url: '#' },
        image: 'https://placehold.it/148x148'
      },
      {
        name: 'Stella Young',
        inductionYear: '2017',
        category: 'Local Champion',
        lifespan: '1982 - 2014',
        summary: 'Journalist, comedian, feminist and fierce disability activist.',
        link: { text: 'Read Stella\'s profile', url: '#' },
        image: 'https://placehold.it/148x148'
      }
    ]
  ),

  grantSearchResultItems: () => (
    [
      {
        title: text('Title', 'Program Overview'),
        funding: object('Funding', {
          from: 10000,
          to: 30000
        }),
        link: object('Link', { text: 'Read more', url: '#' }),
        audience: text('Audience', 'individuals, organisations, local council'),
        startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
        enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
        description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'),
        tags: object('Tags', [{
          linkText: 'This is a content tag',
          linkUrl: '#'
        }, {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }])
      },
      {
        title: text('Title', 'Program Overview'),
        funding: object('Funding', {
          from: 10000,
          to: 30000
        }),
        link: object('Link', { text: 'Read more', url: '#' }),
        audience: text('Audience', 'individuals, organisations, local council'),
        startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
        enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
        description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'),
        tags: object('Tags', [{
          linkText: 'This is a content tag',
          linkUrl: '#'
        }, {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }])
      },
      {
        title: text('Title', 'Program Overview'),
        funding: object('Funding', {
          from: 10000,
          to: 30000
        }),
        link: object('Link', { text: 'Read more', url: '#' }),
        audience: text('Audience', 'individuals, organisations, local council'),
        startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
        enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
        description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'),
        tags: object('Tags', [{
          linkText: 'This is a content tag',
          linkUrl: '#'
        }, {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }])
      },
      {
        title: text('Title', 'Program Overview'),
        funding: object('Funding', {
          from: 10000,
          to: 30000
        }),
        link: object('Link', { text: 'Read more', url: '#' }),
        audience: text('Audience', 'individuals, organisations, local council'),
        startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
        enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
        description: text('Description', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas.'),
        tags: object('Tags', [{
          linkText: 'This is a content tag',
          linkUrl: '#'
        }, {
          linkText: 'This is a content tag',
          linkUrl: '#'
        }])
      }
    ]
  ),

  searchResults: () => ({
    count: number('Count', 70),
    type: 'default',
    responseSize: number('Response size', 10),
    errorMsg: text('Error message', 'Search isn\'t working right now, please try again later.'),
    noResultsMsg: text('No results message', 'Sorry! We couldn\'t find any matches for bananas')
  }),

  cardSearchResults: () => ({
    count: number('Count', 10),
    type: selectV2('Type', {RplCardEvent: 'RplCardEvent', RplCardPromotion: 'RplCardPromotion', RplCardHonourRoll: 'RplCardHonourRoll'}, 'RplCardEvent'),
    responseSize: number('Response size', 4),
    errorMsg: text('Error message', 'Search isn\'t working right now, please try again later.'),
    noResultsMsg: text('No results message', 'Sorry! We couldn\'t find any matches for bananas')
  }),

  grantSearchResults: () => ({
    count: number('Count', 10),
    type: 'RplGrantListItem',
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
    submitHandler () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.formData.formState = {
            response: {
              status: 'success',
              message: `<code>${JSON.stringify(this.formData.model)}</code>`
            }
          }
          resolve()
        }, 500)
      })
    },
    title: 'Example Form',
    isNewModel: true,
    options: {
      validateAfterChanged: true,
      validateAfterLoad: false
    },
    formData: {
      model: {
        hidden: '',
        text: null,
        email: '',
        tel: '',
        number: '',
        radio: null,
        textArea: null,
        dateRange: ['', ''],
        date: '',
        address: {
          state: 'vic'
        },
        checkbox: true,
        select: '',
        multiselect: ['topic_b'],
        checklistlistbox: ['topic_a'],
        rangeslider: [10000, 70000]
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
            validator (value) {
              if (value === '') {
                return ['This field is required']
              }
              return []
            },
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
            validator (value) {
              if (value === '') {
                return ['This field is required']
              }
              return []
            },
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
            type: 'rplslider',
            label: 'Set a funding range',
            hint: '$0 - $80,000',
            model: 'rangeslider',
            step: 5000,
            min: 0,
            max: 80000,
            prefix: '$',
            default: true
          },

          {
            type: 'rpldivider'
          },

          {
            type: 'rplmarkup',
            markup: '<h3>Markup field</h3> <article class="embedded-entity embedded-entity--media embedded-entity--media--document"><article class="media media--type-document media--view-mode-embedded"><div class="field field--name-field-media-file field--type-file field--label-hidden field__item"><span class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"><a href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx" aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB." class="x-office-document tide-external-link" target="_blank"><span class="file--title"> Detailed Guide on the mandatory IR management criteria </span><span class="file--type">Word</span><span class="file--size">75.22 KB</span></a></span></div></article></article> <p>A paragraph of <strong>text</strong> with a <a href="https://vic.gov.au">link</a>.</p>'
          },

          {
            type: 'rplcheckbox',
            inlineLabel: 'Check box selected',
            model: 'checkbox',
            default: true
          },

          {
            type: 'rplchecklist',
            label: 'Multi-select list box',
            model: 'checklistlistbox',
            listBox: true,
            hint: 'Implemented using rplchecklist with listBox: true',
            placeholder: 'Select multiple topics',
            values: [{value: 'topic_a', name: 'Topic A'}, {value: 'topic_b', name: 'Topic B'}, {value: 'topic_c', name: 'Topic C'}, {value: 'topic_d', name: 'Topic D'}]
          },

          {
            type: 'rplselect',
            model: 'select',
            required: true,
            validator: ['required'],
            label: 'Single-select drop down',
            hint: 'Implemented using rplSelect',
            placeholder: 'Select a single topic',
            values: [{id: 'topic_a', name: 'Topic A'}, {id: 'topic_b', name: 'Topic B'}, {id: 'topic_c', name: 'Topic C'}, {id: 'topic_d', name: 'Topic D'}, {id: 'topic_e', name: 'Topic e'}, {id: 'topic_f', name: 'Topic f'}, {id: 'topic_g', name: 'Topic g'}, {id: 'topic_h', name: 'Topic h'}]
          },
          {
            type: 'rplselect',
            model: 'multiselect',
            required: true,
            validator (value, field) {
              if (value && value.length >= field.min) {
                return []
              }
              return ['Add a selection']
            },
            min: 1,
            label: 'Multi-select drop down',
            hint: 'Implemented using rplSelect',
            placeholder: 'Select several topics',
            multiselect: true,
            values: [{id: 'topic_a', name: 'Topic A'}, {id: 'topic_b', name: 'Topic B'}, {id: 'topic_c', name: 'Topic C'}, {id: 'topic_d', name: 'Topic D'}, {id: 'topic_e', name: 'Topic E'}, {id: 'topic_f', name: 'Topic F'}, {id: 'topic_g', name: 'Topic G'}, {id: 'topic_h', name: 'Topic H'}]
          }
        ],
        groups: [
          {
            legend: 'Event location (grouped fields)',
            styleClasses: ['rpl-fieldset--pad'],
            fields: [
              {
                type: 'input',
                inputType: 'text',
                label: 'Building name',
                required: true,
                validator: ['required'],
                placeholder: 'Enter some text...',
                model: 'address.address_line1',
                styleClasses: ['form-group--col-two']
              },
              {
                type: 'input',
                inputType: 'text',
                required: true,
                validator: ['required'],
                label: 'Street address',
                placeholder: 'Enter some text...',
                model: 'address.address_line2',
                styleClasses: ['form-group--col-two']
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Suburb',
                required: true,
                validator: ['required'],
                placeholder: 'Enter some text...',
                model: 'address.locality',
                styleClasses: ['form-group--col-two']
              },
              {
                type: 'rplselect',
                label: 'State',
                model: 'address.state',
                required: true,
                validator: ['required'],
                selectOptions: {
                  trackBy: 'id',
                  label: 'name',
                  closeOnSelect: true,
                  searchable: false,
                  showLabels: false
                },
                values: [{id: 'vic', name: 'Vic'}, {id: 'nsw', name: 'New South Wales'}, {id: 'wa', name: 'Western Australia'}, {id: 'ql', name: 'Queensland'}],
                styleClasses: ['form-group--col-two']
              },
              {
                type: 'input',
                inputType: 'text',
                label: 'Postcode',
                placeholder: 'Enter some text...',
                model: 'address.postcode',
                styleClasses: ['form-group--col-two']
              }
            ]
          },
          {
            fields: [
              {
                type: 'rplsubmitloader',
                buttonText: 'Submit (with animation)',
                loading: false,
                autoUpdate: true,
                styleClasses: ['form-group--inline']
              },
              {
                type: 'rplclearform',
                buttonText: 'Clear search filters',
                styleClasses: ['form-group--inline']
              }
            ]
          }
        ]
      },
      tag: 'rpl-fieldset',
      formOptions: {
        validateAfterLoad: false,
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

  textIcon: () => ({
    text: text('Text', 'Text Link'),
    placement: selectV2('Placement', {before: 'before', after: 'after'}, 'after'),
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
      'ai',
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
      'browser',
      'calendar',
      'child_friendly',
      'close',
      'csv',
      'cross_circle',
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
      'eps',
      'external_link',
      'facebook',
      'free',
      'fullscreen',
      'hamburger',
      'help',
      'home',
      'ics',
      'indd',
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
      'print',
      'right',
      'search',
      'senior',
      'share',
      'share_alternative',
      'star',
      'stop',
      'success',
      'tick',
      'tif',
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
      'zip',
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

  // This function name isn't map() because that's
  // a JavaScript function already.
  mapData: () => ({
    baseMapUrl: 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
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
    link: text('Link', ''),
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
    galleryData: object('Gallery Data', [{
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
    funding: object('Funding', {
      from: 10000,
      to: 30000
    }),
    audience: text('Audience', 'individuals, organisations, local council'),
    startdate: text('Start Date', '2018-10-10T09:00:00.000+10:00'),
    enddate: text('End Date', '2018-12-10T09:00:00.000+10:00'),
    description: text('Description', '<p>This is a description of the grant. Omnis facilis omnis. Quia cumque eius mollitia iusto corporis suscipit aliquid qui et. Ut cumque molestiae qui aperiam totam. Vel consequatur ut at aut ipsum. Quia qui corporis totam ut. Veniam beatae praesentium recusandae.Dolorem praesentium quo molestiae beatae. Eaque natus animi omnis aliquam voluptatibus vel odit voluptatum. Sint et omnis est porro corrupti recusandae. Rem doloribus nam quia est iste. Temporibus velit qui odio et molestiae iure nam magnam. Sit et possimus neque quasi et. Quae necessitatibus debitis cumque libero natus quidem. Architecto nulla est doloremque. Ut excepturi voluptatem. Doloribus dolorem voluptates aut eos vitae ut tenetur enim suscipit. <article class="embedded-entity embedded-entity--media embedded-entity--media--document"><article class="media media--type-document media--view-mode-embedded"><div class="field field--name-field-media-file field--type-file field--label-hidden field__item"><span class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"><a href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx" aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB." class="x-office-document tide-external-link" target="_blank"><span class="file--title"> Detailed Guide on the mandatory IR management criteria </span><span class="file--type">Word</span><span class="file--size">75.22 KB</span></a></span></div></article></article> <p>A paragraph of <strong>text</strong> with a <a href="https://vic.gov.au">link</a>.</p>'),
    link: object('Call to action', { text: 'Apply Now', url: '#' }),
    listing: boolean('Listing', false)
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
      'Lightning': 'Lightning',
      'Pollution': 'Pollution',
      'Heat wave': 'Heat wave',
      'Traffic': 'Traffic'
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
  }),

  documentLink: () => ({
    name: text('Name', 'This is the name of the document'),
    caption: text('caption', 'This is a longer description of the document above.'),
    url: text('Download url', 'https://www.google.com'),
    extension: text('Extension', 'pdf'),
    filesize: text('Filesize', '1.4 mb')
  }),

  markup: () => ({
    html: text('Html', `
    <h2>Embedded document</h2>
    <article
      class="embedded-entity embedded-entity--media embedded-entity--media--document"
    >
      <article class="media media--type-document media--view-mode-embedded">
        <div
          class="field field--name-field-media-file field--type-file field--label-hidden field__item"
        >
          <span
            class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"
            ><a
              href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx"
              aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB."
              class="x-office-document tide-external-link"
              target="_blank"
              ><span class="file--title">
                Detailed Guide on the mandatory IR management criteria </span
              ><span class="file--type">Word</span
              ><span class="file--size">75.22 KB</span></a
            ></span
          >
        </div>
      </article>
    </article>
    <h2>Link</h2>
    <p>
      A paragraph of <strong>text</strong> with a
      <a href="https://vic.gov.au">link</a>.
    </p>
    <h2>Button</h2>
    <a href="http://www.google.com" class="button">go to google</a>
    <h2>Quotation</h2>
    <blockquote class="quotation">
      <p>
        Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis
        dolorpo rrorem reptaep elenis net.
      </p>
      <footer>
        <cite
          ><span class="quotation__author"
            >Her Excellency the Honourable Linda Dessau AC</span
          ><br />
          <span class="quotation__author-title">Governor of Victoria</span></cite
        >
      </footer>
    </blockquote>
    <h2>Image</h2>
    <figure
      role="group"
      class="caption caption-article embedded-entity embedded-entity--media embedded-entity--media--image"
    >
      <article>
        <article class="media media--type-image media--view-mode-embedded">
          <div
            class="field field--name-field-media-image field--type-image field--label-hidden field__item"
          >
            <img
              alt=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
              height="150"
              src="https://www.develop.content.vic.gov.au/sites/default/files/2019-03/womens-honour-roll-2019-Judy-Tegart-Dalton.png"
              title=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
              width="150"
            />
          </div>
        </article>
      </article>
      <figcaption>caption</figcaption>
    </figure>
    `)
  }),

  profileHightlight: () => ({
    image: text('Image', 'http://placehold.it/156x156'),
    content: text('Content', '<p>HTML Content</p>')
  }),

  profileHighlightHonourRoll: () => ({
    image: text('Image', 'http://placehold.it/156x156'),
    inductedYear: text('Inducted Year', '2018'),
    category: text('Category', 'Local Champion')
  }),

  accordion: () => ({
    title: text('Title', 'Accordion Set'),
    type: selectV2('Type', ['numbered', 'default'], 'default'),
    accordions: object('Accordion', [{
      title: 'Accordion Item',
      content: 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.'
    }, {
      title: 'Accordion Item',
      content: 'Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.'
    }]),
    single: boolean('Single', false)
  }),

  publicationPagination: () => ({
    previousLink: text('Previous Link', '#'),
    previousText: text('Previous Text', 'Previous'),
    previousDescription: text('Previous Description', 'Previous page title can wrap over two lines'),
    nextLink: text('Next Link', '#'),
    nextText: text('Next Text', 'Next'),
    nextDescription: text('Next Description', 'Next page title can wrap over two lines')
  }),

  publicationDownloadPrint: () => ({
    links: object('Links', [{
      name: 'Short title of a document',
      url: '#',
      extension: 'pdf',
      filesize: '1.2 mb'
    }, {
      name: 'External document link',
      url: 'https://www.google.com',
      extension: 'pdf',
      filesize: '1.2 mb'
    }]),
    showPrint: boolean('Show print', true)
  }),

  publicationImage: () => ({
    title: text('Title', 'Figure 1.2'),
    image: object('Image', {
      src: 'https://placehold.it/800x400.jpg',
      alt: 'A generic square placeholder image.'
    }),
    caption: text('Caption', 'This is caption copy for use alongside informational images or for legal information.'),
    source: text('Source', 'Source: This is for the source to use alongside informational images or for legal information.'),
    fullscreen: text('Fullscreen', 'View Figure 1.2 in full screen'),
    expand: text('Expand', 'View Figure 1.2 in table format'),
    expandTitle: text('Expand Title', 'Figure 1.2'),
    html: text('Html', `<div class="rpl-markup__table">
  <table>
    <thead>
      <tr>
        <th>Column header one</th>
        <th>Header number two</th>
        <th>Third column header</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Data point one</td>
        <td>This is a piece of data</td>
        <td>Third column information</td>
      </tr>
      <tr>
        <td>Data pt two</td>
        <td>This is data</td>
        <td>Fourth col info here</td>
      </tr>
      <tr>
        <td>Data point three</td>
        <td>This is a piece of data</td>
        <td>Third column info here</td>
      </tr>
      <tr>
        <td>Point four</td>
        <td>This is some data</td>
        <td>Information goes here</td>
      </tr>
      <tr>
        <td>Five</td>
        <td>This is a piece of data</td>
        <td>Third column info here</td>
      </tr>
      <tr>
        <td>Data point six</td>
        <td>This is some data</td>
        <td>Information</td>
      </tr>
    </tbody>
  </table>
</div>`),
    download: text('Download', 'Download Figure 1.2')
  }),

  pageLayout: () => ({
    columns: object('Columns', {
      main: {l: 8},
      sidebar: {
        colsBp: {l: 3},
        push: {l: 1}
      }
    })
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
