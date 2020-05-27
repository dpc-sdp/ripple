import { storiesOf } from '@storybook/vue'
import RplCardContent from './CardContent.vue'
import RplCardImageNavigation from './CardImageNavigation.vue'
import RplCardNavigation from './CardNavigation.vue'
import RplCardNavigationFeatured from './CardNavigationFeatured.vue'
import RplCardPromotion from './CardPromotion.vue'
import RplCardKeydates from './CardKeydates.vue'
import RplCardEvent from './CardEvent.vue'
import RplCardCta from './CardCta.vue'
import RplCardEmergencyContact from './CardEmergencyContact.vue'
import RplCardBox from './CardBox.vue'
import RplCardProfile from './CardProfile.vue'
import RplCardCarousel from './CardCarousel.vue'

import {
  withKnobs,
  text,
  select,
  object,
  boolean,
  number
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Card/Card Navigation', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplCardNavigation },
    template: `<rpl-card-navigation :title="title" :summary="summary" :link="link" />`,
    props: {
      title: {
        default: text('Title', 'First navigation card')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
      },
      link: {
        default: () => object('Link', { text: 'Read more', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Navigation Featured', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardNavigationFeatured },
    template: `<rpl-card-navigation-featured :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :url="url" />`,
    props: {
      title: {
        default: text('Title', 'This is display copy that wraps 2 lines')
      },
      summary: {
        default: text('Summary', 'We are looking at ways to make housing more affordable and renting more secure. Tell us what works for you or find out what\'s happening.')
      },
      url: {
        default: text('Url', '#')
      },
      image: {
        default: text('Image', 'https://placehold.it/818x497')
      },
      date: {
        default: text('Date', '2018-03-23T09:00:00.000+10:00')
      },
      topic: {
        default: text('Topic', 'Community')
      }
    }
  }))

storiesOf('Molecules/Card/Card Image Navigation', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardImageNavigation },
    template: `<rpl-card-image-navigation :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :link="link" />`,
    props: {
      image: {
        default: text('Image', 'https://placehold.it/304x199')
      },
      date: {
        default: text('Date', '2018-03-23T09:00:00.000+10:00')
      },
      topic: {
        default: text('Topic', 'Community')
      },
      title: {
        default: text('Title', 'This heading could wrap over two lines')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.')
      },
      link: {
        default: () => object('Link', { text: 'Call to action', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Promotion', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardPromotion },
    template: `<rpl-card-promotion :image="image" :date="date" :topic="topic" :title="title" :summary="summary" :link="link" />`,
    props: {
      image: {
        default: text('Image', 'https://placehold.it/304x199')
      },
      date: {
        default: text('Date', '2018-03-23T09:00:00.000+10:00')
      },
      topic: {
        default: text('Topic', 'News')
      },
      title: {
        default: text('Title', 'This is display copy that wraps 2 lines')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.')
      },
      link: {
        default: () => object('Link', { text: 'Read more', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Keydates', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardKeydates },
    template: `<rpl-card-keydates :title="title" :keydates="keydates" :link="link" />`,
    props: {
      title: {
        default: text('Title', 'Key calendar dates')
      },
      keydates: {
        default: () => object('Keydates', [
          { date: '3 April', title: 'Term two starts', description: 'Its back to the classroom as school start term two on the 16th April.' },
          { date: '23 April', title: 'ANZAC Day', description: 'National day of remembrance to commemorate the ANZACs.' }
        ])
      },
      link: {
        default: () => object('Link', { text: 'Read more', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Event', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardEvent },
    template: `<rpl-card-event :image="image" :dateStart="dateStart" :dateEnd="dateEnd" :location="location" :title="title" :summary="summary" :link="link" />`,
    props: {
      image: {
        default: text('Image', 'https://placehold.it/304x199')
      },
      dateStart: {
        default: text('Date Start', '2018-07-10T09:00:00.000+10:00')
      },
      dateEnd: {
        default: text('Date Start', '2018-07-11T09:00:00.000+10:00')
      },
      location: {
        default: text('Location', 'South Yarra')
      },
      title: {
        default: text('Title', 'This is the headline of an event with a location that will stretch over over 3 lines')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.')
      },
      link: {
        default: () => object('Link', { text: 'See event details', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Cta', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardCta },
    template: `<rpl-card-cta :image="image" :title="title" :summary="summary" :link="link" />`,
    props: {
      image: {
        default: text('Image', 'https://placehold.it/148x148')
      },
      title: {
        default: text('Title', 'Want to submit an event?')
      },
      summary: {
        default: text('Summary', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua laboris nisi ut aliquip ex ea commodo consequat.')
      },
      link: {
        default: () => object('Link', { text: 'See event details', url: '#' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Emergency Contact', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardEmergencyContact },
    template: `<rpl-card-emergency-contact :title="title" :subtitle="subtitle" :summary="summary" :link="link" />`,
    props: {
      title: {
        default: text('Title', 'Emergency Assistance')
      },
      subtitle: {
        default: text('Subtitle', 'Urgent')
      },
      summary: {
        default: text('Summary', 'Dial 000 for police, fire & ambulance')
      },
      link: {
        default: () => object('Link', { text: 'Call 000', url: 'tel:000' })
      }
    }
  }))

storiesOf('Molecules/Card/Card Box', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardBox },
    template: `<rpl-card-box :cards="cards" />`,
    props: {
      cards: {
        default: () => object('Cards', [
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
      }
    }
  }))

storiesOf('Molecules/Card/Card Profile', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardProfile },
    template: `
      <rpl-card-profile
        :name="name"
        :inductionYear="inductionYear"
        :lifespan="lifespan"
        :summary="summary"
        :link="link"
        :image="image"
      />
    `,
    props: {
      name: {
        default: text('Name', 'Stella Young')
      },
      inductionYear: {
        default: text('Induction Year', '2017')
      },
      lifespan: {
        default: text('Lifespan', '1982 - 2014')
      },
      summary: {
        default: text('Summary', 'Journalist, comedian, feminist and fierce disability activist.')
      },
      link: {
        default: () => object('Link', { text: 'Read Stella\'s profile', url: '#' })
      },
      image: {
        default: text('Image', 'https://placehold.it/148x148')
      }
    }
  }))

storiesOf('Molecules/Card/Card Content (base)', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplCardContent },
    template: `
      <rpl-card-content :link="link" :image="image" :border="border" :type="type" :center="center">
        <div v-html="content"></div>
      </rpl-card-content>
    `,
    props: {
      link: {
        default: () => object('Link', { text: 'Read more', url: '#' })
      },
      image: {
        default: text('Image', 'https://placehold.it/580x340')
      },
      border: {
        default: boolean('Border', true)
      },
      type: {
        default: () => select('Type', { default: 'default', simple: 'simple', inline: 'inline' }, 'default')
      },
      center: {
        default: boolean('Center', false)
      },
      content: {
        default: text('HTML content', '<h2>Custom Content</h2><p>Lorem ipsum dolor sit amet.</p>')
      }
    }
  }))

storiesOf('Molecules/Card/Card Carousel', module)
  .addDecorator(withKnobs)

  .add('Default', () => ({
    components: { RplCardCarousel },
    template: `<rpl-card-carousel :title="title" :cards="cards" :childColsBp="childColsBp" :totalGridColumns="totalGridColumns" />`,
    props: {
      title: {
        default: text('Title', 'Featured Content')
      },
      childColsBp: {
        default: () => object('Column breakpoints', { l: 4, m: 6 })
      },
      totalGridColumns: {
        default: number('Total grid columns', 12)
      },
      cards: {
        default: () => object('Cards', [
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
        ])
      }
    }
  }))
