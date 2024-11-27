declare global {
  interface Window {
    newrelic?: {
      noticeError: (error: Error) => void
    }
  }
}

const trackError = (error: Error) => {
  if (window?.newrelic?.noticeError) {
    window.newrelic.noticeError(error)
  }
}

export default trackError
