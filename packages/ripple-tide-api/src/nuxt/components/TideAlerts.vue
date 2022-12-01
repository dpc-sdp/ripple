<template>
  <RplAlertsContainer data-cy="alerts-container">
    <RplAlert
      v-for="alert in filteredAlerts"
      :key="alert.alertId"
      data-cy="alert"
      :data-alert-id="alert.alertId"
      v-bind="alert"
      @dismiss="handleDismiss"
    />
  </RplAlertsContainer>
</template>

<script setup lang="ts">
// @ts-ignore
import { useCookie } from '#imports'
import { computed, toRaw } from 'vue'
import { TideAlert } from '../../mapping/alerts/site-alerts-mapping'
import sortAlertsByPriority from '../../utils/sortAlertsByPriority'

interface Props {
  siteAlerts: TideAlert[]
}

const props = withDefaults(defineProps<Props>(), {
  siteAlerts: () => []
})

const DISMISSED_ALERTS_COOKIE = 'dismissedAlerts'
const ONE_DAY_IN_SECONDS = 86400
const cookieValue = useCookie(DISMISSED_ALERTS_COOKIE, {
  maxAge: ONE_DAY_IN_SECONDS
})

const filteredAlerts = computed(() => {
  const alerts: TideAlert[] = props.siteAlerts

  try {
    const sortedAlerts = sortAlertsByPriority(alerts)

    const dismissedIds = toRaw(cookieValue.value) || []

    return sortedAlerts.filter((alert: TideAlert) => {
      return !dismissedIds.includes(alert.alertId)
    })
  } catch (e) {
    console.error(
      'Something went wrong when trying to get dismissed alerts cookie'
    )

    // Return all the alerts if there is an error to be safe
    return alerts
  }
})

const handleDismiss = (dismissedId) => {
  const dismissedIds = toRaw(cookieValue.value) || []

  // Update the cookie with dismissedId removed
  const idSet = new Set(dismissedIds)
  idSet.add(dismissedId)
  cookieValue.value = Array.from(idSet)
}
</script>
