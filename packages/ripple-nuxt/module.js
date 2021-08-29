const appDir = require('app-root-path')

export default function rippleNuxt (moduleOptions) {
  const path = require('path')
  // transpile modules
  this.options.build.transpile.push(/@dpc-sdp\/ripple/)

  // // Load theme variables
  // const fs = require('fs')
  // const themePath = require.resolve(__dirname, `${appDir}/assets/_theme.scss`)
  // if (fs.existsSync(themePath) && !this.options.styleResources) {
  //   this.options.styleResources = {
  //     scss: [themePath]
  //   }
  // }
  this.addModule('@dpc-sdp/ripple-nuxt-ui', true)

  // Layouts
  this.addLayout(path.resolve(__dirname, './layouts/default.vue'), 'default')
}
