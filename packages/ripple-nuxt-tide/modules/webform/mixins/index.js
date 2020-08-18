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

      const data = {
        data: {
          type: formResource,
          attributes: {
            remote_addr: '0.0.0.0', // A IP placeholder for Tide validation, incase the IP is required.
            data: JSON.stringify(formData)
          }
        }
      }

      // TODO: Add better error handling/log for form API error.
      // It's blocked by Tide webform response issue SDPA-477.
      // Currently the Tide webform has no right response.
      try {
        const url = formResource + '/' + formId
        const res = await this.$tide.post(url, data)
        if (res.data) {
          return true
        }
        return false
      } catch (e) {
        return false
      }
    }
  }
}

export default webform
