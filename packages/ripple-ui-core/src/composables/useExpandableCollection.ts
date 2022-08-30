import { ref } from 'vue'
import type { Ref } from 'vue'
import { animateOpening, animateClosing } from './useAnimateHeight'

export function useExpandableCollection(items, contentEls) {
  const activeItems: Ref<number[]> = ref([])

  function isItemExpanded(index) {
    return activeItems.value.includes(index)
  }

  function isAllExpanded() {
    return activeItems.value.length === items.length
  }

  function toggleItem(itemIndex) {
    const activeItemIndex = activeItems.value.indexOf(itemIndex)

    // Item needs to made active
    if (activeItemIndex === -1) {
      activeItems.value.push(itemIndex)
      animateOpening(contentEls.value[itemIndex])
    }

    // Item needs to be made inactive
    else {
      activeItems.value.splice(activeItemIndex, 1)
      animateClosing(contentEls.value[itemIndex])
    }
  }

  function toggleAll() {
    // Make all items active
    if (!isAllExpanded()) {
      items.forEach((item, index) => {
        if (!isItemExpanded(index)) {
          toggleItem(index)
        }
      })
    }

    // Make all items inactive
    else {
      items.forEach((item, index) => {
        if (isItemExpanded(index)) {
          toggleItem(index)
        }
      })
    }
  }

  return { isItemExpanded, isAllExpanded, toggleItem, toggleAll }
}
