import { computed } from 'vue'

export default (props: any) => {
  const bpMax = {
    xs: 768,
    s: 992,
    m: 1200
  }

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

  const calculatedAspect = (
    h: number | undefined,
    w: number | undefined,
    fallback: number
  ) => (w && h ? h / w : fallback)

  const calculatedWidth = (r: any, aspect: number) =>
    Math.floor(r.width ? r.width : r.height * aspect)

  const providerSrcSet = computed(() => {
    if (
      (!props.rendered && !props.aspect) ||
      Object.keys(props.aspect).length < 2
    ) {
      return null
    }

    const dpr = 1

    const srcSet = Array<string>()
    for (const bp in props.rendered) {
      let w = 0
      if (props.rendered[bp].resize !== false) {
        if (props.rendered[bp].width) {
          w = Math.floor(dpr * props.rendered[bp].width)
        } else if (props.rendered[bp].height) {
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

  const providerSizes = computed(() => {
    if (
      (!props.rendered && !props.aspect) ||
      Object.keys(props.aspect).length < 2
    ) {
      return undefined
    }

    const sizes = Array<string>()
    const renderedIndex = Object.keys(props.rendered || {})
    const lastBp = renderedIndex[renderedIndex.length - 1]

    for (const bp in props.rendered) {
      if (bp === lastBp) {
        sizes.push(
          props.rendered[bp].resize === false && props.width
            ? `1201px`
            : `${calculatedWidth(
                props.rendered[bp],
                aspect(props.aspect[bp])
              )}px`
        )
      } else {
        sizes.push(
          props.rendered[bp].resize === false && props.width
            ? `1201px`
            : `(max-width: ${bpMax[bp]}px) ${calculatedWidth(
                props.rendered[bp],
                aspect(props.aspect[bp])
              )}px`
        )
      }
    }
    return sizes.join(', ')
  })

  return { providerSrcSet, providerSizes }
}
