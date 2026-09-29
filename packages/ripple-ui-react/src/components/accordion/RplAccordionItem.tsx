import { useEffect, type ReactNode } from 'react'
import { useAccordionContext } from './AccordionContext'
import { type RplAccordionItem as RplAccordionItemProps } from '@dpc-sdp/ripple-ui-shared/contracts'
import RplContent from './../content/RplContent'

type Props = Partial<RplAccordionItemProps> & {
  id: string
  children?: ReactNode
}

export function RplAccordionItem({
  id,
  title,
  content,
  active,
  children
}: Props) {
  const ctx = useAccordionContext()
  const { parentId, registerItem, unregisterItem, isExpanded, toggleItem } = ctx

  useEffect(() => {
    registerItem?.(id, Boolean(active))
    return () => {
      unregisterItem?.(id)
    }
  }, [id, active, registerItem, unregisterItem])

  const expanded = isExpanded(id)
  const itemId = `accordion-${parentId}-${id}`
  const contentId = `${itemId}-content`

  return (
    <li
      className={`rpl-accordion__item ${expanded ? 'rpl-accordion__item--active' : ''}`}
    >
      <button
        type='button'
        className='rpl-accordion__item-toggle'
        aria-expanded={expanded}
        aria-controls={contentId}
        id={`${itemId}-toggle`}
        onClick={() => toggleItem(id)}
      >
        <span className='rpl-accordion__item-toggle-title rpl-type-h4'>
          {title}
        </span>
      </button>
      <div
        id={contentId}
        className='rpl-accordion__item-content'
        hidden={!expanded}
      >
        <div className='rpl-accordion__item-content-inner'>
          <RplContent>
            {children ?? (
              <div dangerouslySetInnerHTML={{ __html: content ?? '' }} />
            )}
          </RplContent>
        </div>
      </div>
    </li>
  )
}

export default RplAccordionItem
