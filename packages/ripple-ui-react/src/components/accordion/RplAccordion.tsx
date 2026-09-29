import {
  Children,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type PropsWithChildren
} from 'react'
import AccordionContext from './AccordionContext'
import {
  type RplAccordionProps,
  type RplAccordionItem as SharedItem
} from '@dpc-sdp/ripple-ui-shared/contracts'
import RplAccordionItem from './RplAccordionItem'
import '@dpc-sdp/ripple-ui-styles/components/accordion/RplAccordion.css'

type RplAccordionComponentProps = PropsWithChildren<RplAccordionProps>
type ToggleAllState = 'open' | 'closed'
const EMPTY_ITEMS: SharedItem[] = []

function ToggleAllButton({
  toggleAllState,
  onToggleAll
}: {
  toggleAllState: ToggleAllState
  onToggleAll: () => void
}) {
  return (
    <div className='rpl-accordion__toggle-all-wrapper rpl-u-screen-only'>
      <button
        type='button'
        className='rpl-accordion__toggle-all rpl-u-focusable-inline'
        onClick={onToggleAll}
      >
        {toggleAllState === 'closed' ? 'Open' : 'Close'} all
      </button>
    </div>
  )
}

export function RplAccordion(props: RplAccordionComponentProps) {
  const {
    id,
    items = EMPTY_ITEMS,
    numbered = false,
    displayToggleAll = true,
    children
  } = props

  const propItemIds = useMemo(() => items.map((it) => it.id), [items])
  const [childItemIds, setChildItemIds] = useState<string[]>([])
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(items.filter((it) => it.active).map((it) => it.id))
  )

  const allItemIds = useMemo(() => {
    const ids = new Set<string>([...propItemIds, ...childItemIds])
    return Array.from(ids)
  }, [propItemIds, childItemIds])

  useEffect(() => {
    // sync active state for prop-backed items while preserving child item expansion state
    const propIds = new Set(items.map((it) => it.id))
    const activePropIds = new Set(
      items.filter((it) => it.active).map((it) => it.id)
    )

    setExpandedIds((prev) => {
      const next = new Set<string>()

      // Preserve existing child expansion state.
      prev.forEach((itemId) => {
        if (!propIds.has(itemId)) next.add(itemId)
      })

      // Apply active state from prop-backed items.
      activePropIds.forEach((itemId) => {
        next.add(itemId)
      })

      return next
    })
  }, [items])

  const registerItem = useCallback((itemId: string, active = false) => {
    setChildItemIds((prev) =>
      prev.includes(itemId) ? prev : [...prev, itemId]
    )
    if (active) setExpandedIds((prev) => new Set(prev).add(itemId))
  }, [])

  const unregisterItem = useCallback((itemId: string) => {
    setChildItemIds((prev) => prev.filter((id) => id !== itemId))
    setExpandedIds((prev) => {
      const copy = new Set(prev)
      copy.delete(itemId)
      return copy
    })
  }, [])

  const toggleItem = useCallback((itemId: string) => {
    setExpandedIds((prev) => {
      const copy = new Set(prev)
      if (copy.has(itemId)) copy.delete(itemId)
      else copy.add(itemId)
      return copy
    })
  }, [])

  const toggleAll = useCallback(() => {
    setExpandedIds((prev) => {
      if (prev.size === allItemIds.length) return new Set<string>()
      return new Set(allItemIds)
    })
  }, [allItemIds])

  const toggleAllState: ToggleAllState =
    expandedIds.size === allItemIds.length ? 'open' : 'closed'

  const contextValue = useMemo(
    () => ({
      parentId: id,
      numbered,
      allItemIds,
      expandedIds,
      isExpanded: (itemId: string) => expandedIds.has(itemId),
      toggleItem,
      toggleAll,
      registerItem,
      unregisterItem
    }),
    [
      id,
      numbered,
      allItemIds,
      expandedIds,
      toggleItem,
      toggleAll,
      registerItem,
      unregisterItem
    ]
  )
  if (items.length === 0 && Children.count(children) === 0) {
    return <p>No items</p>
  }
  return (
    <AccordionContext.Provider value={contextValue}>
      <div id={`accordion-${id}`} className='rpl-accordion'>
        {displayToggleAll && (
          <ToggleAllButton
            toggleAllState={toggleAllState}
            onToggleAll={toggleAll}
          />
        )}
        <ol className='rpl-accordion__items'>
          {items.map((it: SharedItem) => (
            <RplAccordionItem
              key={it.id}
              id={it.id}
              title={it.title}
              content={it.content}
            />
          ))}
          {children}
        </ol>
      </div>
    </AccordionContext.Provider>
  )
}

export default RplAccordion
