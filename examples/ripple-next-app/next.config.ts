import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {},
  webpack(config) {
    const rules = config.module.rules
    console.dir(rules, { depth: 10 })
    // Find Next's existing asset rule
    const assetRule = rules.find(
      (rule: any) =>
        rule?.test?.test?.('.svg') && rule?.type === 'asset/resource'
    )

    if (assetRule) {
      assetRule.exclude = /\.svg$/i
    }

    // Add raw SVG handling
    rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/,
      type: 'asset/source'
    })

    return config
  }
}

export default nextConfig
