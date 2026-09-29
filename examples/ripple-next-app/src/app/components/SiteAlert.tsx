'use client'

import { RplAlert } from '@dpc-sdp/ripple-ui-react'
import { useState } from 'react'

export interface SiteAlertProps {
  id: string
  message: string
}

export default function SiteAlert(props: SiteAlertProps) {
  const [dismissed, setDismissedAlert] = useState(false)
  const handleDismissAlert = () => {
    setDismissedAlert(!dismissed)
  }
  return (
    <RplAlert
      alertId={props.id}
      linkText={props.message}
      onClose={handleDismissAlert}
      message='this is an alert'
      dismissed={dismissed}
    ></RplAlert>
  )
}
