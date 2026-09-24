export const rplSearchBarVariants = ['default', 'reverse', 'menu'] as const
export type RplSearchBarVariant = (typeof rplSearchBarVariants)[number]

export interface RplSearchBarProps {
  variant?: RplSearchBarVariant
  id: string
  autoFocus?: boolean
  inputLabel?: string
  inputValue?: string | Record<string, unknown>
  submitLabel?: string
  suggestions?: unknown[]
  maxSuggestionsDisplayed?: number
  placeholder?: string
  globalEvents?: boolean
  showNoResults?: boolean
  getSuggestionVal?: (item: unknown) => unknown
  getOptionLabel?: (option: unknown) => unknown
  getOptionId?: (option: unknown) => unknown
  isOptionSelectable?: (option: unknown) => boolean
  showLabel?: boolean
  isFreeText?: boolean
  iconPosition?: 'left' | 'right' | 'none'
  showClearButton?: boolean
  showSubmitButton?: boolean
  submitOnClear?: boolean
  submitOnSuggestionOnly?: boolean
  analyticsName?: string
}
