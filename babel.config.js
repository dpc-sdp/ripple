module.exports = {
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
  ]
}
