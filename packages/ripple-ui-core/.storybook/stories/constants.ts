import rplSpacing from './../../tokens/settings/spacing.yaml'

/* Typography */
const base = 'rpl-type'
export const RplTypeStyles = [
  /* Headings */
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
    title: 'H3 / Highlight',
    class: `${base}-h3-highlight`
  },
  {
    title: 'H3 / Heading',
    class: `${base}-h3`
  },
  {
    title: 'H4 / Heading',
    class: `${base}-h4`
  },

  /* Paragraphs */
  {
    title: 'Paragraph / Large',
    class: `${base}-p-large`
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

/* Icon and Text */
export const RplIconAndTextPositions = ['left', 'right'] as const
export const RplIconAndTextSamples = `
<div class="rpl-icon-and-text rpl-icon-and-text--default rpl-icon-and-text--reverse rpl-type-p">
  <span class="rpl-icon-and-text__label rpl-type-weight-bold">Default</span>
  <span class="rpl-icon-and-text__icon">
    <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-star">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
        <path d="m23.4 12.5-4.1-3.8 1.1-6.4c.1-.7-.2-1.5-.8-1.9-.6-.4-1.4-.5-2.1-.1L12 3.1 6.5.2C5.8-.1 5-.1 4.4.4c-.6.4-.9 1.2-.8 1.9l1 6.4-4.1 3.8c-.5.5-.7 1.3-.5 2 .2.7.9 1.2 1.6 1.3l5.8 1.4 2.8 5.6c.3.7 1 1.1 1.8 1.1s1.4-.4 1.8-1.1l2.8-5.6 5.8-1.4c.7-.1 1.4-.6 1.6-1.3.1-.7-.1-1.5-.6-2z"></path>
        <path d="M0 0h24v24H0z" style="fill: none"></path>
      </svg>
    </span>
  </span>
</div>
<div class="rpl-icon-and-text rpl-icon-and-text--link rpl-icon-and-text--reverse rpl-type-p">
  <span class="rpl-icon-and-text__label rpl-type-weight-bold">Link</span>
  <span class="rpl-icon-and-text__icon">
    <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-star">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
        <path d="m23.4 12.5-4.1-3.8 1.1-6.4c.1-.7-.2-1.5-.8-1.9-.6-.4-1.4-.5-2.1-.1L12 3.1 6.5.2C5.8-.1 5-.1 4.4.4c-.6.4-.9 1.2-.8 1.9l1 6.4-4.1 3.8c-.5.5-.7 1.3-.5 2 .2.7.9 1.2 1.6 1.3l5.8 1.4 2.8 5.6c.3.7 1 1.1 1.8 1.1s1.4-.4 1.8-1.1l2.8-5.6 5.8-1.4c.7-.1 1.4-.6 1.6-1.3.1-.7-.1-1.5-.6-2z"></path>
        <path d="M0 0h24v24H0z" style="fill: none"></path>
      </svg>
    </span>
  </span>
</div>
<div class="rpl-icon-and-text rpl-icon-and-text--white rpl-icon-and-text--reverse rpl-type-p" style="background:#0052C2">
  <span class="rpl-icon-and-text__label rpl-type-weight-bold">White</span>
  <span class="rpl-icon-and-text__icon">
    <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-star">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
        <path d="m23.4 12.5-4.1-3.8 1.1-6.4c.1-.7-.2-1.5-.8-1.9-.6-.4-1.4-.5-2.1-.1L12 3.1 6.5.2C5.8-.1 5-.1 4.4.4c-.6.4-.9 1.2-.8 1.9l1 6.4-4.1 3.8c-.5.5-.7 1.3-.5 2 .2.7.9 1.2 1.6 1.3l5.8 1.4 2.8 5.6c.3.7 1 1.1 1.8 1.1s1.4-.4 1.8-1.1l2.8-5.6 5.8-1.4c.7-.1 1.4-.6 1.6-1.3.1-.7-.1-1.5-.6-2z"></path>
        <path d="M0 0h24v24H0z" style="fill: none"></path>
      </svg>
    </span>
  </span>
</div>
<div class="rpl-icon-and-text rpl-icon-and-text--text rpl-icon-and-text--reverse rpl-type-p">
  <span class="rpl-icon-and-text__label rpl-type-weight-bold">Text</span>
  <span class="rpl-icon-and-text__icon">
    <span class="rpl-icon rpl-icon--size-s rpl-icon--icon-star">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
        <path d="m23.4 12.5-4.1-3.8 1.1-6.4c.1-.7-.2-1.5-.8-1.9-.6-.4-1.4-.5-2.1-.1L12 3.1 6.5.2C5.8-.1 5-.1 4.4.4c-.6.4-.9 1.2-.8 1.9l1 6.4-4.1 3.8c-.5.5-.7 1.3-.5 2 .2.7.9 1.2 1.6 1.3l5.8 1.4 2.8 5.6c.3.7 1 1.1 1.8 1.1s1.4-.4 1.8-1.1l2.8-5.6 5.8-1.4c.7-.1 1.4-.6 1.6-1.3.1-.7-.1-1.5-.6-2z"></path>
        <path d="M0 0h24v24H0z" style="fill: none"></path>
      </svg>
    </span>
  </span>
</div>
` as const
