import type { InjectionKey } from 'vue'
import type { IRplFeatureFlags } from '../../../types'

export const FEATURE_FLAGS: InjectionKey<IRplFeatureFlags> =
  Symbol('featureFlags')
