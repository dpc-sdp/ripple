export const extractAudiences = (audiences = []) => {
  if (audiences.length === 0) return ''

  const audienceStr = [...new Set(audiences)].map(input => {
    const term = typeof input === 'string' ? input : input.name
    if (term) {
      switch (term) {
        case 'Individual': return 'individuals'
        case 'Business': return 'businesses'
        default: return term.toLowerCase()
      }
    }
  }).join(', ')

  return `${audienceStr.charAt(0).toUpperCase() + audienceStr.slice(1)}`
}

export default {
  extractAudiences
}
