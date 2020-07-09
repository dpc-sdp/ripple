// As some component can not be used in server side rendering, we export them here.
// Provide a plugin which others can use it in Nuxt as no ssr mode.
// Usage in Nuxt: https://nuxtjs.org/guide/plugins/#client-side-only

import Vue from 'vue'
import RplImageGalleryModal from './ImageGalleryModal.vue'
import RplFullscreenImage from './FullscreenImage.vue'
import RplImageGallery from './ImageGallery.vue'
import RplComplexImage from './ComplexImage.vue'
const RplImageGalleryEventBus = new Vue()

export { RplImageGalleryEventBus }
export { RplImageGalleryModal }
export { RplFullscreenImage }
export { RplImageGallery }
export { RplComplexImage }
