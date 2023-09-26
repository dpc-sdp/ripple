import { generate } from './generate.js'
import path from 'path'

import { generateOpts } from './generate'

if (process.env.RFG_API_KEY === undefined) {
  console.error('Missing required env var RFG_API_KEY')
} else if (process.env.MASTER === undefined) {
  console.error('Missing required env var MASTER')
} else if (process.env.THEME_COLOUR === undefined) {
  console.error('Missing required env var THEME_COLOUR')
} else {
  const opts: generateOpts = {
    masterPath: process.env.MASTER,
    outputPath: path.dirname(process.env.MASTER),
    API_KEY: process.env.RFG_API_KEY,
    themeColour: process.env.THEME_COLOUR
  }

  generate(opts)
}
