import { gaEvent } from './ga-event'

export default {
  'rpl-accordion/toggleAll': () => {
    return (payload: any) => {
      gaEvent({
        event: payload.action === 'open' ? 'open_accordion' : 'close_accordion',
        element_id: payload.id,
        element_text: payload.label,
        name: payload.name,
        platform_event: 'rpl-accordion/toggleAll',
        component: 'rpl-accordion'
      })
    }
  }
}
