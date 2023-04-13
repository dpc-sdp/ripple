import { computed } from 'vue'

export default (props: any, dpr = 1) => {
  // Breakpoints
  // TODO use tokens
  const bpMax = {
    xs: 768,
    s: 992,
    m: 1200
  }

  // Calculate aspect ratio from label
  // TODO use tokens / helper from ripple-ui-core
  const aspect = (label: string) => {
    switch (label) {
      case 'panorama':
        return 2
      case 'square':
        return 1
      case 'ultrawide':
        return 21 / 9
      case 'wide':
      default:
        return 16 / 9
    }
  }

  // Breakpoints in order of declaration
  const renderedIndex = Object.keys(props.rendered || {})

  // Calculate aspect from image dimensions, with fallback based on aspect label
  const calculatedAspect = (
    h: number | undefined,
    w: number | undefined,
    fallback: number
  ) => (w && h ? h / w : fallback)

  // If width is present use it, or calculate it from height and aspect
  const calculatedWidth = (r: any, aspect: number) =>
    Math.floor(r.width ? r.width : r.height * aspect)

  // Render srcset attribute
  const providerSrcSet = computed(() => {
    // Skip if no aspect/sizes
    if (!props.rendered && !props.aspect) {
      return null
    }

    const srcSet = Array<string>()
    for (const bp in props.rendered) {
      let w = 0

      // Only calculate if resize flag is not set
      if (props.rendered[bp].resize !== false) {
        if (props.rendered[bp].width) {
          w = Math.floor(dpr * props.rendered[bp].width)
        } else if (props.rendered[bp].height) {
          // Calculate width from height and aspect
          const h = Math.floor(dpr * props.rendered[bp].height)
          if ((props.width && props.height) || props.aspect[bp]) {
            w = Math.floor(
              h *
                calculatedAspect(
                  props.width,
                  props.height,
                  aspect(props.aspect[bp])
                )
            )
          }
        }
      }

      // 1201px is used as a default label for unresized images (bigger than the biggest breakpoint)
      srcSet.push(
        props.rendered[bp].resize === false && props.width
          ? `${props.src} 1201px`
          : `${props.src}?width=${w} ${calculatedWidth(
              props.rendered[bp],
              aspect(props.aspect[bp] || 'wide')
            )}w`
      )
    }
    return srcSet.join(', ')
  })

  // Render sizes attribute
  const providerSizes = computed(() => {
    // Skip if no aspect/sizes
    if (!props.rendered && !props.aspect) {
      return undefined
    }

    const sizes = Array<string>()
    const lastBp = renderedIndex[renderedIndex.length - 1]

    for (const bp in props.rendered) {
      // 1201px is used as a default label for unresized images (bigger than the biggest breakpoint)
      if (props.rendered[bp].resize === false && props.width) {
        sizes.push(`1201px`)
      } else {
        // Last breakpoint has no condition in render list
        if (bp === lastBp) {
          sizes.push(
            `${calculatedWidth(props.rendered[bp], aspect(props.aspect[bp]))}px`
          )
        } else {
          sizes.push(
            `(max-width: ${bpMax[bp]}px) ${calculatedWidth(
              props.rendered[bp],
              aspect(props.aspect[bp])
            )}px`
          )
        }
      }
    }
    return sizes.join(', ')
  })

  // Determine unresized width for img attribute from rendered prop
  const initialWidth = computed(() => {
    // First declared breakpoint won't always be right
    if (renderedIndex[0]) {
      if (props.rendered[renderedIndex[0]].width) {
        return props.rendered[renderedIndex[0]].width
      }
      if (props.rendered[renderedIndex[0]].height) {
        return Math.floor(
          props.rendered[renderedIndex[0]].height *
            calculatedAspect(
              props.width,
              props.height,
              aspect(renderedIndex[0])
            )
        )
      }
    }
    return props.width
  })

  // Determine unresized height for img attribute from rendered prop
  const initialHeight = computed(() => {
    // First declared breakpoint won't always be right
    if (renderedIndex[0]) {
      if (props.rendered[renderedIndex[0]].height) {
        return props.rendered[renderedIndex[0]].height
      }
      if (props.rendered[renderedIndex[0]].width) {
        return Math.floor(
          props.rendered[renderedIndex[0]].width /
            calculatedAspect(
              props.width,
              props.height,
              aspect(renderedIndex[0])
            )
        )
      }
    }
    return props.height
  })

  return { providerSrcSet, providerSizes, initialWidth, initialHeight }
}
