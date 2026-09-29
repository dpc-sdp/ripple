import { RplButton, RplContent } from '@dpc-sdp/ripple-ui-react'

export default function Home() {
  return (
    <div>
      <RplContent>
        <h1>This is a page</h1>
      </RplContent>
      <RplButton variant='destructive' el='a' url='/page'>
        sdfsdf
      </RplButton>
    </div>
  )
}
