// TODO this should come with ripple-ui-core via nuxt plugin system
import SocialSharing from 'vue-social-sharing'

export const registerRplSocialSharingPlugin = (vueApp) => {
  vueApp.use(SocialSharing)
}
