import '@dpc-sdp/ripple-ui-styles/global'
import type { Preview } from '@storybook/react-vite'
import { RplIconSprite } from '../src/components/icon/RplIconSprite'

const preview: Preview = {
  decorators: [
    (Story: any) => (
      <>
        <RplIconSprite />
        <Story />
      </>
    )
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
