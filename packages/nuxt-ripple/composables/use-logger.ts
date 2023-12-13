export const useLogger = (id?: number) => {
  const { $logger } = useNuxtApp()
  const noop = () => {}

  if (process.server) {
    return $logger
  }

  return {
    debug: noop,
    info: noop,
    warning: noop,
    error: noop
  }
}

export default useLogger
