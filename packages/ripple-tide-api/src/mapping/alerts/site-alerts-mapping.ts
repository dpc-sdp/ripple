import { TideApiResponse } from '../../../types'
import { getLinkFromField } from '../../utils/mapping-utils.js'

export interface TideAlert {
  alertId: string
  variant: 'information' | 'warning' | 'error'
  iconName: string
  message: string
  linkText: string
  linkUrl: string
}

const getIconForType = (type: string): string => {
  const iconMap = {
    Emergency: 'icon-exclamation-circle-filled',
    Fire: 'icon-fire',
    Flood: 'icon-flood',
    Medical: 'icon-medical',
    Lightning: 'icon-lightning',
    Pollution: 'icon-smoke',
    'Heat wave': 'icon-temperature',
    Traffic: 'icon-traffic'
  }

  const icon = iconMap[type]

  return icon ? icon : 'icon-information-circle-filled'
}

const getAlertVariantForType = (
  type: string
): 'information' | 'warning' | 'error' => {
  const alertVariantMap = {
    Emergency: 'error',
    Fire: 'error',
    Flood: 'error',
    Medical: 'error',
    Lightning: 'warning',
    Pollution: 'warning',
    'Heat wave': 'warning',
    Traffic: 'information'
  }

  const alertVariant = alertVariantMap[type]

  return alertVariant ? alertVariant : 'information'
}

export const map = (src: TideApiResponse): TideAlert[] => {
  return (src.site_alerts || []).map((rawAlert): TideAlert => {
    const alertType = rawAlert.field_alert_type.name
    const link = getLinkFromField(rawAlert, 'field_call_to_action')

    return {
      alertId: rawAlert.id,
      variant: getAlertVariantForType(alertType),
      iconName: getIconForType(alertType),
      message: rawAlert.title || '',
      linkText: link?.text || '',
      linkUrl: link?.url || ''
    }
  })
}

export const includes = ['site_alerts', 'site_alerts.field_alert_type']
