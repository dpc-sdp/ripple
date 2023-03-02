const themes = {
  'default': {
    "label": "vic.gov.au",
    "tokens": {}
  },
  "light": {
    "label": "Yellow + Pink (light)",
    "tokens": {
      "rpl-clr-primary": "#fdda24",
      "rpl-clr-primary-alt": "#fef0a7",
      "rpl-clr-primary-alpha": "rgb(253 218 36 / .5)",
      "rpl-clr-accent": "#ef4a81",
      "rpl-clr-accent-alt": "#fdedf2",
      "rpl-clr-link": "#be3c67",
      "rpl-clr-focus": "#1c3bdd",
      "rpl-clr-type-focus-contrast": "var(--rpl-clr-light)",
      "rpl-clr-gradient-vertical": "linear-gradient(90deg, #EF4A81 0%, #F592B3 40%, #FEE97C 65%, #FDDA24 80%)",
      "rpl-clr-gradient-horizontal": "linear-gradient(90deg, #EF4A81 0%, #F592B3 40%, #FEE97C 65%, #FDDA24 80%)",
      "rpl-clr-type-primary-contrast": "var(--rpl-clr-dark)",
      "rpl-clr-type-primary-contrast-alpha": "rgb(26 26 26 / 0.75)",
      "rpl-clr-type-accent-contrast": "var(--rpl-clr-dark)",
      "rpl-clr-type-focus-contrast": "var(--rpl-clr-light)",
      "rpl-clr-type-primary-accessible": "var(--rpl-clr-type-default)",
      "rpl-clr-type-primary-alt-accessible": "var(--rpl-clr-type-default)",
      'rpl-clr-footer-alt': 'var(--rpl-clr-primary)',
      'rpl-clr-footer': 'var(--rpl-clr-primary-alt)',
      'rpl-clr-type-footer-accessible': 'var(rpl-clr-type-primary-alt-accessible)',
      'rpl-clr-type-footer-contrast': 'var(--rpl-clr-type-primary-contrast)',
    }
  },
  "dark": {
    "label": "Purple + Mint (dark)",
    "tokens": {
      'rpl-clr-primary': '#6B19A3',
      'rpl-clr-primary-alt': '#3F006B',
      'rpl-clr-primary-alpha': 'rgba(107, 25, 163, 0.5)',
      'rpl-clr-type-primary-accessible': 'var(--rpl-clr-primary)',
      'rpl-clr-type-primary-alt-accessible': 'var(--rpl-clr-primary-alt)',
      'rpl-clr-accent': '#6DDD97',
      'rpl-clr-accent-alt': '#EAFAF0',
      'rpl-clr-link': '#6B19A3',
      'rpl-clr-focus': '#9DEF65',
      'rpl-clr-gradient-horizontal':
        'linear-gradient(90deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)',
      'rpl-clr-gradient-vertical':
        'linear-gradient(180deg, #382484 0%, #5A0099 20%, #7623B0 35%, #2E7478 50%, #2FA26F 70%, #2FCE6A 80%)',
      'rpl-clr-footer-alt': '#6B19A3',
      'rpl-clr-footer': '#3F006B'
    }
  }
}

export default themes
