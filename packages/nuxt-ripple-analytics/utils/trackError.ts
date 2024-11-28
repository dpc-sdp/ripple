declare global {
  interface Window {
    newrelic?: {
      noticeError: (error: any) => void
    }
  }
}

const trackError = (error: any) => {
  if (window?.newrelic?.noticeError) {
    window.newrelic.noticeError(error)
  }
}

export default trackError
