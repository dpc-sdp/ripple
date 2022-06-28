import { within, userEvent } from '@storybook/testing-library'
import { rplEventBus } from './../../index.js'
import { expect } from '@storybook/jest'

export const playFunction = async ({ canvasElement }) => {
  let fired = false
  rplEventBus.all.clear()
  const handler = () => {
    fired = !fired
  }
  rplEventBus.on('rpl-alert/dismiss', handler)
  const canvas = await within(canvasElement)
  await new Promise((r) => setTimeout(r, 2000))
  await userEvent.click(canvas.getByText('Dismiss alert'))
  await expect(fired).toBeTruthy()
  await expect(canvas.queryByText('Dismiss alert')).not.toBeInTheDocument()
  rplEventBus.off('rpl-alert/dismiss', handler)
}
