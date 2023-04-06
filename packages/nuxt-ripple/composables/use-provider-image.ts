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

  const calculatedAspect = (h: number, w: number, aspect: number) =>
    w && h ? w / h : aspect

  const calculatedWidth = (r: any, aspect: number) =>
    Math.floor(r.width ? r.width : r.height * aspect)

  const isObject = (obj: any) => (obj ?? false)?.constructor?.name === 'Object'

  const providerSrcSet = computed(() => {
    if (!props.rendered && !props.aspect) {
      return null
    }

    let sizes = props.aspect
    if (!isObject(sizes)) {
      sizes = { xs: sizes }
    }

    const dpr = 1

    const srcSet = Array<string>()
    for (const bp in props.rendered) {
      let w = 0
      if (props.rendered[bp].width) {
        w = Math.floor(dpr * props.rendered[bp].width)
      } else if (props.rendered[bp].height) {
        const h = Math.floor(dpr * props.rendered[bp].height)
        if ((props.width && props.height) || sizes[bp]) {
          w = Math.floor(
            h * calculatedAspect(props.width, props.height, aspect(sizes[bp]))
          )
        }
      }
      srcSet.push(
        `${props.src}?width=${w} ${calculatedWidth(
          props.rendered[bp],
          aspect(sizes[bp] || 'wide')
        )}w`
      )
    }
    return srcSet.join(', ')
  })

  const providerSizes = computed(() => {
    if (!props.rendered && !props.aspect) {
      return undefined
    }

    const sizes = Array<string>()
    const renderedIndex = Object.keys(props.rendered || {})
    const lastBp = renderedIndex[renderedIndex.length - 1]

    for (const bp in props.rendered) {
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
    return sizes.join(', ')
  })

  return { providerSrcSet, providerSizes }
}
