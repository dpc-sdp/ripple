import { expect, describe, it } from 'vitest'
import { TideAlert } from './../mapping/site/alerts/site-alerts-mapping'
import sortAlertsByPriority from './sortAlertsByPriority.js'

describe('sortAlertsByPriority', () => {
  it('should sort alerts by their priority', () => {
    const alerts = [
      {
        alertId: 'ALERT_1',
        variant: 'warning',
        iconName: 'icon-information-circle-filled',
        message: 'Demo alert title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_2',
        variant: 'error',
        iconName: 'icon-exclamation-circle-filled',
        message: 'Emergency title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_3',
        variant: 'RANDOMVALUE',
        iconName: 'icon-information-circle-filled',
        message: 'Notification title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_4',
        variant: 'information',
        iconName: 'icon-traffic',
        message: 'Traffic title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },

      {
        alertId: 'ALERT_5',
        variant: 'error',
        iconName: 'icon-fire',
        message: 'Fire title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_6',
        variant: 'error',
        iconName: 'icon-medical',
        message: 'Medical title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      }
    ]

    const expected = [
      {
        alertId: 'ALERT_2',
        variant: 'error',
        iconName: 'icon-exclamation-circle-filled',
        message: 'Emergency title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_5',
        variant: 'error',
        iconName: 'icon-fire',
        message: 'Fire title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_6',
        variant: 'error',
        iconName: 'icon-medical',
        message: 'Medical title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_1',
        variant: 'warning',
        iconName: 'icon-information-circle-filled',
        message: 'Demo alert title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_4',
        variant: 'information',
        iconName: 'icon-traffic',
        message: 'Traffic title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      },
      {
        alertId: 'ALERT_3',
        variant: 'RANDOMVALUE',
        iconName: 'icon-information-circle-filled',
        message: 'Notification title',
        linkText: 'Test link',
        linkUrl: '/demo-link'
      }
    ]

    expect(sortAlertsByPriority(alerts as TideAlert[])).toEqual(expected)
  })
})
