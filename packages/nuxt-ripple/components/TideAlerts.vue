<template>
  <RplAlertsContainer data-cy="alerts-container">
    <RplAlert
      v-if="showDraftAlert"
      message="Draft only and not yet published"
      alert-id="shared-preview-alert"
      @dismiss="dismissDraftAlert"
    />
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
import { useMounted } from '@vueuse/core'
import { useCookie } from '#imports'
import { computed, ref, toRaw } from 'vue'
import { TideAlert } from '@dpc-sdp/ripple-tide-api/src/mapping/alerts/site-alerts-mapping'

interface Props {
  draftAlert?: boolean
  siteAlerts: TideAlert[]
}

const props = withDefaults(defineProps<Props>(), {
  draftAlert: false,
  siteAlerts: () => []
})

const isMounted = useMounted()

const DISMISSED_ALERTS_COOKIE = 'dismissedAlerts'
const ONE_DAY_IN_SECONDS = 86400
const cookieValue = useCookie(DISMISSED_ALERTS_COOKIE, {
  maxAge: ONE_DAY_IN_SECONDS
})

const dismissedDraftAlert = ref(false)

const showDraftAlert = computed(
  () => props.draftAlert && !dismissedDraftAlert.value
)

const dismissDraftAlert = () => (dismissedDraftAlert.value = true)

const filteredAlerts = computed(() => {
  const alerts: TideAlert[] = props.siteAlerts

  // If we are rendering on the server, it's important not to filter the alerts.
  // i.e. all alerts must be rendered on the server.
  //
  // There are two reasons for this:
  // 1. Users without Javascript should be able to view all alerts
  // 2. Because the site is heavily cached, filtering on the server could cause a specific users
  //    preferences to be cached for all users.
  if (!isMounted.value) {
    return alerts
  }

  try {
    const dismissedIds = toRaw(cookieValue.value) || []

    return alerts.filter((alert: TideAlert) => {
      return !dismissedIds.includes(alert.alertId)
    })
  } catch (e) {
    trackError(e)
    console.error(
      'Something went wrong when trying to get dismissed alerts cookie'
    )

    // Return all the alerts if there is an error to be safe
    return alerts
  }
})

const handleDismiss = (payload) => {
  const dismissedIds = toRaw(cookieValue.value) || []

  // Update the cookie with dismissedId removed
  const idSet = new Set(dismissedIds)
  idSet.add(payload.id)
  cookieValue.value = Array.from(idSet)
}
</script>
