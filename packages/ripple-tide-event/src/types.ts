import type {
  TideUrlField,
  TideImageField,
  TidePageBase
} from '@dpc-sdp/ripple-tide-api/types'

export interface TideEventPage extends TidePageBase {
  /**
   * @description Link to the event
   */
  link: TideUrlField
  /**
   * @description Image used in the the preview
   */
  image: TideImageField
  eventType: 'free' | 'paid'
  date: {
    start: string
    end: string
    range: string
  }
}
