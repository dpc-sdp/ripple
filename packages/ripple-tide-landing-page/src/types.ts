import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'
import { ITideHeroHeader } from './mapping/hero-header/hero-header-mapping'
import { ITidePrimaryCampaign } from './mapping/primary-campaign/primary-campaign-mapping'
import { ITideSecondaryCampaign } from './mapping/secondary-campaign/secondary-campaign-mapping'

export interface TideLandingPagePage extends TidePageBase {
  showHeroAcknowledgement: boolean
  showInPageNav: boolean
  inPageNavHeadingLevel: 'h2' | 'h3'
  background: string
  heroHeader: ITideHeroHeader
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
