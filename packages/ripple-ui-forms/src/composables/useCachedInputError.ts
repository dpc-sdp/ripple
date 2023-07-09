import { inject, ref, watch, Ref } from 'vue'

/**
 * The requirement for forms in Ripple is that validation messages only update after
 * each submit attempt. Unfortunately Formkit doesn't support this behaviour out of
 * the box, so we need to recreate it.
 *
 * This composable takes the field name and attempts to get the error for the field
 * from inputErrors, which is a map of errors that only updates on submit.
 *
 * We do this whenever the submit counter (increments every submit) updates, otherwise
 * the errors won't update when needed.
 */
export default function useCachedInputError(fieldName: string): Ref<string> {
  const inputErrors: Ref<Record<string, string>> = inject('inputErrors')
  const submitCounter: Ref<number> = inject('submitCounter')

  const error = ref(inputErrors.value[fieldName])

  watch(
    () => submitCounter.value,
    () => {
      error.value = inputErrors.value[fieldName]
    }
  )

  return error
}
