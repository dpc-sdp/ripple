import { generateIconImports } from './../lib/svg-icon-utils'
import { join } from 'pathe'

generateIconImports(
  join(__dirname, './../src/assets/icons/custom'),
  join(__dirname, './../src/assets/icons/custom.js')
)
