import { inject } from 'vue'
import rplEventBus from './../lib/eventbus'

export type rplEventPayload = {
  id?: string
  action?: string
  text?: string
  label?: string
  value?: any
  index?: number
  type?: string
  section?: string
  theme?: string[]
  options?: string | string[]
  elementType?: string
  contextId?: string
  contextName?: string
  [key: string]: unknown
}

export type rplEventOptions = {
  global?: boolean
}

export function useRippleEvent(namespace: string, emit?: any) {
  const $rplEvent: typeof rplEventBus | undefined = inject('$rplEvent')
  const eventContext: rplEventPayload = inject('eventContext', {})

  const emitRplEvent = (
    event: string,
    payload: rplEventPayload = {},
    options: rplEventOptions = {}
  ) => {
    if (eventContext) {
      payload = { ...eventContext, ...payload }
    }
    if (emit) {
      emit(event, payload)
    }
    if (options?.global) {
      $rplEvent?.emit(`${namespace}/${event}`, payload)
    }
  }

  const withOptions = (props: any, using: string[]) => {
    return Object.keys(props).filter((key) => using.includes(key) && props[key])
  }

  return { emitRplEvent, withOptions }
}
