import { svgPlaceholder } from 'ripple-storybook/utils'

export const exampleKeyDatesCard = {
  type: 'keydates',
  url: '#',
  title: 'Key dates link',
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
}

export const exampleCards = [
  {
    type: 'promo',
    title: 'Example title',
    meta: {
      topic: 'Environment'
    },
    url: '#',
    summary:
      'Labore mollit labore tempor quis ex fugiat eu proident aliqua ipsum duis, fugiat eu proident aliqua.'
  },
  {
    type: 'promo',
    title: 'Another title',
    meta: {
      topic: 'Health',
      dateStart: '2019-01-01T09:00:00.000+10:00',
      dateEnd: '2020-12-01T09:00:00.000+10:00'
    },
    url: '#',
    image: {
      src: svgPlaceholder({
        width: 400,
        height: 300,
        bgColor: '#4b4352',
        fgColor: '#efeef0'
      }),
      width: 400,
      height: 300,
      alt: ''
    },
    summary:
      'Elit adipisicing velit exercitation fugiat ex incididunt ullamco magna cupidatat dolore eiusmod sit amet.'
  },
  {
    type: 'promo',
    title: 'A great title',
    meta: {
      topic: 'Community',
      date: '2020-12-01T09:00:00.000+10:00'
    },
    url: '#',
    summary:
      'Consequat deserunt fugiat eu proident velit exercitation fugiat ex aliqua ipsumnisi dolore id eata quest.'
  }
]
