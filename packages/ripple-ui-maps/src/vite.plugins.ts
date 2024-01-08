/* eslint-disable @typescript-eslint/ban-ts-comment */
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
          name: 'removeStyleElement'
        },
        {
          name: 'removeAttributesBySelector',
          // @ts-ignore
          params: {
            selector: "[style='fill:#*']",
            attributes: 'style'
          }
        }
      ]
    }
  })
]
