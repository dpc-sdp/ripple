import mitt from 'mitt'

export const rplEventBus = {
  ...mitt(),
  eventList: new Set<string>([]),
  register: (key: string) => {
    rplEventBus.eventList.add(key)
  },
  find: (key: string) => {
    if (rplEventBus.eventList.has(key)) {
      return Array.from(rplEventBus.eventList).find((k) => k === key)
    }
  },
  list: () => {
    return Array.from(rplEventBus.eventList)
  }
}

export default rplEventBus
