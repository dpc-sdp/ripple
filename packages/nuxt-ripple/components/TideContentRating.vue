<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  siteSectionName: string
}

withDefaults(defineProps<Props>(), {
  siteSectionName: ''
})

// This is an actual webform that exists in drupal
const contentRatingFormId = 'tide_webform_content_rating'

const isMounted = ref(false)
const pageUrl = ref('')

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
            v-if="isMounted"
            :formId="contentRatingFormId"
            hideFormOnSubmit
            title="Was this page helpful?"
            successMessageTitle=""
            successMessageHTML="Thank you! Your response has been submitted."
            errorMessageHTML="We are experiencing a server error. Please try again, otherwise contact us."
          >
            <template #default="{ value }">
              <div class="tide-content-rating__rating">
                <FormKit type="hidden" name="url" :value="pageUrl" />
                <FormKit
                  type="hidden"
                  name="site_section_name"
                  :value="siteSectionName"
                />
                <FormKit
                  id="was_this_page_helpful"
                  name="was_this_page_helpful"
                  type="RplFormRadioGroup"
                  label="Was this page helpful?"
                  layout="inline"
                  class="wow"
                  value=""
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
                    label="Enter your comments"
                    :maxlength="5000"
                    :rows="4"
                    counter="word"
                    :counterMax="500"
                    :validation="[['matches', '/^\\W*(\\w+(\\W+|$)){1,500}$/']]"
                    :validationMessages="{
                      matches: 'You must enter between 1 and 500 words'
                    }"
                  />
                  <RplContent>
                    <p>
                      If you need a response, please use our
                      <RplLink url="/contact-us">contact us form</RplLink>.
                    </p>
                  </RplContent>
                  <FormKit type="RplFormActions" />
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
.tide-content-rating {
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding-top: var(--rpl-sp-6);
}

.tide-content-rating__rating .rpl-form-label {
  @media (--rpl-bp-m) {
    float: left;
    margin: 0;
    margin-right: var(--rpl-sp-6);
  }
}

.tide-content-rating__rating {
  margin-bottom: var(--rpl-sp-6);
}

.tide-content-rating__expanded {
  padding-top: var(--rpl-sp-1);
  padding-bottom: var(--rpl-sp-6);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-2);
    padding-bottom: var(--rpl-sp-8);
  }
}
</style>
