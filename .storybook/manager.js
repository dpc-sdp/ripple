import { addons } from '@storybook/addons'
import { create } from '@storybook/theming'
import pkg from './../package.json'

export const rippleTheme = create({
  base: 'light',
  brandTitle: `Ripple Storybook ${pkg.version}`,
  brandUrl: 'https://www.ripple.sdp.vic.gov.au',
  brandImage: '/img/ripple-logo.svg'
})

addons.setConfig({
  theme: rippleTheme
})
