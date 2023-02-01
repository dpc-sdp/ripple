import pkg from './package.json'
export default defineAppConfig({
  title: 'Ripple',
  subheader: `Ripple is the design system for Victorian government digital products`,
  version: pkg.version,
  description:
    'Make your service consistent with vic.gov.au digital branding. Learn from the research and experience of other service teams and avoid repeating work that’s already been done.',
  socials: {
    github: 'dpc-sdp/ripple-framework'
  }
})
