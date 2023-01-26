import pkg from './package.json'
export default defineAppConfig({
  title: 'Ripple',
  subheader: `Design your service using Ripple styles, components and patterns`,
  version: pkg.version,
  description:
    'Use this design system to make your service consistent with vic.gov.au digital branding. Learn from the research and experience of other service teams and avoid repeating work that’s already been done.',
  socials: {
    github: 'dpc-sdp/ripple-framework'
  }
})
