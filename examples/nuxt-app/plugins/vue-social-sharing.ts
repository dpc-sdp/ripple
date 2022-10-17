// TODO this should come with ripple-ui-core via nuxt plugin system
import SocialSharing from 'vue-social-sharing'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SocialSharing)
})
