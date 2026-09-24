export const buttonVariants = [
  'filled',
  'outlined',
  'white',
  'transparent',
  'elevated',
  'destructive',
  'none'
] as const
export type ButtonVariant = (typeof buttonVariants)[number]

export const buttonElements = ['button', 'a'] as const
export type ButtonElement = (typeof buttonElements)[number]

export interface RplButtonProps {
  el?: ButtonElement
  url?: string
  variant?: ButtonVariant
  label?: string
  disabled?: boolean
}

export const rplButtonDefaults: Required<
  Pick<RplButtonProps, 'el' | 'url' | 'variant' | 'disabled'>
> = {
  el: 'button',
  url: '',
  variant: 'filled',
  disabled: false
}
