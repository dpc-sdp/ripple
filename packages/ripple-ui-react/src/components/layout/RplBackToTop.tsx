'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { RplIcon } from '../icon'
import '@dpc-sdp/ripple-ui-styles/components/button/RplButton.css'

export interface RplBackToTopProps {
  topElementId: string
  label?: string
}

const SCROLL_THRESHOLD = 1080

export function RplBackToTop({
  topElementId,
  label = 'Back to top'
}: RplBackToTopProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isShown, setIsShown] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const updateState = () => {
      const containerTop =
        containerRef.current?.getBoundingClientRect().top ?? 0

      setIsShown(window.scrollY > SCROLL_THRESHOLD)
      setIsSticky(containerTop > window.innerHeight)
    }

    updateState()

    window.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)

    return () => {
      window.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [])

  const className = clsx({
    'rpl-back-to-top': true,
    'rpl-back-to-top--visible': isShown,
    'rpl-back-to-top--sticky': isSticky,
    'rpl-u-screen-only': true
  })

  return (
    <div ref={containerRef} className={className}>
      <div className='rpl-back-to-top__inner rpl-container'>
        <a
          className='rpl-button rpl-button--elevated rpl-button--default rpl-u-focusable-block rpl-back-to-top__button'
          href={`#${topElementId}`}
        >
          <span className='rpl-button__label rpl-type-label rpl-type-weight-bold'>
            {label}
            <RplIcon name='icon-arrow-up' colour='white' title={label} />
          </span>
        </a>
      </div>
    </div>
  )
}
