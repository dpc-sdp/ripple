import spriteMarkup from '@dpc-sdp/ripple-ui-shared/assets/icons/sprite.svg?raw'
import '@dpc-sdp/ripple-ui-styles/components/icon/RplIcon.css'

interface RplIconSpriteProps {
  hidden?: boolean
  customSprite?: string
}

const getSpriteMarkup = (value: unknown): string => {
  console.log(value)
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value === 'object' && 'default' in value) {
    const defaultExport = (value as { default?: unknown }).default
    return typeof defaultExport === 'string' ? defaultExport : ''
  }

  return ''
}

export const RplIconSprite = ({
  hidden = true,
  customSprite
}: RplIconSpriteProps) => {
  const className = hidden ? 'rpl-svg-sprite--hidden' : undefined
  const markup = customSprite ?? getSpriteMarkup(spriteMarkup)

  return (
    <div
      aria-hidden={hidden}
      className={className}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  )
}
