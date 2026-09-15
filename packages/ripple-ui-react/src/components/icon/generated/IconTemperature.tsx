import * as React from 'react'
import type { SVGProps } from 'react'
const SvgIconTemperature = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
    <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0m0 20.7c-3 0-5.5-2.4-5.5-5.5 0-2.2 1.4-4.2 3.3-5V3.9c0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2v6.4c1.9.8 3.3 2.8 3.3 5 0 3-2.5 5.4-5.5 5.4' />
    <circle cx={12} cy={15.3} r={2.2} />
  </svg>
)
export default SvgIconTemperature
