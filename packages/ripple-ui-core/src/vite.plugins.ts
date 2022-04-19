import svgLoader from 'vite-svg-loader'

export default [
  svgLoader({
    defaultImport: 'raw',
    svgoConfig: {
      multipass: true,
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {}
          }
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: "[style='fill:#*']",
            attributes: 'style'
          }
        },
        {
          name: 'removeStyleElement',
          active: true,
          params: {
            active: true
          }
        }
      ]
    }
  })
]
