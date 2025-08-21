import { expect } from 'storybook/test'

export const buttonFocusState = async ({ canvas }) => {
  const button = canvas.getByRole('button')

  button.focus()

  await expect(button).toHaveStyle(`
    background-color: rgb(255, 158, 27);
  `)
}
