import { expect, describe, it } from '@jest/globals'
import { ITideCardCarouselItem } from './card-carousel-mapping'
import { mapping as customMapping } from './custom-mapping.js'
import { mapping as newsMapping } from './news-mapping.js'
import { mapping as eventMapping } from './event-mapping.js'
import { rawDataCustom, rawDataEvent, rawDataNews } from './test-data'

describe('cardCarouselMapping', () => {
  it('maps a raw json api response to the correct structure for custom cards', () => {
    const result: Array<ITideCardCarouselItem> = [
      {
        type: 'promo',
        title: 'Event title',
        url: '/demo-event',
        image: {
          alt: 'Demo: Aerial shot of new housing development',
          focalPoint: undefined,
          height: 571,
          src: '/sites/default/files/tide_demo_content/Aerial-shot-of-new-housing-development.jpg',
          title: 'Demo: Aerial shot of new housing development',
          width: 1024
        },
        meta: {
          dateStart: '2022-12-01T09:30:00+11:00',
          dateEnd: '2022-12-31T17:00:00+11:00',
          topic: null
        },
        summary: 'Event Card Summary'
      },
      {
        type: 'promo',
        title: 'Demo Event',
        url: '/demo-event',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        meta: {
          dateStart: '2019-07-02T09:00:00+1000',
          dateEnd: '2019-07-07T10:00:00+1000',
          topic: null
        },
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.'
      },
      {
        type: 'keydates',
        url: '/sdpta-key-dates-landing-page-fixture',
        title: 'Key dates link text',
        keyDates: [
          {
            title: 'June 13th, 2023 and beyond',
            subtitle: 'Key Dates Card',
            content: 'Key Dates Card Summary'
          },
          {
            title: 'Another key date is Feb 21st',
            subtitle: 'Key Dates Card 2',
            content: 'Key Dates Card Summary 2'
          }
        ]
      },
      {
        type: 'promo',
        title: 'Promotion Card',
        url: '/sdpta-promotion-card-landing-page-fixture',
        image: {
          alt: 'Demo: Engage Vic Hero',
          focalPoint: undefined,
          height: 500,
          src: '/sites/default/files/tide_demo_content/Engage-Vic-photo-hero.jpeg',
          title: 'Engage Vic',
          width: 737
        },
        meta: {
          topic: 'Demo Topic',
          date: '2022-11-03T03:15:00+11:00'
        },
        summary: 'Promotion Card summary'
      },
      {
        type: 'promo',
        title: 'Demo News',
        url: '/demo-news',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        meta: {
          topic: 'Demo Topic',
          date: '2022-12-01T09:17:45+11:00'
        },
        summary: null
      }
    ]

    expect(rawDataCustom.field_paragraph_items.map(customMapping)).toEqual(
      result
    )
  })

  it('maps a raw json api response to the correct structure for news cards', () => {
    const result: Array<ITideCardCarouselItem> = [
      {
        type: 'promo',
        title: 'News for CC 1',
        url: '/news-cc-1',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        meta: {
          topic: 'Content Collection Topic 1',
          date: '2050-07-02T10:00:00+11:00'
        },
        summary:
          'NP1 Etiam scelerisque lorem sit amet sapien iaculis, nec dignissim augue cursus. Mauris eu purus a neque tristique venenatis sit amet sed sem. Aenean viverra lectus ut tempus sollicitudin.'
      },
      {
        type: 'promo',
        title: 'News for CC 2',
        url: '/news-cc-2',
        image: null,
        meta: {
          topic: 'Content Collection Topic 1',
          date: '2048-07-02T10:00:00+11:00'
        },
        summary:
          'NP2 Pellentesque a pharetra magna. Pellentesque vitae est a sapien mi enim, eu sodales diam pretium in. Quisque vitae quam et lectus condimentum ultricies.'
      },
      {
        type: 'promo',
        title: 'SDPTA: news page news - fixture',
        url: '/sdpta-news-page-news-fixture-0',
        image: {
          alt: 'Demo: 2018-19 State Budget',
          focalPoint: undefined,
          height: 270,
          src: '/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
          title: 'Demo: 2018-19 State Budget',
          width: 450
        },
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T10:33:47+11:00'
        },
        summary: 'Some summary text'
      },
      {
        type: 'promo',
        title: 'SDPTA: [SDPTA-193] Minimal News page - fixture',
        url: '/sdpta-sdpta-193-minimal-news-page-fixture-0',
        image: null,
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T10:33:04+11:00'
        },
        summary: 'Sed sunt amet proident do.'
      },
      {
        type: 'promo',
        title: 'SDPTA: Related links news - fixture',
        url: '/sdpta-related-links-news-fixture-0',
        image: null,
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T10:07:49+11:00'
        },
        summary: 'Some summary text'
      },
      {
        type: 'promo',
        title: 'SDPTA: Test News page - fixture',
        url: '/sdpta-test-news-page-fixture-0',
        image: {
          alt: 'Demo: 2018-19 State Budget',
          focalPoint: undefined,
          height: 270,
          src: '/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
          title: 'Demo: 2018-19 State Budget',
          width: 450
        },
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T10:01:08+11:00'
        },
        summary: 'Some summary text'
      },
      {
        type: 'promo',
        title: 'SDPTA: news page news - fixture',
        url: '/sdpta-news-page-news-fixture',
        image: {
          alt: 'Demo: 2018-19 State Budget',
          focalPoint: undefined,
          height: 270,
          src: '/sites/default/files/tide_demo_content/2018-19-State-Budget.jpg',
          title: 'Demo: 2018-19 State Budget',
          width: 450
        },
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T09:54:47+11:00'
        },
        summary: 'Some summary text'
      },
      {
        type: 'promo',
        title: 'SDPTA: [SDPTA-193] Minimal News page - fixture',
        url: '/sdpta-sdpta-193-minimal-news-page-fixture',
        image: null,
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T09:54:24+11:00'
        },
        summary: 'Sed sunt amet proident do.'
      },
      {
        type: 'promo',
        title: 'SDPTA: Related links news - fixture',
        url: '/sdpta-related-links-news-fixture',
        image: null,
        meta: {
          topic: 'Another Demo Topic',
          date: '2022-12-01T09:41:26+11:00'
        },
        summary: 'Some summary text'
      }
    ]

    expect(rawDataNews.map(newsMapping)).toEqual(result)
  })

  it('maps a raw json api response to the correct structure for event cards', () => {
    const result: Array<ITideCardCarouselItem> = [
      {
        type: 'promo',
        title: '2-BE-event-1',
        url: '/2-be-event-1',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        meta: {
          dateStart: '2019-05-20T21:02:20+1000',
          dateEnd: '2019-05-20T21:11:01+1000',
          topic: null
        },
        summary:
          'Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs END'
      },
      {
        type: 'promo',
        title: 'Demo Event',
        url: '/demo-event',
        image: {
          alt: 'Demo: Melbourne tram',
          focalPoint: undefined,
          height: 785,
          src: '/sites/default/files/tide_demo_content/Melbourne-tram.jpg',
          title: 'Demo: Melbourne tram',
          width: 1413
        },
        meta: {
          dateStart: '2019-07-02T09:00:00+1000',
          dateEnd: '2019-07-07T10:00:00+1000',
          topic: null
        },
        summary:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.'
      },
      {
        type: 'promo',
        title: 'Roulette Aerial Display - demo',
        url: '/roulette-aerial-display-demo',
        image: {
          alt: 'Demo: Roulette aerial display',
          focalPoint: undefined,
          height: 496,
          src: '/sites/default/files/tide_demo_content/roulette-aerial-display-card.jpg',
          title: 'Demo: Roulette aerial display',
          width: 818
        },
        meta: {
          dateStart: '2022-01-26T23:30:00+1100',
          dateEnd: '2022-01-26T23:45:00+1100',
          topic: null
        },
        summary: 'Air Force Roulettes at Australia Day in Victoria.'
      },
      {
        type: 'promo',
        title: 'The Trades Fit: Young Women in Trades and Tech - demo',
        url: '/trades-fit-young-women-trades-and-tech-demo',
        image: null,
        meta: {
          dateStart: '2022-05-16T19:30:00+1000',
          dateEnd: '2022-05-18T01:30:00+1000',
          topic: null
        },
        summary:
          'The Trades Fit expo demonstrates the exciting world of trade and tech industries to young women and the rewarding, and well-paid career opportunities they can provide.'
      },
      {
        type: 'promo',
        title: 'Kensington Primary School - information session - demo',
        url: '/kensington-primary-school-information-session-demo',
        image: null,
        meta: {
          dateStart: '2022-10-13T05:00:00+1100',
          dateEnd: '2022-10-13T05:45:00+1100',
          topic: null
        },
        summary:
          "An online information session for school and community members to discuss Kensington Primary School's exciting upgrade project."
      }
    ]

    expect(rawDataEvent.map(eventMapping)).toEqual(result)
  })
})
