<script setup lang="ts">
import { FormKitSchemaNode } from '@formkit/core'
import { computed, nextTick, ref, watch } from 'vue'
import type { MappedCaptchaConfig } from '@dpc-sdp/ripple-tide-webform/types'

interface Props {
  title?: string
  formId: string
  hideFormOnSubmit: boolean
  successMessageTitle?: string
  successMessageHTML: string
  errorMessageTitle?: string
  errorMessageHTML: string
  schema?: Array<FormKitSchemaNode>
  captchaConfig?: MappedCaptchaConfig | null
}

const props = withDefaults(defineProps<Props>(), {
  title: undefined,
  hideFormOnSubmit: false,
  successMessageTitle: 'Form submitted',
  errorMessageTitle: 'Form not submitted',
  schema: undefined,
  captchaConfig: null
})

const honeypotId = `${props.formId}-important-email`

const { submissionState, submitHandler } = useWebformSubmit(
  props.formId,
  props.captchaConfig
)

const { resetCaptcha } = useCaptchaWidget(props.formId, props.captchaConfig)

const serverSuccessRef = ref(null)

// Scroll to and focus on success and error messages when they appear
watch(
  () => submissionState.value.status,
  async (newStatus, oldStatus) => {
    if (oldStatus === 'submitting' && newStatus === 'success') {
      await nextTick()
      if (serverSuccessRef.value) {
        serverSuccessRef.value.focus()
      }

      // Need to reset captcha because some captchas won't allow using the same captcha challenge token twice
      resetCaptcha()
    }
  }
)

const submitted = computed(() => submissionState.value.status === 'success')

import { FormKitPlugin, FormKitTypeDefinition } from '@formkit/core'
import {
  createRplFormInput,
  defaultRplFormInputProps,
  inputLibrary,
  rplFeatures
} from '@dpc-sdp/ripple-ui-forms'

const appConfig = useAppConfig()?.ripple as { customInputs: any }
const customInputDefs = appConfig.customInputs || {}

const customInputs: FormKitPlugin = () => {}
customInputs.library = (node: any) => {
  Object.values(customInputDefs).forEach((item: any) => {
    if (node.props.type === item.id) {
      const def: FormKitTypeDefinition = {
        schema: createRplFormInput({
          $cmp: item.id,
          props: {
            ...defaultRplFormInputProps,
            type: item.type
          }
        }),
        library: {
          [item.id]: resolveComponent(item.id),
          ...inputLibrary
        },
        ...item.formkitDefProps,
        features: rplFeatures
      }
      return node.define(def)
    }
  })
}
</script>

<template>
  <div
    :style="{
      '--local-max-width': '595px'
    }"
  >
    <RplFormAlert
      v-if="hideFormOnSubmit && submitted"
      ref="serverSuccessRef"
      status="success"
      :title="submissionState.title"
      data-component-type="form-server-message"
      :restrictWidth="true"
    >
      <template #default>
        <RplContent :html="submissionState.message" />
      </template>
    </RplFormAlert>
    <div v-show="!submitted || (submitted && !hideFormOnSubmit)">
      <RplForm
        :id="formId"
        :title="title"
        :customInputs="customInputs"
        :schema="schema"
        :submissionState="submissionState as any"
        @submit="submitHandler(props, $event.data)"
      >
        <template #belowForm>
          <div class="tide-webform-important-email">
            <label :for="honeypotId">Important email</label>
            <input :id="honeypotId" type="text" autocomplete="off" />
          </div>
        </template>
        <template #default="{ value }">
          <slot :value="value" />
        </template>
      </RplForm>
    </div>
  </div>
</template>

<style>
.tide-webform-important-email {
  display: none !important;
  visibility: hidden !important;
}
</style>
