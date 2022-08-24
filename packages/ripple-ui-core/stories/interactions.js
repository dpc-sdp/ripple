import { expect } from '@storybook/jest'
import { userEvent } from '@storybook/testing-library'
import { rplEventBus } from './../src/index'
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

export const a11yCheck = async (element) => {
  const a11yCheck = await axe(element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa']
    }
  })
  expect(a11yCheck).toHaveNoViolations()
}

export const a11yStoryCheck = async ({ canvasElement }) => {
  await a11yCheck(canvasElement)
}

export const eventCheck = async (element, eventName) => {
  let fired = false
  rplEventBus.all.clear()
  const handler = () => {
    fired = !fired
  }
  rplEventBus.on(eventName, handler)
  await userEvent.click(element)
  await expect(fired).toBeTruthy()
  rplEventBus.off(eventName, handler)
}
