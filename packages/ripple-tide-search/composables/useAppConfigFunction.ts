

export default  (
  fnName: string, configBucket: string
) => {
  const appConfig = useAppConfig()
  const fn = appConfig?.ripple?.search?.[configBucket]?.[fnName]

  if (typeof fn !== 'function') {
    throw new Error(
      `Search listing: No matching function called "${fnName}" in config bucket "${configBucket}"`
    )
  }

  return fn
}
