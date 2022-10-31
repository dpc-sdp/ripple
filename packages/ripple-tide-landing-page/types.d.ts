import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'
import {
  ITideHeroHeader,
  ITideCampaign
} from './src/mapping/hero-header/hero-header-mapping'

export default interface TideLandingPagePage extends TidePageBase {
  background: string
  heroHeader: ITideHeroHeader
  primaryCampaign: ITideCampaign
  secondaryCampaign: ITideCampaign
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
