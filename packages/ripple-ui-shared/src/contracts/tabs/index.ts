export const rplTabsModes = ['horizontal', 'vertical'] as const
export type RplTabsMode = (typeof rplTabsModes)[number]

export interface IRplTab {
  title: string
  key: string
  icon?: string
}

export interface RplTabsProps {
  tabs: IRplTab[]
  activeTab?: string
  mode?: RplTabsMode
}
