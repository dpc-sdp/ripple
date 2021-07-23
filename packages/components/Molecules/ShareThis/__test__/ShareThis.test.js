import { shallowMount } from '@vue/test-utils'
import ShareThis from '../index'

describe('ShareThis', () => {
  it('assigns default networks to props accordingly', () => {
    const defaultNetworks = [
      {
        name: 'twitter',
        label: 'Twitter',
        iconName: 'twitter',
        iconSize: '0.81'
      },
      {
        name: 'facebook',
        label: 'Facebook',
        iconName: 'facebook',
        iconSize: '1'
      },
      {
        name: 'linkedin',
        label: 'LinkedIn',
        iconName: 'linkedin',
        iconSize: '0.81'
      }
    ]
    const wrapper = shallowMount(ShareThis, {
      propsData: {
        title: 'Share this',
        url: '/share-this-page'
      }
    })

    expect(wrapper.vm.en.networks).toEqual(defaultNetworks)
  })

  it('assigns default aria label to props accordingly', () => {
    const wrapper = shallowMount(ShareThis, {
      propsData: {
        title: 'Share this',
        url: '/share-this-page'
      }
    })

    expect(wrapper.vm.en.label).toEqual('Social networks')
  })

  it('does not enable email if subject and body are not provided', () => {
    const wrapper = shallowMount(ShareThis, {
      propsData: {
        title: 'Share this',
        url: '/share-this-page'
      }
    })

    expect(wrapper.vm.en.emailEnabled).toEqual(false)
  })

  it('concatenates the correct email url', () => {
    const wrapper = shallowMount(ShareThis, {
      stubs: ['SocialSharing', 'rpl-link'],
      propsData: {
        title: 'Share this page',
        url: '/share-this-page',
        emailSubject: 'Email subject example',
        emailBody: 'I thought you might like this page.'
      }
    })

    expect(wrapper.vm.en.emailEnabled).toEqual(true)
    expect(wrapper.vm.en.emailUrl).toEqual('mailto:?subject=Email subject example&body=I thought you might like this page.%0D%0A %0D%0A/share-this-page')
  })
})
