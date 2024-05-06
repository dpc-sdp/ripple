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
            overrides: {
              removeHiddenElems: false
            }
          }
        },
        {
          name: 'removeAttrs',
          params: {
            attrs: '(fill|stroke)'
          }
        },
        {
          name: 'removeStyleElement'
        },
        {
          name: 'removeAttributesBySelector',
          params: {
            selector: "[style='fill:#*']",
            attributes: 'style'
          }
        }
      ]
    }
  })
]
