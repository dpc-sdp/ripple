import { useSlots } from 'vue'

function getSlotContent(content) {
  const children = content?.[0]?.children

  if (Array.isArray(children)) {
    return getSlotContent(children)
  } else if (typeof children === 'object' && children?.default) {
    const childSlot =
      typeof children.default === 'function'
        ? children.default()
        : children.default
    return getSlotContent(childSlot)
  }

  return children
}

export function useSlotContent(slot = 'default') {
  const slots = useSlots()

  if (!slots?.[slot]) {
    return null
  }

  return getSlotContent(slots[slot]())
}
