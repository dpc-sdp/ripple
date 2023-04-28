/**
 * A Vue Mixin for webform
 */
const webform = {
  methods: {
    /**
     * Post form data to Tide API
     * @param {string} formId - webform Id
     * @param {Object} formData - form data
     */
    async postForm (formId, formData = {}) {
      const formResource = 'webform_submission'

      let data = {
        data: {
          type: formResource,
          attributes: {
            remote_addr: '0.0.0.0', // A IP placeholder for Tide validation, incase the IP is required.
            data: JSON.stringify(formData)
          }
        }
      }

      if (this.isMultipartForm(formData)) {
        data = this.getMultipartData(formData)
      }

      // TODO: Add better error handling/log for form API error.
      // It's blocked by Tide webform response issue SDPA-477.
      // Currently the Tide webform has no right response.
      try {
        const url = formResource + '/' + formId
        const res = await this.$tide.post(url, data)
        if (res.data) {
          return res.data
        }
        return false
      } catch (e) {
        return false
      }
    },
    isHoneypotSet (selector = `#${this.formData.tideId}-important-email`) {
      if (this.formData.settings?.spamProtect) {
        const honeypotElement = document.querySelector(selector)
        if (honeypotElement) {
          return honeypotElement.value
        }
        if (this.formData.honeypot) {
          return this.formData.honeypot
        }
      }
      return false
    },
    isMultipartForm (data) {
      return Object.keys(data).some(key => {
        const value = Array.isArray(data[key]) ? data[key] : [data[key]]

        return value.some(entry => entry instanceof File)
      })
    },
    getMultipartData (data, form = null, namespace = null) {
      let formData = form || new FormData()

      for (const key in data) {
        const property = namespace ? namespace + '[' + key + ']' : key

        if (Array.isArray(data[key])) {
          data[key].forEach(file => formData.append(property, file))
        } else if (typeof data[key] === 'object') {
          this.getMultipartData(data[key], formData, key)
        } else {
          formData.append(property, data[key])
        }
      }

      return formData
    }
  }
}

export default webform
