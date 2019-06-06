// Use this in a component `mounted` to add deprecated warning message.

const deprecate = {
  methods: {
    deprecatedWarn (description) {
      console.warn(`[Deprecation] ${description}`)
    }
  }
}

export default deprecate
