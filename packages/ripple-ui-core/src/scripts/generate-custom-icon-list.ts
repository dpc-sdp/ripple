import { generateIconImports } from './../lib/svg-icon-utils'
import { join } from 'pathe'

generateIconImports(
  join(__dirname, './../assets/icons/custom'),
  join(__dirname, './../assets/icons/custom.js')
)
