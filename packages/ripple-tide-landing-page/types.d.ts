import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'

export default interface TideLandingPagePage extends TidePageBase {
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
  background: string
}
