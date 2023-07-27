/**
 * @description Format grant audience string
 */
const formatGrantAudiences = (audiences = []) => {
  if (!audiences || audiences.length === 0) return ''

  const audienceStr = [...new Set(audiences)]
    .map((input: any) => {
      const term = input.name ? input.name : input
      if (term) {
        switch (term) {
          case 'Individual':
            return 'individuals'
          case 'Business':
            return 'businesses'
          default:
            return term.toLowerCase()
        }
      }
    })
    .join(', ')
  return `${audienceStr.charAt(0).toUpperCase() + audienceStr.slice(1)}`
}

export default formatGrantAudiences
