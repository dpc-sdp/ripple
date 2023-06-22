---
to: types.ts
---

import type { TidePageBase, TideImageField } from '@dpc-sdp/ripple-tide-api/types'

export type Tide<%= h.changeCase.pascalCase(name) %>Header = {
  title: string
  summary: string
}

export type Tide<%= h.changeCase.pascalCase(name) %>Body = {
  image: TideImageField
  caption: string
  content: string
}

export interface Tide<%= h.changeCase.pascalCase(name) %>Page extends TidePageBase {
  /**
   * @description RplHeader component
   */
  header: Tide<%= h.changeCase.pascalCase(name) %>Header
  /**
   * @description Props for component wrapper
   */
  body: Tide<%= h.changeCase.pascalCase(name) %>Body
}
