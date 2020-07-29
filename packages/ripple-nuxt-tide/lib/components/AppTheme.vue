<template>
  <style v-if="variables">
    :root {
      {{variables}}
    }
  </style>
</template>

<script>
export default {
  props: {
    theme: Array
  },
  computed: {
    variables () {
      return this.theme.map(customVar => `--${customVar.key}: ${customVar.value};`).join('\n \t')
    }
  }

}
</script>
