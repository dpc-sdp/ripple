import { gaEvent } from './ga-event'

export default {
  'rpl-accordion/toggleAll': () => {
    return (payload: any) => {
      gaEvent({
        event: `${payload.action}_accordion`,
        element_id: payload?.id,
        element_text: payload?.label,
        name: payload?.name,
        component: 'rpl-accordion',
        platform_event: 'toggleAll'
      })
    }
  },
  'rpl-accordion/toggleItem': () => {
    return (payload: any) => {
      gaEvent({
        event: `${payload.action}_accordion`,
        element_id: payload?.id,
        element_text: payload?.label,
        name: payload?.name,
        component: 'rpl-accordion',
        platform_event: 'toggleItem'
      })
    }
  },
  'rpl-alert/dismiss': () => {
    return (payload: any) => {
      gaEvent({
        event: `${payload.action}_alert`,
        element_text: payload?.label,
        label: payload?.name,
        component: 'rpl-alert',
        platform_event: 'dismiss'
      })
    }
  },
  'rpl-document/download': () => {
    return (payload: any) => {
      gaEvent({
        event: `${payload.action}_document`,
        element_text: payload?.label,
        file_name: payload?.label,
        file_extension: payload?.type,
        file_url: payload?.id,
        component: 'rpl-document',
        platform_event: 'download'
      })
    }
  },
  'rpl-form/submitted': () => {
    return (payload: any) => {
      gaEvent({
        event: `${payload.action}_form`,
        form_id: payload?.id,
        form_name: payload?.name,
        element_text: payload?.label,
        component: 'rpl-form',
        platform_event: 'submit'
      })
    }
  },
  'rpl-form-input/update': () => {
    return (payload: any) => {
      gaEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        element_id: payload?.id,
        form_id: payload?.contextId,
        form_name: payload?.contextName,
        type: payload?.type,
        value: payload?.value,
        component: `rpl-form-${payload.type}`,
        platform_event: 'update'
      })
    }
  }
}
