import get from 'lodash.get'
import rplColors from './../../../../tokens/settings/color.yaml'

export const getColorSwatches = (tokens, type) => {
  if (!tokens || !tokens.hasOwnProperty('clr')) return null
  const category = tokens.clr[type]
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
        var: `--rpl-clr-${type}-${key}`,
        value: getVal(value)
      }
    }
  }, {})
}

export default rplColors
