import type {
  TidePageBase,
  TideDynamicPageComponent
} from '@dpc-sdp/ripple-tide-api/types'

export interface TideLandingPagePage extends TidePageBase {
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
  background: string
}
