import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/styles.css' // vue3-openlayers version < 1.0.0-*

export default function registerRplMapsPlugin(vueApp, config) {
  vueApp.use(OpenLayersMap, {
    debug: true,
    ...config
  })
}
