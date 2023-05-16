import { saveSprite } from './../lib/svg-icon-utils'
import { join } from 'pathe'

saveSprite(
  join(__dirname, './../src/assets/icons/core'),
  join(__dirname, './../src/assets/icons')
)
