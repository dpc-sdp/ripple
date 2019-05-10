let id = 0

const uniqueid = {
  data: function () {
    return {
      localRegister: {}
    }
  },
  methods: {
    getGlobalUniqueId () {
      return id++
    },
    getIdFromLocalRegistry (index) {
      if (this.localRegister[index] === undefined) {
        this.localRegister[index] = this.getGlobalUniqueId()
      }
      return this.localRegister[index]
    }
  }
}

export default uniqueid
