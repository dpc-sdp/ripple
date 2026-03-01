import { FormKitSchemaNode, FormKitSchemaProps } from '@formkit/core'
import type { Ref } from 'vue'

export interface IRplFormProvidedState {
  id?: string
  name?: string
  schema?: (FormKitSchemaNode | RplFormKitStepNode)[]
  values?: Ref<any>
  multiStep?: boolean
  focusStepField?: Ref<string | null>
  goToField?: (field: string, step: string | null, label: string | null) => void
  stepsId?: string
}

export type RplFormKitStepNode = {
  $step: boolean
  id: string
  key: string
  name: string
  title: string
  label: string
  nextButton: string
  prevButton: string
  schema: FormKitSchemaNode[]
  parentStep?: string
} & FormKitSchemaProps
