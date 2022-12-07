<script setup lang="ts">
import { useRuntimeConfig, useFetch } from '#imports'
import { FormKitSchemaNode } from '@formkit/core'
import { $fetch } from 'ohmyfetch'
import { ref } from 'vue'

const props =
  defineProps<{
    formId: string
    successMessageHTML: string
    errorMessageHTML: string
    schema: Array<FormKitSchemaNode>
  }>()

/**
 * Post form data to Tide API
 * @param {string} formId - webform Id
 * @param {Object} formData - form data
 */
const postForm = async (formId, formData = {}) => {
  const { public: config } = useRuntimeConfig()

  const formResource = 'webform_submission'

  const body = {
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
  const url = `api/tide/${formResource}/${formId}`
  const { data, error } = await $fetch(url, {
    method: 'POST',
    baseURL: config.API_URL || '',
    body,
    params: {
      site: config.tide.contentApi.site
    },
    headers: {
      'Content-Type': 'application/vnd.api+json;charset=UTF-8'
    }
  })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('Form submission failed')
  }

  return true
}

const submissionState = ref({
  status: 'idle',
  title: '',
  message: ''
})

const submitHandler = async (values) => {
  submissionState.value = {
    status: 'submitting',
    title: '',
    message: ''
  }
  try {
    await postForm(props.formId, values)

    submissionState.value = {
      status: 'success',
      title: 'Form submitted',
      message: props.successMessageHTML
    }
  } catch (error) {
    console.error(error)

    submissionState.value = {
      status: 'error',
      title: 'Form not submitted',
      message: props.errorMessageHTML
    }
  }
}
</script>

<template>
  <RplForm
    :schema="schema"
    :submissionState="submissionState"
    @submit="submitHandler"
  />
</template>
