import { MaybeRef } from '@vueuse/shared'
import { ref, watchEffect } from 'vue'

export function useExpandable(_id: string, _isExpanded: MaybeRef<boolean>) {
  const id = ref(_id)
  const isExpanded = ref(_isExpanded)

  const toggleProps = ref(null)
  const triggerProps = ref(null)

  watchEffect(() => {
    toggleProps.value = {
      id: `${id.value}-toggle`,
      ariaControls: `${id.value}-content`,
      ariaExpanded: isExpanded,
    }

    triggerProps.value = {
      id: `accordion-${id.value}-content`,
      ariaLabelledby: `${id.value}-toggle`,
      // ariaHidden: isExpanded === false ? 'true' : null
    }
  })

  return { toggleProps, triggerProps }
}
