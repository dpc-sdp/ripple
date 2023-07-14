---
to: types.ts
---

import type { TidePageBase, TideImageField } from '@dpc-sdp/ripple-tide-api/types'

export type Tide<%= h.pascalCaseMerge(name) %>Header = {
  title: string
  summary: string
}

export type Tide<%= h.pascalCaseMerge(name) %>Body = {
  image: TideImageField
  caption: string
  content: string
}

export interface Tide<%= h.pascalCaseMerge(name) %>Page extends TidePageBase {
  /**
   * @description RplHeader component
   */
  header: Tide<%= h.pascalCaseMerge(name) %>Header
  /**
   * @description Props for component wrapper
   */
  body: Tide<%= h.pascalCaseMerge(name) %>Body
}
