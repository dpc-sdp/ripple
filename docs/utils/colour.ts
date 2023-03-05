import color from '../../packages/ripple-ui-core/tokens/settings/color.yaml'
import theme from '../../packages/ripple-ui-core/tokens/settings/theme.yaml'

interface RplColour {
  value: string
}

export function getColourName(name: string): string {
  return name.replace('clr', '').replaceAll(/[^a-zA-Z0-9]/g, ' ')
}

export function getColourToken(name: string): string {
  return `rpl.${name}`.replaceAll('._', '').replaceAll('.', '-')
}

export function getColourByPath(path: string): RplColour | {} {
  let found = { ...theme, ...color }

  path.split('.').forEach((bit) => {
    found = found?.[bit]
  })

  return found || {}
}

export function getColourOptions(colour: string[]): object {
  return colour.reduce((acc, colour) => {
    let option = getColourByPath(colour)

    if (!Object.keys(option).length) return acc

    if (option?.value) {
      return { ...acc, [colour]: option }
    }

    option = getColourByPath(colour)

    return Object.assign(
      acc,
      ...Object.keys(option).map((key) => ({
        [`${colour}.${key}`]: option[key]
      }))
    )
  }, {})
}

export function getColourValue(path: RplColour): object {
  const cleanPath = path.value.replace('{', '').replace('}', '')

  let colour = getColourByPath(cleanPath)

  if (colour?.value && colour.value.includes('{')) {
    colour = getColourValue(colour)
  }

  return colour
}
