import { storiesOf } from '@storybook/vue'
import RplContact from './index.vue'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

storiesOf('Molecules/Contact', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplContact },
    template: `
      <rpl-contact
        :title="title"
        :name="name"
        :department="department"
        :postal="postal"
        :address="address"
        :phone="phone"
        :email="email"
        :social="social"
      />
    `,
    props: {
      title: {
        default: text('Title', 'Need additional help?')
      },
      name: {
        default: text('Name', 'First Last Name (Job Title)')
      },
      department: {
        default: text('Department', 'Department name')
      },
      postal: {
        default: text('Postal', 'PO Box 123, Suburb VIC 3421')
      },
      address: {
        default: text('Address', '13 Street Name, Suburb VIC 3056')
      },
      phone: {
        default: () => object('Phone', [
          { number: '03 9876 6754' },
          { number: '0400 000 000', title: 'Mob' }
        ])
      },
      email: {
        default: text('Email', 'emailaddress@vic.gov.au')
      },
      social: {
        default: () => object('Social', [
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
      }
    }
  }))
