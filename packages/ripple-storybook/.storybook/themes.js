const themes = {
  'default': {
    "label": "vic.gov.au",
    "tokens": {}
  },
  "light": {
    "label": "Light on dark",
    "tokens": {
      "rpl-clr-primary": "#fdda24",
      "rpl-clr-primary-alt": "#fef0a7",
      "rpl-clr-primary-alpha": "rgb(253 218 36 / .5)",
      "rpl-clr-accent": "#ef4a81",
      "rpl-clr-accent-alt": "#fdedf2",
      "rpl-clr-link": "#be3c67",
      "rpl-clr-focus": "#1c3bdd",
      "rpl-clr-type-focus-contrast": "var(--rpl-clr-light)",
      "rpl-clr-gradient-vertical": "linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent) 100%)",
      "rpl-clr-gradient-horizontal": "linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent) 100%)",
      "rpl-clr-type-primary-contrast": "var(--rpl-clr-dark)",
      "rpl-clr-type-primary-contrast-alpha": "rgb(26 26 26 / 0.75)",
      "rpl-clr-type-accent-contrast": "var(--rpl-clr-dark)",
      "rpl-clr-type-primary-accessible": "var(--rpl-clr-type-default)",
      "rpl-clr-type-primary-alt-accessible": "var(--rpl-clr-type-default)"
    }
  },
  "dark": {
    "label": "Premier",
    "tokens": {
      "rpl-clr-primary": "#af272e",
      "rpl-clr-primary-alt": "#BC2931",
      "rpl-clr-primary-alpha": "rgb(155 19 26 / .5)",
      "rpl-clr-type-primary-contrast": "#ffffff",
      "rpl-clr-type-primary-accessible": "var(--rpl-clr-primary)",
      "rpl-clr-accent": "#d04950",
      "rpl-clr-accent-alt": "#ffe6e7",
      "rpl-clr-link": "#be3c67",
      "rpl-clr-focus": "#1c3bdd",
      "rpl-clr-type-focus-contrast": "var(--rpl-clr-light)",
      "rpl-clr-gradient-vertical": "linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent-alt) 100%)",
      "rpl-clr-gradient-horizontal": "linear-gradient(90deg, var(--rpl-clr-accent) 0%, var(--rpl-clr-accent-alt) 100%)",
      "rpl-clr-type-accent-contrast": "var(--rpl-clr-dark)",
      "rpl-clr-type-primary-alt-accessible": "var(--rpl-clr-type-default)"
    }
  }
}

export default themes
