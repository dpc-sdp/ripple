/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare module '*.svg' {
  const content: string

  export default content
}

declare module '*.svg?component' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare module '*.svg?raw' {
  const content: string

  export default content
}

declare module '*.svg?data' {
  const content: string

  export default content
}

declare module '*.svg?skipsvgo' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare module '@dpc-sdp/ripple-ui-shared/assets/icons/sprite.svg?component' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare module '@dpc-sdp/ripple-ui-shared/assets/logos/logo-victoria-state-government.svg?component' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>

  export default component
}

declare module '@dpc-sdp/ripple-ui-shared/assets/logos/logo-vic-gov.svg' {
  const content: string

  export default content
}

declare module '@dpc-sdp/ripple-ui-shared/assets/flags/flag-aboriginal.svg?data' {
  const content: string

  export default content
}

declare module '@dpc-sdp/ripple-ui-shared/assets/flags/flag-torres-strait-islander.svg?data' {
  const content: string

  export default content
}

declare module '@dpc-sdp/ripple-ui-shared/assets/patterns/triangles-top.svg' {
  const content: string

  export default content
}

declare module '@dpc-sdp/ripple-ui-shared/assets/patterns/triangles-bottom.svg' {
  const content: string

  export default content
}
