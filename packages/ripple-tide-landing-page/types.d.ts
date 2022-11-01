import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'
import { ITideHeroHeader } from './src/mapping/hero-header/hero-header-mapping'
import { ITidePrimaryCampaign } from './src/mapping/primary-campaign/primary-campaign-mapping'
import { ITideSecondaryCampaign } from './src/mapping/secondary-campaign/secondary-campaign-mapping'

export default interface TideLandingPagePage extends TidePageBase {
  background: string
  heroHeader: ITideHeroHeader
  primaryCampaign: ITidePrimaryCampaign
  secondaryCampaign: ITideSecondaryCampaign
  /**
   * @description Dynamic components for the header section
   */
  headerComponents: TideDynamicPageComponent[]
  /**
   * @description Dynamic components for the body section
   */
  bodyComponents: TideDynamicPageComponent[]
  /**
   * @description Background body colour
   */
}
