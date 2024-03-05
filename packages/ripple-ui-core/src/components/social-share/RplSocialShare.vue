<script setup lang="ts">
import { computed } from 'vue'
import { IRplSocialShareEmail, RplSocialShareNetworks } from './constants'
import RplSocialShareLink from './RplSocialShareLink.vue'
import RplSocialShareEmail from './RplSocialShareEmail.vue'

interface Props {
  title?: string
  networks?: string[]
  pagetitle: string
  url: string // url to be determined by caller
  email?: IRplSocialShareEmail
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Share this page',
  networks: () => ['Facebook', 'LinkedIn', 'X'],
  email: undefined
})

// Check that network has a template in constants
const validNetworks = computed(() =>
  props.networks.filter((k) => Object.keys(RplSocialShareNetworks).includes(k))
)
const hasEmail = computed(() => props.email?.subject && props.email?.body)
</script>

<template>
  <div v-if="pagetitle && url" class="rpl-social-share rpl-u-screen-only">
    <h3 v-if="title" class="rpl-social-share__title rpl-type-label-large">
      {{ title }}
    </h3>
    <div class="rpl-social-share__items">
      <RplSocialShareLink
        v-for="network in validNetworks"
        :key="network.toLowerCase()"
        :network="network"
        :title="pagetitle"
        :label="title"
        :url="url"
      />
      <RplSocialShareEmail
        v-if="hasEmail"
        :title="pagetitle"
        :subject="email.subject"
        :body="email.body"
        :label="title"
        :url="url"
      />
    </div>
  </div>
</template>

<style src="./RplSocialShare.css" />
