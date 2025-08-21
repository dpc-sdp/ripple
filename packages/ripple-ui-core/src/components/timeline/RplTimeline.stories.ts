import type { Meta, StoryObj } from '@storybook/vue3'
import { svgPlaceholder } from 'ripple-storybook/utils'
import RplTimeline from './RplTimeline.vue'

export default {
  title: 'Core/Containers/Timeline',
  component: RplTimeline
} satisfies Meta<typeof RplTimeline>

type Story = StoryObj<typeof RplTimeline>

export const DefaultStory: Story = {
  name: 'Default',
  args: {
    title: 'Timeline heading',
    items: [
      {
        image: {
          src: svgPlaceholder({ width: 320, height: 240 }),
          alt: 'Placeholder image'
        },
        title: 'Timeline item with link',
        url: '#',
        dateStart: '2019-01-01T09:00:00.000+10:00',
        dateEnd: '2020-12-01T09:00:00.000+10:00',
        description:
          'Contains image, title, internal URL, different start / end date and description.'
      },
      {
        title: 'Timeline item 2',
        subtitle: 'Contains title and custom subtitle.'
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'Timeline item 3',
        dateStart: '2018-01-01T09:00:00.000+10:00',
        dateEnd: '2018-01-15T09:00:00.000+10:00',
        subtitle: 'Custom subtitle - this should not show.',
        description:
          'Contains image, title, different start / end date, subtitle (hidden) and description.'
      },
      {
        title: 'Timeline item 4',
        dateStart: '2018-03-01T09:00:00.000+10:00',
        dateEnd: '2018-03-01T09:00:00.000+10:00',
        description:
          'Contains title, matching start / end date and description.'
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'Timeline item 5 with link',
        url: 'https://www.google.com',
        description:
          '<p>Contains an image, title, external URL and description.</p><ul><li>Also a list</li></ul>'
      }
    ]
  }
}

export const HeadingsOnly: Story = {
  args: {
    title: 'Timeline heading',
    items: [
      {
        title: 'Timeline item 1'
      },
      {
        title: 'Timeline item 2'
      },
      {
        title: 'Timeline item 3 with link',
        url: 'https://www.google.com'
      },
      {
        title: 'Timeline item 4'
      },
      {
        title: 'Timeline item 5'
      }
    ]
  }
}

export const ProgressiveActive1: Story = {
  name: 'Progressive/Active/1',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>',
        current: true
      },
      {
        title: '2nd item',
        description: ''
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveActive2: Story = {
  name: 'Progressive/Active/2',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: '',
        current: true
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveActive3: Story = {
  name: 'Progressive/Active/3',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: ''
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g',
        current: true
      }
    ]
  }
}

export const ProgressiveImage1: Story = {
  name: 'Progressive/Image/1',
  args: {
    items: [
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>',
        current: true
      },
      {
        title: '2nd item',
        description: ''
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage2: Story = {
  name: 'Progressive/Image/2',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>',
        current: true
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: '2nd item'
      },
      {
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        current: false,
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage3: Story = {
  name: 'Progressive/Image/3',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>',
        current: true
      },
      {
        title: '2nd item'
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage4: Story = {
  name: 'Progressive/Image/4',
  args: {
    items: [
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: '',
        current: true
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage5: Story = {
  name: 'Progressive/Image/5',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        image: {
          src: svgPlaceholder({
            width: 80,
            height: 80,
            bgColor: 'rgb(0, 82, 194)',
            fgColor: '#fff'
          }),
          alt: 'Placeholder image'
        },
        title: '2nd item',
        current: true
      },
      {
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        current: false,
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage6: Story = {
  name: 'Progressive/Image/6',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        current: true
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage7: Story = {
  name: 'Progressive/Image/7',
  args: {
    items: [
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: ''
      },
      {
        image: null,
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g',
        current: true
      }
    ]
  }
}

export const ProgressiveImage8: Story = {
  name: 'Progressive/Image/8',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: '2nd item'
      },
      {
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        current: true,
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage9: Story = {
  name: 'Progressive/Image/9',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item'
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g',
        current: true
      }
    ]
  }
}

export const ProgressiveImage10: Story = {
  name: 'Progressive/Image/10',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: 'Third item',
        description: '<p>Some text</p>',
        current: true
      },
      {
        image: {
          src: svgPlaceholder({ width: 80, height: 80 }),
          alt: 'Placeholder image'
        },
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}

export const ProgressiveImage11: Story = {
  name: 'Progressive/Image/11',
  args: {
    items: [
      {
        title: 'First item',
        description: '<p>Text</p><p>Another line, why not</p>'
      },
      {
        title: '2nd item',
        description: '<p>Some text</p>'
      },
      {
        title: 'Third item',
        image: {
          src: svgPlaceholder({
            width: 80,
            height: 80,
            bgColor: 'rgb(0, 82, 194)',
            fgColor: '#fff'
          }),
          alt: 'Placeholder image'
        },
        description: '<p>Text</p><p>Another line, why not</p>',
        current: true
      },
      {
        title: 'The last item',
        description: '<p>Different <em>markup</em></p>',
        url: 'https://g'
      }
    ]
  }
}
