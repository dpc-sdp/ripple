/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.svg?skipsvgo' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@dpc-sdp/ripple-ui-core/vue'
declare module '@dpc-sdp/ripple-ui-core/components'
