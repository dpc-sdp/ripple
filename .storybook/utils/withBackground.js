const backgrounds = {
  light: 'white',
  gray: 'var(--rpl-clr-neutral-100)',
  reverse: 'var(--rpl-clr-primary-alt)'
}

// Custom background decorator to replace storybook's background plugin, as
// the default one was messing up the axe test.
const withBackground = (story, {parameters})  => {
  document.documentElement.style.setProperty(
    '--storybook-bg-color',
    backgrounds[parameters.background] || backgrounds.light
  );

  return {
    components: { story },
    template: '<story />'
  }
}

export default withBackground
