import { logger } from './../../lib/core'

module.exports = {
  // Convert Drupal webform data struture to Vue Form Generator structure
  webform: async (drupalFormEntity, { mapping }) => {
    const elements = drupalFormEntity.elements
    // Below data structure is following VFG 2.2.3.
    // `tideId`, `formState` and `messages` are our own custom properties.

    let data = {
      tideId: drupalFormEntity.drupal_internal__id,
      messages: {
        success: drupalFormEntity.settings.confirmation_message ? drupalFormEntity.settings.confirmation_message : null,
        failure: drupalFormEntity.settings.submission_exception_message ? drupalFormEntity.settings.submission_exception_message : null
      },
      model: {},
      schema: {
        groups: []
      },
      isNewModel: true,
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true
      },
      formState: {},
      settings: {
        shouldHideFormAfterSuccess: null
      },
      tag: 'rpl-fieldset',
      // TODO: Below category & redirect_url is used by VicPol only at this moment and the it's not in Tide.
      // The implementation need to be reviewed.
      category: drupalFormEntity.category,
      redirect_url: drupalFormEntity.settings.confirmation_url
    }

    // If form confirmation type is inline, always hide the form after it has been successfully submitted.
    // This switch can be used to define whether or not the form is hidden after submission based on the submission confirmation type set in Drupal
    switch (drupalFormEntity.settings.confirmation_type) {
      case ('inline'):
        data.settings.shouldHideFormAfterSuccess = true
        break

      default:
        break
    }

    for (const eName in elements) {
      // TODO: Check element default value and set it here.
      data.model[eName] = null
      const element = elements[eName]

      const field = {
        type: null,
        model: eName,
        validator: []
      }

      const group = {}

      // TODO: Add more webform config mapping here.
      // TODO: If elementName is `reset`, add a custom reset(cancel) button.
      if (element['#title']) {
        field.label = element['#title']
      }

      if (element['#placeholder']) {
        field.placeholder = element['#placeholder']
      }

      if (element['#description']) {
        field.hint = element['#description']
      }

      if (element['#required']) {
        field.required = true
        field.validator.push('required')
      } else {
        field.required = false
      }

      if (element['#states']) {
        field.states = element['#states']
      }

      switch (element['#type']) {
        case 'hidden':
          field.type = 'input'
          field.inputType = 'hidden'
          break

        case 'textfield':
          field.type = 'input'
          field.inputType = 'text'
          break

        case 'number':
          field.type = 'input'
          field.inputType = 'number'
          if (element['#max']) {
            field.max = element['#max']
          }
          if (element['#min']) {
            field.min = element['#min']
          }
          if (element['#step']) {
            field.step = element['#step']
          }
          break

        case 'email':
          field.type = 'input'
          field.inputType = 'email'
          field.validator.push('email')
          break

        case 'tel':
          field.type = 'input'
          field.inputType = 'tel'
          break

        case 'radios':
          field.type = 'radios'
          const defaultValue = element['#default_value']
          const fields = element['#options']
          field.values = []

          if (defaultValue && fields[defaultValue]) {
            data.model[eName] = defaultValue
          }

          for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
              field.values.push({ name: fields[key], value: key })
            }
          }
          break

        case 'textarea':
          field.type = 'textArea'
          break

        case 'checkbox':
          field.type = 'rplcheckbox'
          // inlineLabel is used in place of label for checkbxoes.
          field.label = null
          field.inlineLabel = element['#title'] ? element['#title'] : null
          break

        case 'select':
          field.type = 'rplselect'

          const options = element['#options']
          field.values = Object.keys(options).map((key) => {
            return {
              id: key,
              'name': options[key]
            }
          })

          if (element['#empty_option']) {
            field.placeholder = element['#empty_option']
          }
          break

        case 'webform_term_select':
          field.type = 'rplselect'
          if (element['#multiple']) {
            field.multiselect = true
            if (field.required) {
              field.min = 1
            }
          } else {
            field.multiselect = false
          }

          const vocabulary = element['#vocabulary']
          const termsFetcher = {
            method: 'getEntityList',
            args: [
              'taxonomy_term',
              vocabulary
            ]
          }

          const terms = await mapping.fetch(termsFetcher)
          field.values = terms.map((term) => {
            return {
              id: term.drupal_internal__tid.toString(),
              'name': term.name
            }
          })
          break

        case 'label':
          field.type = 'label'
          break

        case 'processed_text':
          field.type = 'rplmarkup'
          field.markup = element['#text']
          break

        case 'webform_markup':
          field.type = 'rplmarkup'
          field.markup = element['#markup']
          break

        case 'url':
          field.type = 'input'
          field.inputType = 'url'
          break

        case 'webform_horizontal_rule':
          field.type = 'rpldivider'
          break

        case 'address':
          data.model[eName] = {}
          group.fields = []
          group.legend = 'Event location'
          let requiredAddress = false
          if (element['#required']) {
            requiredAddress = true
          }
          if (element['#default_value']) {
            // convert yaml value to object
            const defaults = {}
            element['#default_value'].split('\n').map(val => val.split(': ')).forEach(function (d) { defaults[d[0]] = d[1] })

            if (defaults.country_code) {
              data.model[eName].country_code = defaults.country_code
            }
            if (defaults.administrative_area) {
              data.model[eName].administrative_area = defaults.administrative_area
            }
          }

          group.fields.push(
            {
              type: 'input',
              inputType: 'text',
              label: 'Street address',
              required: requiredAddress,
              validator: requiredAddress ? ['required'] : [],
              placeholder: 'Enter some text...',
              model: `${eName}.address_line1`
            },
            {
              type: 'input',
              inputType: 'text',
              required: false,
              label: 'Street address line 2',
              placeholder: 'Enter some text...',
              model: `${eName}.address_line2`,
              styleClasses: ['form-group--col-two']
            },
            {
              type: 'input',
              inputType: 'text',
              label: 'Suburb',
              required: requiredAddress,
              validator: requiredAddress ? ['required'] : [],
              placeholder: 'Enter some text...',
              model: `${eName}.locality`,
              styleClasses: ['form-group--col-two']
            },
            {
              type: 'rplselect',
              label: 'State',
              model: `${eName}.administrative_area`,
              required: requiredAddress,
              validator: requiredAddress ? ['required'] : [],
              selectOptions: {
                trackBy: 'id',
                label: 'name',
                closeOnSelect: true,
                searchable: false,
                showLabels: false
              },
              values: [{ id: 'VIC', name: 'Victoria' }, { id: 'NSW', name: 'New South Wales' }, { id: 'WA', name: 'Western Australia' }, { id: 'QLD', name: 'Queensland' }, { id: 'ACT', name: 'Australian Capital Territory' }],
              styleClasses: ['form-group--col-two']
            },
            {
              type: 'input',
              inputType: 'number',
              label: 'Postcode',
              required: requiredAddress,
              validator: requiredAddress ? ['required'] : [],
              placeholder: 'Enter some text...',
              model: `${eName}.postal_code`,
              styleClasses: ['form-group--col-two']
            }
          )
          break

        case 'date':
          field.type = 'rpldatepicker'
          break

        case 'webform_actions':
          group.fields = []
          group.styleClasses = ['rpl-fieldset--pad']
          group.fields.push({
            type: 'rplsubmitloader',
            buttonText: element['#title'],
            loading: false,
            autoUpdate: true,
            styleClasses: ['form-group--inline']
          },
          {
            type: 'rplclearform',
            buttonText: 'Clear form',
            styleClasses: ['form-group--inline']
          }
          )
          break

        case 'webform_privacy_statement':
          group.fields = []
          group.legend = element['#privacy_statement_heading']
          group.fields.push(
            {
              type: 'rplmarkup',
              markup: element['#privacy_statement_content']
            },
            {
              type: 'rplcheckbox',
              label: null,
              inlineLabel: element['#title'] ? element['#title'] : null,
              required: element['#required'],
              validator: element['#required'] ? ['required'] : [],
              model: eName
            }
          )
          break
      }

      // Only mapped type will be rendered.
      // Single fields get wrapped in groups, this should be updated when vfg v3 is stable with field type group functionality https://github.com/vue-generators/vue-form-generator/pull/484
      if (group.hasOwnProperty('fields') && group.fields.length > 0) {
        data.schema.groups.push(group)
      } else if (!group.hasOwnProperty('fields') && field.type !== null) {
        data.schema.groups.push({ 'fields': [field] })
      } else {
        if (process.server) {
          logger.warn(`Webform element type "${element['#type']}" is not supported in nuxt-tide at this stage, please ask site admin to remove it from relative Tide webform or addd support for it.`, { label: 'Webform' })
        }
      }
    }
    return data
  }
}
