import { ref } from 'vue'
import type { Ref } from 'vue'

export function useExpandableState(initialActiveItems: number[], itemsLength: number) {
  const activeItems: Ref<number[]> = ref(initialActiveItems)

  function isItemExpanded(index: number) {
    return activeItems.value.includes(index)
  }

  function isAllExpanded() {
    return activeItems.value.length === itemsLength
  }

  function toggleItem(itemIndex: number) {
    const activeItemIndex = activeItems.value.indexOf(itemIndex)

    // Item needs to made active
    if (activeItemIndex === -1) {
      activeItems.value.push(itemIndex)
    }

    // Item needs to be made inactive
    else {
      activeItems.value.splice(activeItemIndex, 1)
    }
  }

  function toggleAll() {
    // Make all items active
    if (!isAllExpanded()) {
      activeItems.value = Array(itemsLength).fill(0).map((x, i) => i)
    }

    // Make all items inactive
    else {
      activeItems.value = []
    }
  }

  return { isItemExpanded, isAllExpanded, toggleItem, toggleAll }
}
