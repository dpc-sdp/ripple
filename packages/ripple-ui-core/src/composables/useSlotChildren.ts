import { useSlots } from 'vue'

export function useSlotChildren() {
  const slots = useSlots()

  return slots?.default?.()?.[0]?.children || slots?.default?.() || []
}
