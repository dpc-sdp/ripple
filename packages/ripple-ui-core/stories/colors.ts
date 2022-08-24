import { get } from 'lodash-es'
import rplColors from './../tokens/settings/color.yaml'
import theme from './../tokens/settings/theme.yaml'
export const tokens = { ...theme, ...rplColors }

const getVal = (v: string) => {
  if (typeof v === 'string') {
    if (v.charAt(0) === '{') {
      const valKey = v.replace('{', '').replace('}', '')
      const refVal = get(tokens, valKey)
      if (refVal.hasOwnProperty('value')) {
        return getVal(refVal.value)
      }
      return getVal(refVal)
    }
    return v
  }
}

const getVarName = (path: string[] | string) => {
  const prefix = `--rpl-`
  const normaliseArr = (val) => {
    if (Array.isArray(val)) return val
    if (typeof path === 'string') {
      return path.split('.')
    }
    return []
  }
  return `${prefix}${normaliseArr(path)
    .filter((i) => i !== '_')
    .join('-')}`
}

export const getColorSwatchCollection = (cat) => {
  const category = get(tokens, cat)
  if (!category) return null
  return Object.keys(category)
    .filter((key) => key !== 'value')
    .map((key) => {
      return getColorSwatch(`${cat}.${key}`)
    })
}

export const getColorSwatches = (path: string[] | string) => {
  if (typeof path === 'string') {
    return [getColorSwatch(path)]
  } else if (Array.isArray(path)) {
    return path.map((p) => getColorSwatch(p))
  }
}

export const getColorSwatch = (path: string) => {
  const match = get(tokens, path)
  if (!match) return null
  const value = getVal(match.value)
  return {
    ...match,
    var: getVarName(path),
    value
  }
}

export default rplColors
