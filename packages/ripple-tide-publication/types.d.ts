import { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'
import { TideLandingPageComponent } from '@dpc-sdp/ripple-tide-landing-page/types'

export type TidePublicationHeader = {
  title: string
  summary: string
}

export type TidePublicationChapter = {
  title: string
  summary: string
  link: any
}

export default interface TidePublicationPage extends TidePageBase {
  /**
   * @description Example field - change this to your own!
   * @example 'Hello world from TidePublicationPage'
   */
  header: TidePublicationHeader
  details: any
  chapters: Array<TidePublicationChapter>
  dynamicComponents: Array<TideLandingPageComponent>
}
