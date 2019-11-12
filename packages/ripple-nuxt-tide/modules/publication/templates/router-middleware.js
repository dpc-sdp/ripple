export default function ({ app }) {
  const printWindow = function (to, from) {
    if (process.client && to.name === 'publication-print-all') {
      setTimeout(function() {
        window.print()
      }, 3000)
    }
  }
  if (!app.router.afterHooks.map(func => func.name).includes('printWindow')) {
    app.router.afterHooks.push(printWindow)
  }
}