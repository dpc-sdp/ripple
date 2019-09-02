// This custom component load config is for user want to add a custom component in the dynamic component mapping.
//
// An example:
// You added a custom component named `YourCustomComponent.vue` in nuxt 'components/' dir.
// And you added the custom map config in `tide.config.js` because it will be dynamically mapped and added into landing page.
// Then you need to add load config like below.
//
// export default {
//   'your-custom-component': () => import(/* webackChunkName: 'your-custom-component' */ '~/components/YourCustomComponent')
// }

export default {
  'example-message': () => import(/* webackChunkName: 'example-message' */ './components/Message')
}
