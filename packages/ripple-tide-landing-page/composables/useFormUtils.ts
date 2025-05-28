import { reactive } from 'vue'

export const useFormUtils = () => {
  const formUtils = reactive({
    fromLocalStorage: (key: string) => {
      if (import.meta.client && window && localStorage) {
        return localStorage.getItem(key)
      }
      return ''
    },
    fromUserCookie: (key: string) => {
      if (import.meta.client && typeof document !== 'undefined') {
        const match = document.cookie.match(
          new RegExp('(^| )' + key + '=([^;]+)')
        )
        if (match) return match[2]
      }
      return ''
    },
    currentDate: () =>
      import.meta.client ? new Date().toISOString().split('T')[0] : ''
  })

  return {
    formUtils
  }
}
