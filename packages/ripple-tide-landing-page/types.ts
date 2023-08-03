import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'
import { TideHeroHeader } from '@dpc-sdp/nuxt-ripple/types'
import { ITidePrimaryCampaign } from './mapping/primary-campaign/primary-campaign-mapping'
import { ITideSecondaryCampaign } from './mapping/secondary-campaign/secondary-campaign-mapping'

export interface TideLandingPagePage extends TidePageBase {
  showHeroAcknowledgement: boolean
  showInPageNav: boolean
  showHeroImageCaption: boolean
  showTopicTags: boolean
  inPageNavHeadingLevel: 'h2' | 'h3'
  background: string
  header: TideHeroHeader
  primaryCampaign: ITidePrimaryCampaign
  secondaryCampaign: ITideSecondaryCampaign
  /**
   * @description Dynamic components for the header section
   */
  headerComponents: TideDynamicPageComponent<any>[]
  /**
   * @description Dynamic components for the body section
   */
  bodyComponents: TideDynamicPageComponent<any>[]
  /**
   * @description Background body colour
   */
}
