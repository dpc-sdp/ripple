import { computed, provide, inject, ref } from 'vue'

/**
 * Allows a more convenient way of manage shared properties that need to be sent to analytics events.
 *
 * Usage:
 *
 * To create a new context, provide an object as an argument:
 * `useEventContext({ varA: 'apple', varB: 'banana' })`
 *
 * To use or update the context in a child component, call useEventContext without an argument:
 * `const { context, updateContext } = useEventContext()`
 * > context will equal { varA: 'apple', varB: 'banana' }
 * > to update varA: `updateContext('varA', 'new value')`
 *
 * You can create a new context in a child node further down component tree:
 * `useEventContext({ varA: 'child val A', varC: 'carrots' })`
 *
 * The child context will inherit all the properties from parent contexts,
 * but updating the child context will only update it's context and not the parent contexts.

 * `const { context, updateContext } = useEventContext()`
 * > context will equal { varA: 'child val A', varB: 'banana', varC: 'carrots' }
 * > to update varA: `updateContext('varA', 'new child value')`
 */
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

  function updateContext(key: string, value: string) {
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
