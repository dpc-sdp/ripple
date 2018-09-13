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
    type: selectV2('Type', {default: 'default', simple: 'simple'}, 'default'),
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
    image: text('Image', 'https://placehold.it/818x497')
  }),

  cardMasonry: () => ({
    title: text('Title', 'Image title'),
    summary: text('Summary', 'Holden utility, registration no. GOG 871, with police insignia on door, police light on top of vehicle and PA system in the tray of vehicle. Damage to the front bumper, with vehicle raised on hoist. Circa 1956'),
    link: object('Link', { text: 'Read more', url: '#' }),
    image: object('Image', { alt: 'Alternative text', src: 'https://placehold.it/580x340' })
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
    date: text('Date', '2018-07-10T09:00:00.000+10:00'),
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

  relatedLinks: () => ({
    title: text('Title', 'Related links'),
    links: object('Links', [
      { text: 'Link to additional content', url: '#' },
      { text: 'Second link it goes right here', url: '#' },
      { text: 'Third link to extra content', url: '#' },
      { text: 'This is a long link to extra content', url: '#' }
    ])
  }),

  whatsNext: () => ({
    title: text('Title', 'What\'s next?'),
    links: object('Links', [
      { text: 'Link to additional content', url: '#' },
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
    acknowledgement: text('Acknowledgement', 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.')
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

  searchResults: () => ({
    count: number('Count', 10),
    responseSize: number('Response size', 2),
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
        radio: null,
        textArea: ''
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
            required: true,
            placeholder: 'Enter some text...',
            model: 'text'
          },

          {
            type: 'input',
            inputType: 'email',
            label: 'Email',
            model: 'email'
          },

          {
            type: 'input',
            inputType: 'tel',
            label: 'Tel',
            model: 'tel'
          },

          {
            type: 'vueMultiSelect',
            model: 'select',
            label: 'Select',
            values: [
              'option A',
              'option B'
            ]
          },

          {
            type: 'radios',
            label: 'Radio',
            model: 'radio',
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
            rows: 4,
            required: true,

            visible (model) {
              return model && model.was_this_page_helpful !== null
            }
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
      'arrow_left_primary',
      'arrow_left_secondary',
      'arrow_right_primary',
      'arrow_right_primary_s',
      'arrow_right_secondary',
      'arrow_up_primary',
      'attach',
      'blank_solid',
      'calendar',
      'close',
      'csv',
      'doc',
      'document',
      'document_transparent',
      'docx',
      'dot',
      'dotm',
      'dotx',
      'down',
      'download',
      'email_solid',
      'email_transparent',
      'external_link',
      'facebook',
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
      'share',
      'share_alternative',
      'star',
      'stop',
      'tick',
      'trash',
      'twitter',
      'txt',
      'up',
      'upload',
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
