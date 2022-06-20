import { get } from 'lodash-es'
import rplColors from './../../tokens/settings/color.yaml'

export const getColorSwatchesCollection = (tokens, types = []) => {
  const all = {}
  types.map((type) => {
    all[type] = getColorSwatches(tokens, type).value
  })
  return all
}

export const getColorSwatches = (tokens, type) => {
  if (!tokens || !tokens.hasOwnProperty('clr')) return null
  const category = get(tokens.clr, type)
  return Object.keys(category).reduce((acc, key) => {
    const { comment, value } = category[key]
    const obKey = comment || key
    const getVal = (v) => {
      if (typeof v === 'string') {
        if (v.charAt(0) === '{') {
          const valKey = v.replace('{', '').replace('}', '')
          const refVal = get(rplColors, valKey)
          return refVal.value
        }
        return v
      }
    }
    return {
      ...acc,
      [obKey]: {
        ...category[key],
        var: `--rpl-clr-${type.replaceAll('.', '-')}${
          key !== '_' ? '-' + key : ''
        }`,
        value: getVal(value)
      }
    }
  }, {})
}

export default rplColors
