import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import VueInfoAddon from 'storybook-addon-vue-info'

import {
  withKnobs,
  text,
  object
} from '@storybook/addon-knobs/vue'

import RplContact from './index.vue'
import readme from './README.md'

storiesOf('Molecules/Contact', module)
  .addDecorator(VueInfoAddon)
  .addDecorator(withKnobs)
  .add('Contact', withReadme(readme, () => ({
    components: { RplContact },
    template: `<rpl-contact
  :title="title"
  :name="name"
  :department="department"
  :postal="postal"
  :address="address"
  :phone="phone"
  :email="email"
  :social="social"
/>`,
    data () {
      return {
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
        social: object('Social', [{
          icon: 'facebook',
          title: 'Name of Facebook Page',
          url: 'https://www.facebook.com'
        }])
      }
    }
  })))
