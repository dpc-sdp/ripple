
<template>
  <page-components :componentMapping="page.bodyComponents" />
</template>

<script>
import PageComponents from './page-components.vue'

export default {
  components: {
    PageComponents
  },
  name: 'landing-page',
  props: {
    page: {
      type: Object
    }
  }
}
</script>
