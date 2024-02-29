import { useAppConfig } from '#imports'
import { defu as defuMerge } from 'defu'
import { set } from 'lodash-es'

// Feature flags will be available on component instances with inject('featureFlags') - See https://vuejs.org/guide/components/provide-inject.html#inject
// Site flags provided by drupal will override the app config flags
// If a flag is nested in the app config i.e. { "display": "labels": false } it should use dot notation in drupal i.e. "display.labels": false
export default (flags = {}) => {
  const siteFlags = Object.entries(flags || {}).reduce(
    (o, [key, value]) => set(o, key, value),
    {}
  )

  const configFlags = useAppConfig()?.ripple?.featureFlags

  const featureFlags = ref(defuMerge(siteFlags, configFlags || {}))

  provide('featureFlags', featureFlags.value)

  return featureFlags
}
