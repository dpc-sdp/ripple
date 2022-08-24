import rplSpacing from './../tokens/settings/spacing.yaml'

/* Typography */
const base = 'rpl-type'
export const RplTypeStyles = [
  /* Headings */
  {
    title: 'H1 / Highlight',
    class: `${base}-h1-highlight`
  },
  {
    title: 'H1 / Highlight / Fixed',
    class: `${base}-h1-highlight-fixed`
  },
  {
    title: 'H1 / Heading',
    class: `${base}-h1`
  },
  {
    title: 'H1 / Heading / Fixed',
    class: `${base}-h1-fixed`
  },
  {
    title: 'H2 / Heading',
    class: `${base}-h2`
  },
  {
    title: 'H2 / Heading / Fixed',
    class: `${base}-h2-fixed`
  },
  {
    title: 'H3 / Highlight',
    class: `${base}-h3-highlight`
  },
  {
    title: 'H3 / Highlight / Fixed',
    class: `${base}-h3-highlight-fixed`
  },
  {
    title: 'H3 / Heading',
    class: `${base}-h3`
  },
  {
    title: 'H3 / Heading / Fixed',
    class: `${base}-h3-fixed`
  },
  {
    title: 'H4 / Heading',
    class: `${base}-h4`
  },
  {
    title: 'H4 / Heading / Fixed',
    class: `${base}-h4-fixed`
  },

  /* Paragraphs */
  {
    title: 'Paragraph / Large',
    class: `${base}-p-large`
  },
  {
    title: 'Paragraph / Large / Fixed',
    class: `${base}-p-large-fixed`
  },
  {
    title: 'Paragraph / Large / Bold',
    class: `${base}-p-large  ${base}-weight-bold`
  },
  {
    title: 'Paragraph / Default',
    class: `${base}-p`
  },
  {
    title: 'Paragraph / Default / Bold',
    class: `${base}-p  ${base}-weight-bold`
  },
  {
    title: 'Paragraph / Small',
    class: `${base}-p-small`
  },
  {
    title: 'Paragraph / Small / Bold',
    class: `${base}-p-small  ${base}-weight-bold`
  },

  /* Lists */
  {
    title: 'Ordered List',
    class: `${base}-list-ol`
  },
  {
    title: 'Unordered List',
    class: `${base}-list-ul`
  },

  /* Labels */
  {
    title: 'Label / Large',
    class: `${base}-label-large`
  },
  {
    title: 'Label / Default',
    class: `${base}-label`
  },
  {
    title: 'Label / Default / Bold',
    class: `${base}-label  ${base}-weight-bold`
  },
  {
    title: 'Label / Small',
    class: `${base}-label-small`
  },
  {
    title: 'Label / Small / Bold',
    class: `${base}-label-small  ${base}-weight-bold`
  }
] as const

/* Padding */
const RplPaddingUtilities = []

for (let i = 1; i <= 14; i++) {
  RplPaddingUtilities.push(
    {
      title: `Padding - All sides - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-padding-${i}`
    },
    {
      title: `Padding - Top - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-padding-t-${i}`
    },
    {
      title: `Padding - Right - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-padding-r-${i}`
    },
    {
      title: `Padding - Bottom - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-padding-b-${i}`
    },
    {
      title: `Padding - Left - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
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
      title: `Margin - All sides - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-margin-${i}`
    },
    {
      title: `Margin - Top - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-margin-t-${i}`
    },
    {
      title: `Margin - Right - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-margin-r-${i}`
    },
    {
      title: `Margin - Bottom - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-margin-b-${i}`
    },
    {
      title: `Margin - Left - ${rplSpacing.sp[i].value}px`,
      color: `${rplSpacing.sp[i].color}`,
      class: `rpl-u-margin-l-${i}`
    }
  )
}

export { RplMarginUtilities }

/* Size */
const RplSizeUtilities = []

for (let i = 1; i <= 14; i++) {
  RplSizeUtilities.push({
    color: `${rplSpacing.sp[i].color}`,
    value: `${rplSpacing.sp[i].value}`,
    class: `rpl-u-size-${i}`
  })
}

export { RplSizeUtilities }
