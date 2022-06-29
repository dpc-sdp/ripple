import { getByRole } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export const buttonFocusInteraction = async ({ canvasElement }) => {
  const button = await getByRole(canvasElement, 'button')
  button.focus()
  // @ts-ignore
  expect(button).toHaveStyle(`
    background-color: rgb(255, 158, 27);
  `)
}
