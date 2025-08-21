;(function () {
  if (typeof window === 'undefined') return

  const searchParams = new URLSearchParams(window.location.search)

  function updateParentHeight() {
    const height = document.body.scrollHeight
    const isModal =
      document.body.classList.contains('rpl-modal-open') ||
      document.body.classList.contains('rpl-u-viewport-locked')

    if (isModal) return

    window.parent.postMessage(
      JSON.stringify({
        id: searchParams.get('id'),
        uid: Number(searchParams.get('uid')),
        iframeSize: height
      }),
      '*'
    )
  }

  function trackDocumentUpdates() {
    const resizeObserver = new ResizeObserver(updateParentHeight)

    resizeObserver.observe(document.body)
  }

  window.addEventListener('load', trackDocumentUpdates, {
    once: true
  })
})()
