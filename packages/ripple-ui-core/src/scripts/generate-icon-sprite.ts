import { saveSprite } from './../lib/svg-icon-utils'
import { join } from 'pathe'

saveSprite(
  join(__dirname, './../assets/icons/core'),
  join(__dirname, './../../public/assets/icons')
)
