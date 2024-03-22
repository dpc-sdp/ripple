export const getLocationTextFromResult = (result: Record<string, any>) => {
  if (!result) {
    return ''
  }

  if (result.address) {
    return result.address
  }

  if (result.lga) {
    return result.lga
  }

  return result.feature_type
}

export const shouldShowFundingDisclaimer = (result: Record<string, any>) => {
  return result?.investment && result.investment.endsWith('*')
}

export const getBudgetMapPinColour = (result: Record<string, any>) => {
  const colours = {
    Education: '#C63663',
    'Sports and recreation': '#FF9E1B',
    Justice: '#CB003B',
    'Emergency services': '#00818B',
    'Public transport': '#9F0025',
    Health: '#007B4B',
    'Mental health': '#500778',
    'Public housing': '#006E91',
    'Clean energy': '#003866',
    'Strong communities': '#87179D',
    'Environment and parkland': '#C94000',
    'Regional investment': '#53565A',
    Roads: '#3B5E0F'
  }

  return colours[result.theme] || '#000'
}
