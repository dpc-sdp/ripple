import rplSpacing from './../../../../tokens/settings/spacing.yaml'

/* Typography */
const base = 'rpl-type'
export const RplTypeStyles = [
  {
    title: 'H1 / Highlight',
    class: `${base}-h1-highlight`
  },
  {
    title: 'H1 / Heading',
    class: `${base}-h1`
  },
  {
    title: 'H2 / Heading',
    class: `${base}-h2`
  },
  {
    title: 'H3 / Heading',
    class: `${base}-h3`
  },
  {
    title: 'H4 / Heading',
    class: `${base}-h4`
  },
  {
    title: 'Paragraph / Large',
    class: `${base}-body-large`
  },
  {
    title: 'Paragraph / Default',
    class: `${base}-body`
  },
  {
    title: 'Paragraph / Default / Link',
    class: `${base}-body-link`
  },
  {
    title: 'Paragraph / Default / Bold',
    class: `${base}-body-bold`
  },
  {
    title: 'Paragraph / Ordered List',
    class: `${base}-body-ol`
  },
  {
    title: 'Paragraph / Unordered List',
    class: `${base}-body-ul`
  },
  {
    title: 'Component / Large / Bold',
    class: `${base}-component-large-bold`
  },
  {
    title: 'Component / Default',
    class: `${base}-component`
  },
  {
    title: 'Component / Default / Bold',
    class: `${base}-component-bold`
  },
  {
    title: 'Component / Bold / Link',
    class: `${base}-component-bold-link`
  },
  {
    title: 'Component / Small',
    class: `${base}-component-small`
  },
  {
    title: 'Component / Caps',
    class: `${base}-component-caps`
  },
  {
    title: 'Component / Caps / Bold',
    class: `${base}-component-caps-bold`
  }
] as const

/* Padding */
const RplPaddingUtilities = []

for (let i = 1; i <= 14; i++) {
  RplPaddingUtilities.push(
    {
      title: `Padding - All sides - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-padding-${i}`,
    },
    {
      title: `Padding - Top - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-padding-t-${i}`
    },
    {
      title: `Padding - Right - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-padding-r-${i}`
    },
    {
      title: `Padding - Bottom - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-padding-b-${i}`
    },
    {
      title: `Padding - Left - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-padding-l-${i}`
    }
  )
}

export { RplPaddingUtilities }

/* Margin */
const RplMarginUtilities = []

for (let i = 1; i <= 14; i++) {
  RplMarginUtilities.push(
    {
      title: `Margin - All sides - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-margin-${i}`
    },
    {
      title: `Margin - Top - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-margin-t-${i}`
    },
    {
      title: `Margin - Right - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-margin-r-${i}`
    },
    {
      title: `Margin - Bottom - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-margin-b-${i}`
    },
    {
      title: `Margin - Left - ${rplSpacing.space[i].value}px`,
      color: `${rplSpacing.space[i].color}`,
      class: `rpl-u-margin-l-${i}`
    }
  )
}

export { RplMarginUtilities }

/* Size */
const RplSizeUtilities = []

for (let i = 1; i <= 14; i++) {
  RplSizeUtilities.push(
    {
      color: `${rplSpacing.space[i].color}`,
      value: `${rplSpacing.space[i].value}`,
      class: `rpl-u-size-${i}`
    }
  )
}

export { RplSizeUtilities }
