import { defineCustomElement } from 'vue'

import { default as RplAccordionCmp } from './components/accordion/accordion.vue'
import { default as RplAcknowledgementCmp } from './components/acknowledgement/acknowledgement.vue'
import { default as RplAlertCmp } from './components/alert/alert.vue'
import { default as RplBreadcrumbsCmp } from './components/breadcrumbs/breadcrumbs.vue'
import { default as RplButtonCmp } from './components/button/button.vue'
import { default as RplCardCmp } from './components/card/card.vue'
import { default as RplAvatarCardCmp } from './components/card/avatar-card.vue'
import { default as RplCallToActionCardCmp } from './components/card/call-to-action.vue'
import { default as RplCategoryGridCardCmp } from './components/card/category-grid-card.vue'
import { default as RplKeyDatesCardCmp } from './components/card/key-dates-card.vue'
import { default as RplNavCardCmp } from './components/card/nav-card.vue'
import { default as RplPromoCardCmp } from './components/card/promo-card.vue'
import { default as RplChipCmp } from './components/chip/chip.vue'
import { default as RplContactUsCmp } from './components/contact-us/contact-us.vue'
import { default as RplContentCmp } from './components/content/content.vue'
import { default as RplDocumentCmp } from './components/document/document.vue'
import { default as RplIconCmp } from './components/icon/icon.vue'
import { default as RplIconSpriteCmp } from './components/icon/sprite.vue'
import { default as RplInPageNavigationCmp } from './components/in-page-navigation/in-page-navigation.vue'
import { default as RplListCmp } from './components/list/list.vue'
import { default as RplNavPrimaryCmp } from './components/nav-primary/nav-primary.vue' // WIP
import { default as RplProfileCmp } from './components/profile/profile.vue'
import { default as RplRelatedLinksCmp } from './components/related-links/related-links.vue'
import { default as RplSocialShareCmp } from './components/social-share/social-share.vue'
import { default as RplTagCmp } from './components/tag/tag.vue'
import { default as RplTextLinkCmp } from './components/text-link/text-link.vue'
import { default as RplTimelineCmp } from './components/timeline/timeline.vue'
import { default as RplVerticalNavCmp } from './components/vertical-nav/vertical-nav.vue'
import { default as RplVerticalNavToggleCmp } from './components/vertical-nav/toggle.vue'
import { default as RplVerticalNavChildListCmp } from './components/vertical-nav/child-list.vue'
import { default as RplVerticalNavLinkCmp } from './components/vertical-nav/link.vue'

// register custom el
const RplAccordion = defineCustomElement(RplAccordionCmp)
const RplAcknowledgement = defineCustomElement(RplAcknowledgementCmp)
const RplAlert = defineCustomElement(RplAlertCmp)
const RplBreadcrumbs = defineCustomElement(RplBreadcrumbsCmp)
const RplButton = defineCustomElement(RplButtonCmp)
const RplCard = defineCustomElement(RplCardCmp)
const RplAvatarCard = defineCustomElement(RplAvatarCardCmp)
const RplCallToActionCard = defineCustomElement(RplCallToActionCardCmp)
const RplCategoryGridCard = defineCustomElement(RplCategoryGridCardCmp)
const RplKeyDatesCard = defineCustomElement(RplKeyDatesCardCmp)
const RplNavCard = defineCustomElement(RplNavCardCmp)
const RplPromoCard = defineCustomElement(RplPromoCardCmp)
const RplChip = defineCustomElement(RplChipCmp)
const RplContactUs = defineCustomElement(RplContactUsCmp)
const RplContent = defineCustomElement(RplContentCmp)
const RplDocument = defineCustomElement(RplDocumentCmp)
const RplIcon = defineCustomElement(RplIconCmp)
const RplIconSprite = defineCustomElement(RplIconSpriteCmp)
const RplInPageNavigation = defineCustomElement(RplInPageNavigationCmp)
const RplList = defineCustomElement(RplListCmp)
const RplNavPrimary = defineCustomElement(RplNavPrimaryCmp)
const RplProfile = defineCustomElement(RplProfileCmp)
const RplRelatedLinks = defineCustomElement(RplRelatedLinksCmp)
const RplSocialShare = defineCustomElement(RplSocialShareCmp)
const RplTag = defineCustomElement(RplTagCmp)
const RplTextLink = defineCustomElement(RplTextLinkCmp)
const RplTimeline = defineCustomElement(RplTimelineCmp)
const RplVerticalNav = defineCustomElement(RplVerticalNavCmp)
const RplVerticalNavToggle = defineCustomElement(RplVerticalNavToggleCmp)
const RplVerticalNavChildList = defineCustomElement(RplVerticalNavChildListCmp)
const RplVerticalNavLink = defineCustomElement(RplVerticalNavLinkCmp)

// export each wc
export { RplAccordion }
export { RplAcknowledgement }
export { RplAlert }
export { RplBreadcrumbs }
export { RplButton }
export { RplCard }
export { RplAvatarCard }
export { RplCallToActionCard }
export { RplCategoryGridCard }
export { RplKeyDatesCard }
export { RplNavCard }
export { RplPromoCard }
export { RplChip }
export { RplContactUs }
export { RplContent }
export { RplDocument }
export { RplIcon }
export { RplIconSprite }
export { RplInPageNavigation }
export { RplList }
export { RplNavPrimary }
export { RplProfile }
export { RplRelatedLinks }
export { RplSocialShare }
export { RplTag }
export { RplTextLink }
export { RplTimeline }
export { RplVerticalNav }
export { RplVerticalNavToggle }
export { RplVerticalNavChildList }
export { RplVerticalNavLink }

// export register function for all webcomponents
export function registerRplWebComponents() {
  customElements.define('rpl-accordion', RplAccordion)
  customElements.define('rpl-acknowledgement', RplAcknowledgement)
  customElements.define('rpl-alert', RplAlert)
  customElements.define('rpl-breadcrumbs', RplBreadcrumbs)
  customElements.define('rpl-button', RplButton)
  customElements.define('rpl-card', RplCard)
  customElements.define('rpl-avatar-card', RplAvatarCard)
  customElements.define('rpl-call-to-action-card', RplCallToActionCard)
  customElements.define('rpl-category-grid-card', RplCategoryGridCard)
  customElements.define('rpl-key-dates-card', RplKeyDatesCard)
  customElements.define('rpl-nav-card', RplNavCard)
  customElements.define('rpl-promo-card', RplPromoCard)
  customElements.define('rpl-chip', RplChip)
  customElements.define('rpl-contact-us', RplContactUs)
  customElements.define('rpl-content', RplContent)
  customElements.define('rpl-document', RplDocument)
  customElements.define('rpl-icon', RplIcon)
  customElements.define('rpl-icon-sprite', RplIconSprite)
  customElements.define('rpl-in-page-navigation', RplInPageNavigation)
  customElements.define('rpl-list', RplList)
  customElements.define('rpl-nav-primary', RplNavPrimary)
  customElements.define('rpl-profile', RplProfile)
  customElements.define('rpl-related-links', RplRelatedLinks)
  customElements.define('rpl-social-share', RplSocialShare)
  customElements.define('rpl-tag', RplTag)
  customElements.define('rpl-text-link', RplTextLink)
  customElements.define('rpl-timeline', RplTimeline)
  customElements.define('rpl-vertical-nav', RplVerticalNav)
  customElements.define('rpl-vertical-nav-toggle', RplVerticalNavToggle)
  customElements.define('rpl-vertical-nav-child-list', RplVerticalNavChildList)
  customElements.define('rpl-vertical-nav-link', RplVerticalNavLink)
}
