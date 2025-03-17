import { computed, provide, inject, ref } from 'vue'

export default (addedContext?) => {
  const { context: parentContext, updateContext: updateParentContext } =
    inject<any>('rplEventContext', {})

  if (!addedContext) {
    return {
      context: parentContext,
      updateContext: updateParentContext
    }
  }

  const context = ref(addedContext || {})

  function updateContext(key, value) {
    if (typeof updateParentContext === 'function') {
      updateParentContext(key, value)
    }
    if (context.value?.hasOwnProperty(key)) {
      context.value = {
        ...context.value,
        [key]: value
      }
    }
  }

  const mergedContext = computed(() => {
    return {
      ...(parentContext?.value || {}),
      ...(context.value || {})
    }
  })

  provide('rplEventContext', {
    context: mergedContext,
    updateContext
  })

  return {
    context: mergedContext,
    updateContext
  }
}
