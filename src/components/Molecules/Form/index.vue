<template>
  <form class="rpl-form" @submit="onSubmit" novalidate>
    <rpl-form-alert v-if="formData.formState.response" :variant="formData.formState.response.status">
      {{ formData.formState.response.message }}
    </rpl-form-alert>
    <vue-form-generator
      :schema="formData.schema"
      :model="formData.model"
      :options="formData.formOptions"
      ref="vfg"
    />
  </form>
</template>

<script>
import VueFormGenerator from 'vue-form-generator'
import RplFormAlert from './formAlert'

export { VueFormGenerator }

export default {
  name: 'RplForm',
  components: {
    'vue-form-generator': VueFormGenerator.component,
    RplFormAlert
  },
  props: {
    formData: Object,
    submitHandler: Function
  },
  data () {
    return {
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()

      // Run custom submit callback if no error in validation
      if (this.$refs.vfg.errors.length === 0) {
        this.submitHandler()
      }
    }
  }
}
</script>
