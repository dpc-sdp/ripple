import { TideAlert } from '../mapping/alerts/site-alerts-mapping'

const sortAlertsByPriority = (alerts: TideAlert[]): TideAlert[] => {
  const priorityMap = {
    information: 1,
    warning: 2,
    error: 3
  }

  return [...alerts].sort((a, b) => {
    const priorityA = priorityMap[a.variant] || 0
    const priorityB = priorityMap[b.variant] || 0

    return priorityB - priorityA
  })
}

export default sortAlertsByPriority
