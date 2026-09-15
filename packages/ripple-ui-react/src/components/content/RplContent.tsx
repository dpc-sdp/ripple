import { type PropsWithChildren, type ReactNode } from 'react'

type Props = {
  html?: string
  children?: ReactNode
}

export function RplContent(props: PropsWithChildren<Props>) {
  const { html, children } = props
  if (html) {
    return (
      <div
        className='rpl-content'
        dangerouslySetInnerHTML={{ __html: html ?? '' }}
      />
    )
  } else {
    return <div className='rpl-content'>{children}</div>
  }
}

export default RplContent
