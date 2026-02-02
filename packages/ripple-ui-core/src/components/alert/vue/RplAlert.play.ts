import { rplEventBus } from '@dpc-sdp/ripple-ui-core'
import { expect } from 'storybook/test'

export const playFunction = async ({ canvas, userEvent }) => {
  rplEventBus.all.clear()
  let fired = false
  const handler = () => (fired = !fired)

  rplEventBus.on('rpl-alert/dismiss', handler)

  await new Promise((r) => setTimeout(r, 2000))
  await userEvent.click(canvas.getByText('Dismiss alert'))
  await expect(fired).toBeTruthy()
  await expect(canvas.queryByText('Dismiss alert')).not.toBeInTheDocument()

  rplEventBus.off('rpl-alert/dismiss', handler)
}
