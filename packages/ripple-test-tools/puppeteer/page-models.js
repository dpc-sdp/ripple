const { dataSel, hrefSel } = require('./util')

const adminPageModels = {
  login: {
    name: '#edit-name',
    pass: '#edit-pass',
    form: '#user-login-form'
  },
  common: {
    title: dataSel('edit-title-0-value'),
    yamlpaste: dataSel('edit-import'),
    summary: dataSel('edit-field-landing-page-summary-0-value'),
    topic: dataSel('edit-field-topic-0-target-id'),
    siteCheckbox: (site) => dataSel(`edit-field-node-site-${site}`),
    primarySite: (site) => dataSel(`edit-field-node-primary-site-${site}`),
    moderationState: dataSel('edit-moderation-state-0-state')
  },
  landingPage: {
    formId: dataSel('node-landing-page-form'),
    componentSelect: dataSel('edit-field-landing-page-component-add-more-add-more-select'),
    componentAddButton: dataSel('edit-field-landing-page-component-add-more-add-more-button'),
    webFormTitle: dataSel('edit-field-landing-page-component-0-subform-field-paragraph-title-0-value'),
    webFormType: dataSel('edit-field-landing-page-component-0-subform-field-paragraph-webform-0-target-id'),
    authenticatedContent: dataSel('edit-field-authenticated-content'),
    components: {
      accordion: {
        title: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-title-0-value`),
        style: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-accordion-style`),
        item: {
          name: (cmpIdx, accIdx) => dataSel(`edit-field-landing-page-component-${cmpIdx}-subform-field-paragraph-accordion-${accIdx}-subform-field-paragraph-accordion-name-0-value`),
          content: (cmpIdx, accIdx) => dataSel(`edit-field-landing-page-component-${cmpIdx}-subform-field-paragraph-accordion-${accIdx}-subform-field-paragraph-accordion-body-wrapper`),
          addItemBtn: (cmpIdx) => `[name="field_landing_page_component_${cmpIdx}_subform_field_paragraph_accordion_accordion_content_add_more"]`
        }
      },
      basic: {
        wysiwyg: '.paragraph-type--basic-text:first-child .form-textarea-wrapper'
      },
      webform: {
        title: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-title-0-value`),
        type: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-webform-0-target-id`)
      },
      cardEventAuto: {
        cta: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-cta-text-0-value`),
        event: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-paragraph-reference-0-target-id`)
      },
      userAuthBlock: {
        nextPage: (idx) => dataSel(`edit-field-landing-page-component-${idx}-subform-field-next-page-0-uri`)
      }
    }
  },
  createUser: {
    email: dataSel('edit-mail'),
    username: dataSel('edit-name'),
    password: dataSel('edit-pass-pass1'),
    passwordConfirm: dataSel('edit-pass-pass2'),
    statusBlocked: dataSel('edit-status-0'),
    statusConfirmed: dataSel('edit-status-1'),
    submitButton: dataSel('edit-submit'),
    editRole: (role) => dataSel(`edit-roles-${role}`),
    previewRole: dataSel('edit-roles-previewer')
  },
  createRolePage: {
    role: dataSel('edit-label'),
    id: dataSel('edit-id')
  },
  configureAuthContent: {
    termName: dataSel('edit-name-0-value'),
    role: (role) => dataSel(`edit-access-role-${role}`),
    access: dataSel('edit-access')
  },
  deleteUser: {
    deleteAccountAndContent: dataSel('edit-user-cancel-method-user-cancel-delete')
  },
  grantPage: {
    tabs: {
      grantDetails: hrefSel('#edit-group-body-content'),
      grantAuthor: hrefSel('#edit-group-grant-author')
    },
    grantDetails: {
      tabs: {
        overview: hrefSel('#edit-group-grant-overview'),
        timeline: hrefSel('#edit-group-grant-timeline'),
        guidelines: hrefSel('#edit-group-guidelines'),
        supportingDocs: hrefSel('#edit-group-supporting-documents')
      },
      overview: {
        title: dataSel('edit-field-overview-title-0-value'),
        funding: {
          from: dataSel('edit-field-node-funding-level-0-from'),
          to: dataSel('edit-field-node-funding-level-0-to')
        },
        audienceAddMore: dataSel('edit-field-audience-add-more'),
        audience1: dataSel('edit-field-audience-0-target-id'),
        audience2: dataSel('edit-field-audience-1-target-id'),
        ongoingCheckbox: dataSel('edit-field-node-on-going-value'),
        cta: {
          uri: dataSel('edit-field-call-to-action-0-uri'),
          title: dataSel('edit-field-call-to-action-0-title')
        },
        date: {
          startdate: dataSel('edit-field-node-dates-0-value-date'),
          starttime: dataSel('edit-field-node-dates-0-value-time'),
          enddate: dataSel('edit-field-node-dates-0-end-value-date'),
          endtime: dataSel('edit-field-node-dates-0-end-value-time')
        },
        description: dataSel('edit-field-description-wrapper'),
        websiteUrl: dataSel('edit-field-node-link-0-uri')
      },
      timeline: {
        title: dataSel('edit-field-node-timeline-0-subform-field-paragraph-title-0-value'),
        item: {
          title: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-title-0-value'),
          summary: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-summary-0-value'),
          startdate: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-date-range-0-value-date'),
          starttime: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-date-range-0-value-time'),
          enddate: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-date-range-0-end-value-date'),
          endtime: dataSel('edit-field-node-timeline-0-subform-field-timeline-0-subform-field-paragraph-date-range-0-end-value-time')
        }
      },
      guidelines: {
        eligibility: {
          title: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-0-subform-field-paragraph-accordion-name-0-value'),
          text: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-0-subform-field-paragraph-accordion-body-wrapper')
        },
        criteria: {
          title: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-1-subform-field-paragraph-accordion-name-0-value'),
          text: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-1-subform-field-paragraph-accordion-body-wrapper')
        },
        process: {
          title: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-2-subform-field-paragraph-accordion-name-0-value'),
          text: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-2-subform-field-paragraph-accordion-body-wrapper')
        },
        howToApply: {
          title: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-3-subform-field-paragraph-accordion-name-0-value'),
          text: dataSel('edit-field-node-guidelines-0-subform-field-paragraph-accordion-3-subform-field-paragraph-accordion-body-wrapper')
        }
      }
    },
    grantAuthor: {
      fullName: dataSel('edit-field-node-author-0-value'),
      email: dataSel('edit-field-node-email-0-value'),
      phone: dataSel('edit-field-node-phone-0-value'),
      department: dataSel('edit-field-node-department')
    }
  },
  eventPage: {
    description: dataSel('edit-field-event-description-wrapper'),
    tabs: {
      bodyContent: hrefSel('#edit-group-body-content'),
      eventAuthor: hrefSel('#edit-group-event-author')
    },
    bodyContent: {
      body: dataSel('edit-body-wrapper'),
      startDate: dataSel('edit-field-event-details-0-subform-field-paragraph-date-range-0-value-date'),
      startTime: dataSel('edit-field-event-details-0-subform-field-paragraph-date-range-0-value-time'),
      endDate: dataSel('edit-field-event-details-0-subform-field-paragraph-date-range-0-end-value-date'),
      endTime: dataSel('edit-field-event-details-0-subform-field-paragraph-date-range-0-end-value-time'),
      streetAddress: dataSel('edit-field-event-details-0-subform-field-paragraph-location-0-address-address-line1'),
      suburb: dataSel('edit-field-event-details-0-subform-field-paragraph-location-0-address-locality'),
      state: dataSel('edit-field-event-details-0-subform-field-paragraph-location-0-address-administrative-area'),
      postalCode: dataSel('edit-field-event-details-0-subform-field-paragraph-location-0-address-postal-code'),
      price: dataSel('edit-field-event-details-0-subform-field-paragraph-event-price-from-0-value'),
      priceTo: dataSel('edit-field-event-details-0-subform-field-paragraph-event-price-to-0-value'),
      eventRequirements: dataSel('edit-field-event-details-0-subform-field-event-requirements-0-target-id'),
      bookUrl: dataSel('edit-field-event-details-0-subform-field-paragraph-link-0-uri'),
      linkText: dataSel('edit-field-event-details-0-subform-field-paragraph-link-0-title'),
      eventCategory: dataSel('edit-field-event-category-0-target-id'),
      audience: dataSel('edit-field-audience-0-target-id'),
      websiteUrl: dataSel('edit-field-node-link-0-uri')
    },
    eventAuthor: {
      fullName: dataSel('edit-field-node-author-0-value'),
      emailAddress: dataSel('edit-field-node-email-0-value'),
      contactPhone: dataSel('edit-field-node-phone-0-value')
    }
  },
  jwt: {
    expiry: dataSel('edit-jwt-exp'),
    key: dataSel('edit-jwt-key')
  },
  accounts: {
    adminApproval: dataSel('edit-user-register-visitors-admin-approval')
  }

}

const frontEndPageModels = {
  grant: {

  },
  landingPage: {

  }
}

module.exports = {
  adminPageModels,
  frontEndPageModels
}
