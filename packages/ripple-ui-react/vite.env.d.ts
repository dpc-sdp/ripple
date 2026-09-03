/// <reference types="vite/client" />
declare module '*.svg?raw' {
  const content: string
  export default content
}
declare module '*.svg?react' {
  import type { ComponentType, SVGProps } from 'react'
  const content: ComponentType<SVGProps<SVGSVGElement>>
  export default content
}
