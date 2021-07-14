import { mount } from '@vue/test-utils'
import CardKeydates from '../CardKeydates'

describe('CardKeydates', () => {
  /*
   * Checks if it is rendering one keydate from keydates.
   * Check the number of characters to see if it is printing everything.
   */
  it('Renders when there is one keydate, unchanged.', () => {
    const wrapper = mount(CardKeydates, {
      propsData: {
        title: 'Key calendar dates',
        keydates: [
          {
            date: '3 April',
            title: '2019 Premiers Sustainability Awards.',
            description: '33 finalists have been announced across 11 categories in the 2019 Premiers Sustainability Awards from a record number of entries. Winners will be announced at the awards ceremony 10 October.'
          }
        ],
        link: {
          text: 'Read more',
          url: 'http://www.google.com'
        }
      },
      mocks: {
        rplOptions: {
          hostname: 'localhost'
        }
      }
    })
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(wrapper.find('.rpl-card-keydates__keydate-date').text()).toHaveLength(7)
    expect(wrapper.find('.rpl-card-keydates__keydate-title').text()).toHaveLength(36)
    expect(wrapper.find('.rpl-card-keydates__keydate-description').text()).toHaveLength(190)
  })

  /*
   * Checks if it is rendering two keydates from keydates.
   * Check the number of classes it is printing.
   */
  it('Renders two keydates.', () => {
    const wrapper = mount(CardKeydates, {
      propsData: {
        title: 'Key calendar dates',
        keydates: [
          {
            date: '3 April',
            title: 'Term two starts',
            description: 'Its back to the classroom as school start term two on the 16th April.'
          },
          {
            date: '23 April',
            title: 'ANZAC Day',
            description: 'National day of remembrance to commemorate the ANZACs.'
          }
        ],
        link: {
          text: 'Read more',
          url: 'http://www.google.com'
        }
      },
      mocks: {
        rplOptions: {
          hostname: 'localhost'
        }
      }
    })
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(wrapper.findAll('.rpl-card-keydates__keydate')).toHaveLength(2)
    expect(wrapper.findAll('.rpl-card-keydates__keydate-date')).toHaveLength(2)
    expect(wrapper.findAll('.rpl-card-keydates__keydate-title')).toHaveLength(2)
    expect(wrapper.findAll('.rpl-card-keydates__keydate-description')).toHaveLength(2)
  })

  /*
   * Checks if it is rendering truncated title & description.
   * Description truncated at 120 char plus '...' equal 123 char.
   * If description more than 80 char then title truncated at 40 char plus '...' equal 43.
   */
  it('Renders truncated title & description.', () => {
    const wrapper = mount(CardKeydates, {
      propsData: {
        title: 'Key calendar dates',
        keydates: [
          {
            date: '3 April',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat'
          },
          {
            date: '23 April',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat'
          }
        ],
        link: {
          text: 'Read more',
          url: 'http://www.google.com'
        }
      },
      mocks: {
        rplOptions: {
          hostname: 'localhost'
        }
      }
    })
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(wrapper.find('.rpl-card-keydates__keydate-title').text()).toHaveLength(43)
    expect(wrapper.find('.rpl-card-keydates__keydate-description').text()).toHaveLength(123)
  })

  /*
   * Checks if it is rendering truncated title.
   * Description does not get truncated.
   * If description less than 80 char then title truncated at 80 char plus '...' equal 83.
   */
  it('Renders truncated title.', () => {
    const wrapper = mount(CardKeydates, {
      propsData: {
        title: 'Key calendar dates',
        keydates: [
          {
            date: '3 April',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'
          },
          {
            date: '23 April',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'
          }
        ],
        link: {
          text: 'Read more',
          url: 'http://www.google.com'
        }
      },
      mocks: {
        rplOptions: {
          hostname: 'localhost'
        }
      }
    })
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(wrapper.find('.rpl-card-keydates__keydate-title').text()).toHaveLength(83)
    expect(wrapper.find('.rpl-card-keydates__keydate-description').text()).toHaveLength(76)
  })
})
