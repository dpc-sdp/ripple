import type { ElementType, PropsWithChildren } from 'react'
import {
  rplButtonDefaults,
  type RplButtonProps
} from '@dpc-sdp/ripple-ui-shared/contracts'
import '@dpc-sdp/ripple-ui-styles/components/button/RplButton.css'

type RplButtonComponentProps = PropsWithChildren<RplButtonProps>

export const RplButton = (props: RplButtonComponentProps) => {
  const mergedProps: Required<
    Pick<RplButtonProps, 'el' | 'url' | 'variant' | 'disabled'>
  > &
    Pick<RplButtonProps, 'label'> & {
      children?: RplButtonComponentProps['children']
    } = {
    ...rplButtonDefaults,
    ...props
  }
  const { el, url, variant, label, disabled, children } = mergedProps

  const Tag: ElementType = el === 'a' ? 'a' : 'button'
  const className = `rpl-button rpl-button--${variant} rpl-button--default rpl-u-focusable-block`

  return (
    <Tag
      href={el === 'a' ? url : undefined}
      type={el === 'button' ? 'button' : undefined}
      className={className}
      disabled={disabled || undefined}
    >
      <span className='rpl-button__label rpl-type-label rpl-type-weight-bold'>
        {label}
        {children}
      </span>
    </Tag>
  )
}

export type { RplButtonProps }
