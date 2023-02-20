import pkg from './package.json'
export default defineAppConfig({
  title: 'Ripple Design System',
  subheader: `Ripple is the design system for Victorian government digital products`,
  sections: {
    'design-system': {
      title: 'Ripple Design System',
      color: 'var(--rpl-clr-primary)'
    },
    framework: {
      title: 'Ripple Module Ecosystem',
      color: 'var(--rpl-clr-dark)'
    }
  },
  version: pkg.version,
  description:
    'Make your service consistent with vic.gov.au digital branding. Learn from the research and experience of other service teams and avoid repeating work that’s already been done.',
  socials: {
    github: 'dpc-sdp/ripple-framework'
  },
  storybookBaseUrl: 'https://develop--624ac117357335003a84dac3.chromatic.com'
})
