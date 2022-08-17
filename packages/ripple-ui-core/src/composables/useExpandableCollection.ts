import { ref, unref } from 'vue'
import type { Ref } from 'vue'
import { animateOpening, animateClosing } from './useAnimateHeight'

export function useExpandableCollection() {
  const items: Ref<object[]> = ref([])
  const activeItems: Ref<number[]> = ref([])
  const contentEls: Ref<object[]> = ref([])

  function setItems(toAdd) {
    items.value = unref(toAdd)
  }

  function setContentEls(toAdd) {
    contentEls.value = unref(toAdd)
  }

  function isItemExpanded(index) {
    return activeItems.value.includes(index)
  }

  function isAllExpanded() {
    return activeItems.value.length === items.value.length
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
      items.value.forEach((item, index) => {
        if (!isItemExpanded(index)) {
          toggleItem(index)
        }
      })
    }

    // Make all items inactive
    else {
      items.value.forEach((item, index) => {
        if (isItemExpanded(index)) {
          toggleItem(index)
        }
      })
    }
  }

  return { items, setItems, setContentEls, isItemExpanded, isAllExpanded, toggleItem, toggleAll }
}
