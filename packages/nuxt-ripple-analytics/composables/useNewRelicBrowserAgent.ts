import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'

export default () => {
  const config = useRuntimeConfig()
  const browserAgentConfig = config?.public?.newRelic?.browser

  if (!browserAgentConfig.enabled) {
    return
  }

  const featureFlags: IRplFeatureFlags = inject('featureFlags', {
    newRelicBrowserBeacon: 'bam.nr-data.net',
    newRelicBrowserJSErrorsEnabled: true,
    newRelicBrowserCookiesEnabled: false,
    newRelicBrowserDistributedTracingEnabled: false,
    newRelicBrowserAjaxDenyList: ['bam.nr-data.net']
  })

  // Scripts from new relic need to be dynamically imported, otherwise they will throw an error
  const initBrowserAgent = async () => {
    // Error module has to be manually added when using new relic via npm
    const { JSErrors } = await import(
      '@newrelic/browser-agent/features/jserrors'
    )

    const options = {
      info: {
        beacon: featureFlags.newRelicBrowserBeacon,
        licenseKey: browserAgentConfig.licenseKey,
        applicationID: browserAgentConfig.applicationID,
        sa: 1 // 'sa' stands for 'standalone' https://github.com/newrelic/newrelic-browser-agent/blob/bbf414c0d6a483141f32e2dd31b1f8a23ad1dda5/src/features/logging/aggregate/index.js#L100
      },
      init: {
        distributed_tracing: {
          enabled: featureFlags.newRelicBrowserDistributedTracingEnabled
        },
        privacy: {
          cookies_enabled: featureFlags.newRelicBrowserCookiesEnabled
        },
        jserrors: { enabled: featureFlags.newRelicBrowserJSErrorsEnabled },
        ajax: { deny_list: featureFlags.newRelicBrowserAjaxDenyList }
      },
      loader_config: {
        accountID: browserAgentConfig.accountID,
        trustKey: browserAgentConfig.trustKey,
        agentID: browserAgentConfig.agentID,
        licenseKey: browserAgentConfig.licenseKey,
        applicationID: browserAgentConfig.applicationID
      },
      features: [JSErrors]
    }

    const { BrowserAgent } = await import(
      '@newrelic/browser-agent/loaders/browser-agent'
    )

    new BrowserAgent(options)
  }

  if (process.client) {
    initBrowserAgent()
  }
}
