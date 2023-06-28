import { trackEvent } from './tracker'

export default {
  'rpl-accordion/toggleAll': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_accordion_all`,
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
      trackEvent({
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
      trackEvent({
        event: `${payload.action}_alert`,
        element_id: payload?.id,
        element_text: payload?.label,
        label: payload?.name,
        component: 'rpl-alert',
        platform_event: 'dismiss'
      })
    }
  },
  'rpl-document/download': () => {
    return (payload: any) => {
      trackEvent({
        event: `file_${payload.action}`,
        element_text: payload?.label,
        file_name: payload?.label,
        file_extension: payload?.type,
        file_size: payload?.size,
        link_url: payload?.id,
        component: 'rpl-document',
        platform_event: 'download'
      })
    }
  },
  'rpl-form/submitted': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}`,
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
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        type: payload?.type,
        value: payload?.value,
        component: `rpl-form-${payload.field}`,
        platform_event: 'update'
      })
    }
  }
}

export { trackEvent }
