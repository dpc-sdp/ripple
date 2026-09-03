// declare module '*.svg?react' {
//   import type { ComponentType, SVGProps } from 'react'
//   const component: ComponentType<SVGProps<SVGSVGElement>>
//   export default component
// }

declare module '*.svg?raw' {
  const content: string
  export default content
}
