<template>
  <img :src="imgSrc" :alt="imgAlt" />
</template>

<script>
import objectFitImages from 'object-fit-images'

export default {
  name: 'RplFittedImg',
  props: {
    imgSrc: { type: String, required: true },
    imgAlt: { type: String }
  },
  mounted: function () {
    objectFitImages(this.$el)
  }
}
</script>
