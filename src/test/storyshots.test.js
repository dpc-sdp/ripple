import initStoryshots, { Stories2SnapsConverter } from '@storybook/addon-storyshots'
import { mount } from '@vue/test-utils'

initStoryshots({
  suite: 'RippleStoryshots',
  configPath: './src/.storybook',
  // Below is the option that activates the async behaviour
  // https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core#storyshots-for-async-rendered-components
  asyncJest: true,
  test: ({
    story,
    context,
    done // --> callback passed to test method when asyncJest option is true
  }) => {
    const converter = new Stories2SnapsConverter()
    const snapshotFilename = converter.getSnapshotFileName(context)
    const storyElement = story.render()
    // mount the story
    const wrapper = mount(storyElement)

    // wait until the mount is updated, in our app mostly by Relay
    // but maybe something else updating the state of the component
    // somewhere
    const waitTime = 1
    setTimeout(() => {
      if (snapshotFilename) {
        // expect(wrapper.html()).toMatchSpecificSnapshot(snapshotFilename)
        expect(wrapper.element).toMatchSpecificSnapshot(snapshotFilename)
      }
      done()
    }, waitTime)
  }
})
