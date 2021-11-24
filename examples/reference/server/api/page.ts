import type { IncomingMessage, ServerResponse } from 'http'
import { double } from '@dpc-sdp/ripple-tide-api'

export default async (req: IncomingMessage, res: ServerResponse) => {
  return {
    data: double(2),
  }
}
