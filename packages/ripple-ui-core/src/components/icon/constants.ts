import coreIconKeys from './../../assets/icons/sprite.js'
import customIconImports from './../../assets/icons/custom.js'

export const RplCoreIconNames = coreIconKeys
export const RplCustomIconNames = Object.keys(customIconImports)
export const RplIconNames = [...RplCoreIconNames, ...RplCustomIconNames]
export const RplIconSizes = ['s', 'm', 'l'] as const
