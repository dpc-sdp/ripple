export const alertVariants = ['information', 'warning', 'error'] as const
export type AlertVariant = (typeof alertVariants)[number]

export interface RplAlertProps {
  variant?: AlertVariant
  iconName?: string
  message?: string
  linkText?: string
  linkUrl?: string
  dismissed?: boolean
  alertId: string
  isDismissible?: boolean
}

export const rplAlertDefaults: Required<
  Pick<
    RplAlertProps,
    | 'variant'
    | 'iconName'
    | 'message'
    | 'linkText'
    | 'linkUrl'
    | 'dismissed'
    | 'isDismissible'
  >
> = {
  variant: 'information',
  iconName: 'icon-information-circle-filled',
  message: '',
  linkText: '',
  linkUrl: '',
  dismissed: false,
  isDismissible: true
}
