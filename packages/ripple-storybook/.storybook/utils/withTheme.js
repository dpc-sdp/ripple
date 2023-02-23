import themes from "../themes.js";

// Function to obtain the intended theme
const getTheme = (themeName) => {
  return Object.entries(themes[themeName]?.tokens || {}).reduce((result, [key, value]) => {
    return {
      ...result,
      [`--${key}`]: value
    }
  }, {})
}

const withTheme=(story, context)=>{

  return {
    components: { story },
    setup() {
      const theme = getTheme(context.globals.theme);
      return { theme }
    },
    template:
      `<div :style="theme">
        <story/>
      </div>`
  }
}

export default withTheme
