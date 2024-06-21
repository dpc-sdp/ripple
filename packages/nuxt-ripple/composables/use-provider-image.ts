import { computed } from 'vue'

const screens: {
  [key: string]: number
} = {
  xs: 0,
  md: 992,
  lg: 1200
}

export default (props: any) => {
  const breakpoints = props.sizes
    ? props.sizes
        .split(' ')
        .map((size: string) => {
          const out: any = {},
            parts = { ...size.split(':') }
          out[parts[0]] = parts[1]
          return out
        })
        .reduce((a: any, b: any) => ({ ...a, ...b }))
    : {}

  const labels = Object.keys(breakpoints)

  const providerSizes = computed(() =>
    labels
      .map((bp: string) =>
        screens[bp]
          ? `(min-width: ${screens[bp]}px) ${breakpoints[bp]}`
          : `(min-width: 0) ${breakpoints[bp]}`
      )
      .join(', ')
  )

  const providerSrcSet = computed(() =>
    labels
      .map((bp: string) => {
        const unit = breakpoints[bp].substring(
          breakpoints[bp].length - 2,
          breakpoints[bp].length
        )
        let width = breakpoints[bp].replace(unit, '')
        if (unit === 'vw') {
          width = (width / 100) * props.width
        }
        return `${props.src}?width=${width} ${width}w, ${props.src}?width=${
          width * 2
        } ${width * 2}w`
      })
      .join(', ')
  )

  return {
    providerSrcSet,
    providerSizes
  }
}
