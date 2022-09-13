<script lang="ts">
export default { name: 'RplFooter' }
</script>

<script setup lang="ts">
import Acknowledgement from '../acknowledgement/acknowledgement.vue'
import TextLink from '../text-link/text-link.vue'
import VicGovLogo from './../../assets/logos/logo-victoria.svg?component'
import {
  CoreLink,
  LogoLink,
  NavSectionItem,
  RplFooterVariants,
  vicGovHomeLabel,
  vicGovHomeUrl
} from './constants'
import NavSection from './nav-section.vue'

interface Props {
  variant?: typeof RplFooterVariants[number]
  nav?: NavSectionItem[]
  links?: CoreLink[]
  logoLinks?: LogoLink[]
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  nav: () => [],
  links: () => [],
  logoLinks: () => []
})
</script>

<template>
  <footer :class="`rpl-footer rpl-footer--${variant}`">
    <div class="rpl-container">
      <nav class="rpl-footer__nav">
        <NavSection
          v-for="(navSection, i) in nav"
          :key="i"
          :section="navSection"
        />
      </nav>
    </div>
    <div class="rpl-container rpl-footer__custom-content">
      <slot name="custom-content">
        <Acknowledgement />
      </slot>
    </div>
    <div class="rpl-container">
      <div class="rpl-footer-bottom">
        <div class="rpl-footer-bottom__links">
          <ul class="rpl-footer-core-links">
            <li v-for="link in links" :key="link.url">
              <TextLink class="rpl-type-p-small" :url="link.url">{{
                link.label
              }}</TextLink>
            </li>
          </ul>
          <p class="rpl-type-p-small">
            &copy; Copyright State Government of Victoria
          </p>
        </div>
        <div class="rpl-footer-bottom__branding">
          <a
            v-for="(logoLink, index) in logoLinks"
            :key="index"
            class="rpl-footer-logo-link"
            :href="logoLink.url"
          >
            <img
              class="rpl-footer-logo-link__img"
              :src="logoLink.imgSrc"
              :alt="logoLink.label"
            />
          </a>
          <a class="rpl-footer-logo-link" :href="vicGovHomeUrl">
            <span class="rpl-u-visually-hidden">{{ vicGovHomeLabel }}</span>
            <VicGovLogo class="rpl-footer-vic-gov-logo" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style src="./footer.css" />
