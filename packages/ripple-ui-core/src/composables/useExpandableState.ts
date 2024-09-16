import { ref, type Ref } from 'vue'

export function useExpandableState(
  initialActiveItems: string[],
  itemsLength: number,
  sharedActiveItems?: Ref<string[]>
) {
  const activeItems: Ref<string[]> =
    sharedActiveItems || ref(initialActiveItems)

  function isItemExpanded(id: string) {
    return activeItems.value.includes(id)
  }

  function isAllExpanded() {
    return activeItems.value.length === itemsLength
  }

  function toggleItem(id: string) {
    // Item needs to be made active
    if (isItemExpanded(id) == false) {
      activeItems.value.push(id)
    }

    // // Item needs to be made inactive
    else {
      activeItems.value = activeItems.value.filter((item) => item != id)
    }
  }

  return { isItemExpanded, isAllExpanded, toggleItem }
}
