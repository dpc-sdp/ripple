import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type TideLandingPageComponent = {
  id: string
  component: string
  props: Record<string, any>
  class?: Record<string, any>
}

export default interface TideLandingPagePage extends TidePageBase {
  /**
   * @description Dynamic components for the header section
   */
  headerComponents: TideLandingPageComponent[]
  /**
   * @description Dynamic components for the body section
   */
  bodyComponents: TideLandingPageComponent[]
}
