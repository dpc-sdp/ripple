/* eslint-disable no-prototype-builtins */
import type { TideDynamicPageComponent } from '@dpc-sdp/ripple-tide-api/types'
import { logger } from '@dpc-sdp/ripple-tide-api'
import { useAppConfig } from '#imports'

export interface ITideDataDrivenComponent {
  component?: string
  description: string
  title: string
  field?: string
  data?: unknown
}

interface IDDCAppConfig {
  ripple?: {
    dataDrivenComponents?: Record<string, string>
  }
}

export const dataDrivenComponentMapping = (
  field: any
): TideDynamicPageComponent<ITideDataDrivenComponent> => {
  const getComponent = (field: any) => {
    const appConfig = useAppConfig() as IDDCAppConfig
    if (
      appConfig?.ripple?.dataDrivenComponents?.hasOwnProperty(
        field.field_data_driven_component
      )
    ) {
      return appConfig.ripple.dataDrivenComponents[
        field.field_data_driven_component
      ]
    }
    return 'TideLandingPageDataDrivenCmpError'
  }
  let dataProps = {}
  try {
    dataProps = JSON.parse(field.field_configuration)
  } catch (error) {
    logger.error(`Error parsing data driven component extra data`, error)
  }

  return {
    component: getComponent(field),
    id: `${field.drupal_internal__id}`,
    props: {
      title: field.field_paragraph_title,
      description: field.field_paragraph_body?.processed,
      field: field.field_data_driven_component,
      component: getComponent(field),
      ...dataProps
    }
  }
}

export default {
  includes: [],
  mapping: dataDrivenComponentMapping,
  contentTypes: ['landing_page']
}
