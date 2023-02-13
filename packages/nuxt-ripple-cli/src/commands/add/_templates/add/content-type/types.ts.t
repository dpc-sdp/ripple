---
to: types.ts
---

import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export interface Tide<%= h.changeCase.pascalCase(name) %>Page extends TidePageBase {
  /**
    * @description This is an example
    * @example Example page
    */
  title: string
}
