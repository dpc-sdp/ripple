const dataLayer = {
  mounted () {
    if (!this.$gtm) return
    if (!this.page) return

    if (this.page.field_department_agency?.name) {
      this.$gtm.push({ 'department': this.page.field_department_agency.name })
    }
  }
}

export default dataLayer
