<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  siteSectionName: string
  contentRatingText: string
}

withDefaults(defineProps<Props>(), {
  siteSectionName: '',
  contentRatingText: ''
})

// This is an actual webform that exists in drupal
const contentRatingFormId = 'tide_webform_content_rating'

const isMounted = ref(false)
const pageUrl = ref('')

const { data: webformData, status: webformFetchStatus } = await useFetch(
  '/api/tide/webform',
  {
    baseURL: '',
    params: {
      id: contentRatingFormId
    }
  }
)

onMounted(() => {
  isMounted.value = true
  pageUrl.value = window.location.href
})
</script>

<template>
  <div class="tide-content-rating rpl-u-screen-only">
    <div class="rpl-container">
      <div class="rpl-grid">
        <div class="rpl-col-12 rpl-col-7-m">
          <TideLandingPageWebForm
            v-if="isMounted && webformFetchStatus === 'success'"
            :formId="contentRatingFormId"
            hideFormOnSubmit
            title="Was this page helpful?"
            successMessageHTML="Thank you! Your response has been submitted."
            errorMessageHTML="We are experiencing a server error. Please try again, otherwise contact us."
            :captcha-config="webformData.captchaConfig"
          >
            <template #default="{ value }">
              <div class="tide-content-rating__rating">
                <FormKit
                  id="was_this_page_helpful_url"
                  type="RplFormHidden"
                  name="url"
                  :value="pageUrl"
                  :pii="false"
                />
                <FormKit
                  id="was_this_page_helpful_section"
                  type="RplFormHidden"
                  name="site_section_name"
                  :value="siteSectionName"
                  :pii="false"
                />
                <FormKit
                  id="was_this_page_helpful"
                  name="was_this_page_helpful"
                  type="RplFormRadioGroup"
                  label="Was this page helpful?"
                  layout="inline"
                  value=""
                  :pii="false"
                  :options="[
                    { id: 'Yes', label: 'Yes', value: 'Yes' },
                    { id: 'No', label: 'No', value: 'No' }
                  ]"
                />
              </div>
              <RplExpandable :expanded="!!value.was_this_page_helpful">
                <div class="tide-content-rating__expanded">
                  <FormKit
                    id="comments"
                    type="RplFormTextarea"
                    name="comments"
                    label="Enter your feedback"
                    :maxlength="5000"
                    :rows="4"
                    :validation="[['matches', '/^\\W*(\\w+(\\W+|$)){1,500}$/']]"
                    :validationMessages="{
                      matches: 'You must enter between 1 and 500 words'
                    }"
                  />
                  <RplContent
                    v-if="contentRatingText"
                    :html="contentRatingText"
                    class="tide-content-rating__text rpl-u-margin-b-6"
                  />
                  <FormKit
                    v-if="value.was_this_page_helpful"
                    type="RplFormActions"
                  />
                </div>
              </RplExpandable>
            </template>
          </TideLandingPageWebForm>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-content-rating {
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding-top: var(--rpl-sp-6);

  .rpl-form-alert {
    margin-bottom: var(--rpl-sp-6);
  }
}

.tide-content-rating__rating {
  margin-bottom: var(--rpl-sp-6);

  @media (--rpl-bp-s) {
    .rpl-form-label {
      float: left;
      margin: 0 var(--rpl-sp-4) 0 0;
    }

    .rpl-form-radio-group {
      --local-block-padding: 0;
    }
  }
}

.tide-content-rating__expanded {
  padding-top: var(--rpl-sp-1);
  padding-bottom: var(--rpl-sp-6);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-2);
  }

  @media (--rpl-bp-l) {
    padding-bottom: var(--rpl-sp-9);
  }
}
</style>
