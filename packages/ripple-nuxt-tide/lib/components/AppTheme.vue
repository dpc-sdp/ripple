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
    theme: Object
  },
  computed: {
    variables () {
      if (this.theme) {
        const customVars = this.theme.variables ? Object.keys(this.theme.variables) : []
        return customVars.map(customVar => `--${customVar}: ${this.theme.variables[customVar]};`).join('\n \t')
      }
    }
  }

}
</script>
