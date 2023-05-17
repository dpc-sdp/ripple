export default defineAppConfig({
  ripple: {
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
    theme: {
      'rpl-clr-primary': '#6B19A3',
      'rpl-clr-primary-alt': '#3F006B',
      'rpl-clr-primary-alpha': 'rgba(107, 25, 163, 0.5)',
      'rpl-clr-accent': '#6DDD97',
      'rpl-clr-accent-alt': '#EAFAF0',
      'rpl-clr-link': '#6B19A3',
      'rpl-clr-focus': '#9DEF65',
      'rpl-clr-gradient-horizontal':
        'linear-gradient(90deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)',
      'rpl-clr-gradient-vertical':
        'linear-gradient(180deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)',
      'rpl-clr-type-primary-accessible': 'var(--rpl-clr-primary)',
      'rpl-clr-type-primary-alt-accessible': 'var(--rpl-clr-primary-alt)',
      'rpl-clr-footer-alt': 'var(--rpl-clr-primary)',
      'rpl-clr-footer': 'var(--rpl-clr-primary-alt)',
      'rpl-clr-type-footer-accessible':
        'var(--rpl-clr-type-primary-alt-accessible)'

      // The following should also be included when their parent values are changed

      // 'rpl-clr-type-light': 'var(--rpl-clr-light)',
      // 'rpl-clr-type-default': 'var(--rpl-clr-dark)',
      // 'rpl-clr-type-focus-contrast': 'var(--rpl-clr-dark)',
      // 'rpl-clr-type-accent-contrast': 'var(--rpl-clr-light)',
      // 'rpl-clr-type-primary-contrast': 'var(--rpl-clr-light)',
      // 'rpl-clr-type-footer-contrast': 'var(--rpl-clr-type-primary-contrast)'
    }
  }
})
