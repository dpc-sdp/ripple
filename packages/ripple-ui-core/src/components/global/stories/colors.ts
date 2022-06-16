import get from 'lodash.get'
import rplColors from './../../../../tokens/settings/color.yaml'
import rplTheme from './../../../../tokens/settings/theme.yaml'

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
    const { comment } = category[key]
    let { value } = category[key]
    if (key === 'value') {
      value = category[key]
    }
    const obKey = comment || key
    const getVal = (v) => {
      if (typeof v === 'string') {
        if (v.charAt(0) === '{') {
          const valKey = v.replace('{', '').replace('}', '')
          let refVal = ''
          if (valKey.startsWith('theme')) {
            refVal = get(rplTheme, valKey)
          } else {
            refVal = get(rplColors, valKey).value
          }
          if (refVal.startsWith('#')) {
            return refVal
          } else {
            return getVal(refVal)
          }
        }
        return v
      }
    }
    return {
      ...acc,
      [obKey]: {
        var: `--rpl-clr-${type.replaceAll('.', '-')}${
          key !== '_' ? (key === 'value' ? '' : '-' + key) : ''
        }`,
        value: getVal(value)
      }
    }
  }, {})
}

export { rplTheme }
export default rplColors
