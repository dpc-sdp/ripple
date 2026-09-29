import * as React from 'react'
import type { SVGProps } from 'react'
const SvgIconList = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <circle cx={2.2} cy={3} r={2.2} />
    <path d='M9.8 5.2h12C23 5.2 24 4.2 24 3S23 .8 21.8.8h-12C8.6.8 7.6 1.8 7.6 3s.9 2.2 2.2 2.2' />
    <circle cx={2.2} cy={12} r={2.2} />
    <path d='M21.8 9.8h-12c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h12c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2' />
    <circle cx={2.2} cy={21} r={2.2} />
    <path d='M21.8 18.8h-12c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2h12c1.2 0 2.2-1 2.2-2.2s-1-2.2-2.2-2.2' />
  </svg>
)
export default SvgIconList
