// .storybook/YourTheme.js
import pkg from './../package.json'
import { create } from '@storybook/theming'

export default create({
  base: 'light',
  brandTitle: `Ripple Storybook ${pkg.version}`,
  brandUrl: 'https://www.ripple.sdp.vic.gov.au',
  brandImage: '/img/ripple-logo.svg'
})
