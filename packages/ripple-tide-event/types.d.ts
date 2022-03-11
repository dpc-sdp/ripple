import type {
  TideUrlField,
  TideImageField
} from '@dpc-sdp/ripple-tide-api/types'

export default interface TideEventPage {
  title: string
  summary: string
  /**
   * @description Link to the event
   */
  link: TideUrlField
  /**
   * @description Image used in the the preview
   * @
   */
  image: TideImageField
  /**
   * @deprecated true
   * @description this is an old field
   * @example something
   */
  oldfield?: string
  eventType: 'free' | 'paid'
  date: {
    start: string
    end: string
    range: string
  }
}
