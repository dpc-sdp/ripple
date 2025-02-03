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
    <ul class="rpl-social-share__items">
      <li
        v-for="network in validNetworks"
        :key="network.toLowerCase()"
        class="rpl-social-share__item"
      >
        <RplSocialShareLink
          :network="network"
          :title="pagetitle"
          :label="title"
          :url="url"
        />
      </li>
      <li v-if="hasEmail" class="rpl-social-share__item">
        <RplSocialShareEmail
          :title="pagetitle"
          :subject="email.subject"
          :body="email.body"
          :label="title"
          :url="url"
        />
      </li>
    </ul>
  </div>
</template>

<style src="./RplSocialShare.css" />
