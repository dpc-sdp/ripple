export type RplAccordionItem = {
  id: string
  title?: string
  content: string
  active?: boolean
}

export interface RplAccordionProps {
  id: string
  items?: RplAccordionItem[]
  numbered?: boolean
  displayToggleAll?: boolean
}

export interface RplAccordionItemProps {
  item?: RplAccordionItem
  index?: number
  numbered?: boolean
  id?: string
  active?: boolean
}
