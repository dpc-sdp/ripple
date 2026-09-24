import mitt, { type Emitter } from 'mitt'

type Events = {
  'rpl:toggle': { id: string; open: boolean }
}

const isBrowser = typeof window !== 'undefined'

export const rplEventBus = isBrowser
  ? mitt<Events>()
  : ({
      on: () => () => {},
      off: () => {},
      emit: () => {}
    } as unknown as Emitter<Events>)
