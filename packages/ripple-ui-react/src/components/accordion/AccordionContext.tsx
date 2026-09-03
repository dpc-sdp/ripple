import { createContext, useContext } from 'react'

type AccordionContextType = {
  parentId: string
  numbered?: boolean
  allItemIds: string[]
  expandedIds: Set<string>
  isExpanded: (id: string) => boolean
  toggleItem: (id: string) => void
  toggleAll: () => void
  registerItem?: (id: string, active?: boolean) => void
  unregisterItem?: (id: string) => void
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export function useAccordionContext(): AccordionContextType {
  const ctx = useContext(AccordionContext)
  if (!ctx)
    throw new Error('useAccordionContext must be used within RplAccordion')
  return ctx
}

export default AccordionContext
