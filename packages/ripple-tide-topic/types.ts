import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export interface TideTopicPage extends TidePageBase {
  /**
   * @description RplHeader component
   */
  header: {
    title: string
  }
  /**
   * @description Props for component wrapper
   */
  filter: {
    field: string
    value: string
  }
}
