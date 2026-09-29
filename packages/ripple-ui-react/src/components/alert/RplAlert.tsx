import {
  type RplAlertProps,
  rplAlertDefaults
} from '@dpc-sdp/ripple-ui-shared/contracts'
import clsx from 'clsx'
import '@dpc-sdp/ripple-ui-styles/components/alert/RplAlert.css'
import { RplIcon } from '../icon'

interface RplAlertComponentProps extends RplAlertProps {
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const RplAlert = (props: RplAlertComponentProps) => {
  const {
    linkText,
    linkUrl,
    variant,
    dismissed,
    alertId,
    message,
    iconName,
    isDismissible,
    onClose: onCloseCallback
  } = {
    ...rplAlertDefaults,
    ...props
  }

  const classNames = clsx({
    'rpl-alert': true,
    [`rpl-alert--${variant}`]: variant,
    'rpl-alert--closed': dismissed,
    'rpl-u-screen-only': true
  })

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (onCloseCallback) {
      onCloseCallback(e)
    }
  }

  return (
    <div className={classNames}>
      {!dismissed && (
        <div
          className='rpl-alert__inner'
          role='region'
          aria-labelledby={`alert-message-${alertId}`}
        >
          <RplIcon
            className='rpl-alert__icon-info'
            size='m'
            name={iconName}
            colour='white'
            title='Alert icon'
          />
          <div className='rpl-alert__message-wrap'>
            <div
              id={`alert-message-${alertId}`}
              className='rpl-alert__message rpl-type-label rpl-type-weight-bold'
            >
              {message}
            </div>
            <a
              className='rpl-alert__link rpl-type-p rpl-u-focusable--alt-colour'
              href={linkUrl}
            >
              {linkText}
              <RplIcon
                name='icon-arrow-right'
                colour='white'
                title='Go to link'
              />
            </a>
          </div>
          {isDismissible && (
            <button
              className='rpl-alert__btn-close rpl-u-focusable-inline rpl-u-focusable--alt-colour'
              onClick={onClose}
              aria-label='Dismiss alert'
            >
              <RplIcon
                title='Dismiss alert'
                name='icon-cancel'
                colour='white'
              />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
