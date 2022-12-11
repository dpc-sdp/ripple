/* @ts-ignore runtime imports */
import { useState } from '#app'

export default (flags) => {
  return useState('featureFlags', () => {
    return flags || {}
  })
}
