import color from '../../packages/ripple-ui-core/src/tokens/settings/color.yaml'
import theme from '../../packages/ripple-ui-core/src/tokens/settings/theme.yaml'

interface RplColour {
  value: string
}

export function getColourName(name: string): string {
  return name.replace('clr', '').replaceAll(/[^a-zA-Z0-9]/g, ' ')
}

export function getColourToken(name: string): string {
  return `rpl.${name}`.replaceAll('._', '').replaceAll('.', '-')
}

export function getColourByPath(path: string): RplColour | null {
  let found = { ...theme, ...color }

  path.split('.').forEach((bit) => {
    found = found?.[bit]
  })

  return found as RplColour | null
}

export function getColourOptions(colour: string[]): object {
  return colour.reduce((acc, colour) => {
    let option = getColourByPath(colour)

    if (!option || !Object.keys(option).length) return acc

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

export function getColourValue(path: RplColour): string {
  const cleanPath = path.value.replace('{', '').replace('}', '')

  let colour: RplColour | string = getColourByPath(cleanPath)

  if (colour?.value && colour.value.includes('{')) {
    colour = getColourValue(colour) as string
  }

  return colour as string
}
