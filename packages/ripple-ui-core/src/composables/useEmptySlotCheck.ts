import { computed, Comment, Fragment, Text, ComputedRef, VNode } from 'vue'

/**
 * Originally copied from this github comment https://github.com/vuejs/core/issues/4733#issuecomment-1537108585
 */

/**
 * Determines whether a slot is empty for Vue 3: https://github.com/vuejs/vue-next/issues/3056
 */
// Adapted from https://github.com/vuejs/vue-next/blob/ca17162e377e0a0bf3fae9d92d0fdcb32084a9fe/packages/runtime-core/src/helpers/renderSlot.ts#L77
function vNodeIsEmpty(vnodes): boolean {
  return vnodes.every((node) => {
    if (node.type === Comment) return true
    if (node.type === Text && !node.children.trim()) return true
    if (node.type === Fragment && vNodeIsEmpty(node.children)) {
      return true
    }

    return false
  })
}

/**
 * Returns true if a slot has no content
 */
export const isEmpty = (slot: () => VNode[]): boolean => {
  if (!slot) return true

  return vNodeIsEmpty(slot())
}

export default (slot: () => VNode[]): ComputedRef<boolean> => {
  const slotIsEmpty = computed(() => isEmpty(slot))

  return slotIsEmpty
}
