---
to: packages/ripple-tide-<%= h.changeCase.paramCase(name) %>/src/types.ts
---

import type { TidePageBase } from '@dpc-sdp/ripple-tide-api/types'

export type Tide<%= h.changeCase.pascalCase(name) %>Header = {
  title: string
  summary: string
}

export interface Tide<%= h.changeCase.pascalCase(name) %>Page extends TidePageBase {
  /**
   * @description Example field - change this to your own!
   * @example 'Hello world from Tide<%= h.changeCase.pascalCase(name) %>Page'
   */
  header: Tide<%= h.changeCase.pascalCase(name) %>Header
}
