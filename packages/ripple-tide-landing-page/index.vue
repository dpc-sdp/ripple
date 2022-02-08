
<template>
  <page-components :componentMapping="page.bodyComponents" />
</template>

<script>
import PageComponents from '@dpc-sdp/ripple-tide-api/src/services/utils/page-components.vue'

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
