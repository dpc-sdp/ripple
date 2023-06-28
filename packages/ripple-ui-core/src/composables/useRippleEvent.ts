import { inject } from 'vue'
import rplEventBus from './../lib/eventbus'

export type rplEventPayload = {
  id: string
  action?: string
  name?: string
  label?: string
  value?: any
  contextId?: string
  contextName?: string
  [key: string]: unknown
}

export type rplEventOptions = {
  global?: boolean
}

export function useRippleEvent(namespace: string, emit?: any) {
  const $rplEvent: typeof rplEventBus | undefined = inject('$rplEvent')

  const emitRplEvent = (
    event: string,
    payload: rplEventPayload,
    options: rplEventOptions = {}
  ) => {
    if (emit) {
      emit(event, payload)
    }

    if (options?.global) {
      $rplEvent?.emit(`${namespace}/${event}`, payload)
    }
  }

  return { emitRplEvent }
}
