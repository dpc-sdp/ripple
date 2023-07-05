import { trackEvent } from './tracker'

export default {
  // UI Core components
  'rpl-accordion/toggleAll': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_accordion_all`,
        element_id: payload?.id,
        element_text: payload?.text,
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
        element_text: payload?.text,
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
        element_text: payload?.text,
        label: payload?.label,
        component: 'rpl-alert',
        platform_event: 'dismiss'
      })
    }
  },
  'rpl-breadcrumbs/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_breadcrumb`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        index: payload?.index,
        component: 'rpl-breadcrumbs',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-campaign-banner/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_banner`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        type: payload?.type,
        component: 'rpl-campaign-banner',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-card/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_card`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        name: payload?.name,
        link_url: payload?.value,
        type: payload?.type,
        component: 'rpl-card',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-card-carousel/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `paginate_${payload.action}`,
        element_id: payload?.id,
        name: payload?.name,
        index: payload?.index,
        component: 'rpl-card-carousel',
        platform_event: 'paginate'
      })
    }
  },
  'rpl-chip/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_chip`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-chip',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-contact-us/itemClick': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_link`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        component: 'rpl-contact-us',
        platform_event: 'itemClick'
      })
    }
  },
  'rpl-data-table/toggleRow': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_table_row`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        index: payload?.index,
        component: 'rpl-data-table',
        platform_event: 'toggleRow'
      })
    }
  },
  'rpl-document/download': () => {
    return (payload: any) => {
      trackEvent({
        event: `document_${payload.action}`,
        element_text: payload?.text,
        link_url: payload?.value,
        component: 'rpl-document',
        platform_event: 'download'
      })
    }
  },
  'rpl-file/download': () => {
    return (payload: any) => {
      trackEvent({
        event: `file_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        file_name: payload?.label,
        file_extension: payload?.type,
        file_size: payload?.size,
        link_url: payload?.value,
        component: 'rpl-file',
        platform_event: 'download'
      })
    }
  },
  'rpl-footer/toggleNav': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_footer_nav`,
        element_id: payload?.id,
        element_text: payload?.text,
        component: 'rpl-footer',
        platform_event: 'toggleNav'
      })
    }
  },
  'rpl-footer/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_footer`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        component: 'rpl-footer',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-header/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_header`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        type: payload?.type,
        component: 'rpl-header',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-in-page-navigation/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_in_page_nav`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        component: 'rpl-in-page-navigation',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-media-embed/viewTranscript': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_transcript`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        component: 'rpl-media-embed',
        platform_event: 'viewTranscript'
      })
    }
  },
  'rpl-media-embed/viewFullscreen': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_fullscreen`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        component: 'rpl-media-embed',
        platform_event: 'viewFullscreen'
      })
    }
  },
  'rpl-media-embed/viewData': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_data`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        component: 'rpl-media-embed',
        platform_event: 'viewData'
      })
    }
  },
  'rpl-media-embed/downloadImage': () => {
    return (payload: any) => {
      trackEvent({
        event: `file_${payload.action}`,
        element_id: payload?.id,
        element_text: payload?.text,
        label: payload?.label,
        link_url: payload?.value,
        component: 'rpl-media-embed',
        platform_event: 'downloadImage'
      })
    }
  },
  'rpl-media-gallery/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_item`,
        element_id: payload?.id,
        index: payload?.index,
        name: payload?.name,
        component: 'rpl-media-gallery',
        platform_event: 'paginate'
      })
    }
  },
  'rpl-media-gallery/viewFullscreen': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_fullscreen`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        value: payload?.value,
        index: payload?.index,
        component: 'rpl-media-gallery',
        platform_event: 'viewFullscreen'
      })
    }
  },
  'rpl-page-links/paginate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_page_link`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        component: 'rpl-page-links',
        platform_event: 'paginate'
      })
    }
  },
  'rpl-primary-nav/quickExit': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_quick_exit`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        component: 'rpl-primary-nav',
        platform_event: 'quickExit'
      })
    }
  },
  'rpl-primary-nav/toggleMenu': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_primary_menu`,
        element_id: payload?.id,
        component: 'rpl-primary-nav',
        platform_event: 'toggleMenu'
      })
    }
  },
  'rpl-primary-nav/toggleNavItem': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_nav_item`,
        element_text: payload?.text,
        value: payload?.value,
        component: 'rpl-primary-nav',
        platform_event: 'toggleNavItem'
      })
    }
  },
  'rpl-primary-nav/toggleSearch': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_search`,
        element_id: payload?.id,
        component: 'rpl-primary-nav',
        platform_event: 'toggleSearch'
      })
    }
  },
  'rpl-related-links/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_link`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-related-links',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-search-bar/search': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_search`,
        element_id: payload?.id,
        element_text: payload?.text,
        value: payload?.value,
        component: 'rpl-search-bar',
        platform_event: 'search'
      })
    }
  },
  'rpl-social-share/openShareWindow': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_link`,
        element_id: payload?.id,
        element_text: payload?.text,
        link_url: payload?.value,
        component: 'rpl-social-share',
        platform_event: 'openShareWindow'
      })
    }
  },
  'rpl-tabs/switchTab': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_tab`,
        element_id: payload?.id,
        element_text: payload?.text,
        component: 'rpl-tabs',
        platform_event: 'switchTab'
      })
    }
  },
  'rpl-timeline/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_entry`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        link_url: payload?.value,
        component: 'rpl-timeline',
        platform_event: 'navigate'
      })
    }
  },
  'rpl-vertical-nav/toggleMenuItem': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        name: payload?.name,
        component: 'rpl-vertical-nav',
        platform_event: 'toggleMenuItem'
      })
    }
  },
  'rpl-vertical-nav/navigate': () => {
    return (payload: any) => {
      trackEvent({
        event: `${payload.action}_menu_item`,
        element_id: payload?.id,
        element_text: payload?.text,
        component: 'rpl-vertical-nav',
        platform_event: 'navigate'
      })
    }
  },
  // UI Forms components
  'rpl-form/submitted': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}`,
        form_id: payload?.id,
        form_name: payload?.name,
        element_text: payload?.text,
        component: 'rpl-form',
        platform_event: 'submit'
      })
    }
  },
  'rpl-form-date/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'date',
        component: 'rpl-form-date',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-dropdown/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'select',
        component: 'rpl-form-dropdown',
        platform_event: 'update'
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
        component: 'rpl-form-input',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-option/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        type: payload?.type,
        value: payload?.value,
        component: 'rpl-form-option',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-option-buttons/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'radio',
        component: 'rpl-form-option-buttons',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-checkbox-group/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'checkbox',
        component: 'rpl-form-checkbox-group',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-radio-group/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'radio',
        component: 'rpl-form-radio-group',
        platform_event: 'update'
      })
    }
  },
  'rpl-form-textarea/update': () => {
    return (payload: any) => {
      trackEvent({
        event: `form_${payload.action}_field`,
        label: payload?.label,
        form_name: payload?.contextName,
        form_id: payload?.contextId,
        field_id: payload?.id,
        value: payload?.value,
        type: 'textarea',
        component: 'rpl-form-textarea',
        platform_event: 'update'
      })
    }
  }
}

export { trackEvent }
