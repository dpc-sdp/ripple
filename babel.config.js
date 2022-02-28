module.exports = process.env.CYPRESS_ENV ? {} : {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'transform-vue-jsx',
    '@babel/plugin-transform-runtime'
  ],
  env: {
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
      plugins: ['require-context-hook', 'dynamic-import-node']
    }
  }
}
