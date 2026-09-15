import { lazy, Suspense, useMemo, type ReactNode } from 'react'
import clsx from 'clsx'
import {
  type RplIconProps as RplIconBaseProps,
  RplCoreIconNameSet
} from '@dpc-sdp/ripple-ui-shared/contracts'
import customIconImports from './generated'
import '@dpc-sdp/ripple-ui-styles/components/icon/RplIcon.css'

interface RplIconProps extends RplIconBaseProps {
  className?: string
  children?: ReactNode
}

export const RplIcon = ({
  name,
  colour,
  size = 's',
  padded = false,
  title,
  className,
  children
}: RplIconProps) => {
  const iconRegistry = customIconImports

  const inSprite = name ? RplCoreIconNameSet.has(name) : false

  const AsyncIcon = useMemo(() => {
    if (!name || inSprite) {
      return null
    }

    const loader = iconRegistry[name]

    if (!loader) {
      return null
    }
    return lazy(loader)
  }, [iconRegistry, inSprite, name])

  const classes = clsx(
    'rpl-icon',
    `rpl-icon--size-${size}`,
    name && `rpl-icon--${name}`,
    colour && `rpl-icon--colour-${colour}`,
    padded && 'rpl-icon--padded',
    className
  )

  if (!name) {
    return <span className={classes}>{children}</span>
  }

  if (AsyncIcon) {
    return (
      <span className={classes}>
        <Suspense fallback={null}>
          <AsyncIcon
            role={title ? 'img' : 'presentation'}
            aria-hidden={title ? undefined : true}
            aria-label={title || undefined}
          />
        </Suspense>
      </span>
    )
  }

  return (
    <span className={classes}>
      <svg
        role={title ? 'img' : 'presentation'}
        aria-hidden={title ? undefined : true}
      >
        {title ? <title>{title}</title> : null}
        <use href={`#${name}`} />
      </svg>
    </span>
  )
}

export type { RplIconProps }
