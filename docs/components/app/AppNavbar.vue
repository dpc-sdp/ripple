<script lang="ts" setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const headerRef = ref()
const { activate: activateFocusTrap, deactivate: deactivateFocusTrap } =
  useFocusTrap(headerRef)

const route = useRoute()
const { title, sections } = useAppConfig()

const sectionSlug = route.params.slug[0]
const sectionConfig = sections[sectionSlug as keyof typeof sections]

const sectionTitle = sectionConfig?.title || title
const sectionColor = sectionConfig?.color || undefined

const isMenuOpen = ref(false)

const handleCloseMenu = () => {
  isMenuOpen.value = false
}

const handleToggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const escapeKeyHandler = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    handleCloseMenu()
  }
}

watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    activateFocusTrap()
    document.body.classList.add('rpl-u-viewport-locked')
    window.scroll(0, 0)
  } else {
    deactivateFocusTrap()
    document.body.classList.remove('rpl-u-viewport-locked')
  }
})

onMounted(() => {
  window.addEventListener('keydown', escapeKeyHandler, false)
})

onUnmounted(() => {
  window.removeEventListener('keydown', escapeKeyHandler, false)
  deactivateFocusTrap()
  document.body.classList.remove('rpl-u-viewport-locked')
})
</script>

<template>
  <header
    class="docs-header"
    :style="{ '--docs-header-color': sectionColor }"
    ref="headerRef"
  >
    <div class="docs-header-top">
      <div class="rpl-container">
        <div class="docs-header-inner">
          <NuxtLink
            aria-current="page"
            to="/"
            class="docs-header-logo rpl-u-focusable-outline"
          >
            <img
              src="/img/vicgovau-logo.svg"
              width="106"
              alt="Victoria government logo"
            />
          </NuxtLink>

          <span class="docs-header-title">
            {{ sectionTitle }}
          </span>
        </div>
      </div>
    </div>
    <div class="docs-header-bottom">
      <div class="rpl-container">
        <div class="docs-header-bottom-inner">
          <button
            class="docs-header-link rpl-u-focusable-inline"
            @click="handleToggleMenu"
            v-if="sectionSlug"
          >
            Menu
            <RplIcon
              class="docs-header-link-icon"
              name="icon-chevron-down"
              size="xs"
            />
          </button>
        </div>
      </div>
    </div>
    <div
      class="docs-header-menu"
      v-if="isMenuOpen"
      :style="{
        '--local-vertical-nav-background': 'transparent',
        '--local-vertical-nav-item-gutter': 'var(--rpl-sp-3)',
        '--local-vertical-nav-hover-bg': 'var(--rpl-clr-neutral-300)'
      }"
    >
      <div class="docs-header-menu-inner">
        <slot name="menuContents" />
      </div>
    </div>
  </header>
</template>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-header {
  --docs-header-color: var(--rpl-clr-primary);
}

.docs-header-top {
  background: var(--docs-header-color);
  color: var(--rpl-clr-light);
}

.docs-header-inner {
  display: flex;
  align-items: center;
  height: 60px;
}

.docs-header-logo img {
  display: block;
  height: 16px;
  width: 106px;
}

.docs-header-title {
  margin-left: var(--rpl-sp-4);
  padding-left: var(--rpl-sp-4);
  border-left: var(--rpl-border-2) solid var(--rpl-clr-light);
  font-weight: 700;
  height: var(--rpl-sp-6);
  display: flex;
  align-items: center;

  font-size: 13px;
  line-height: 13px;

  @media (--rpl-bp-l) {
    font-size: 16px;
    line-height: 16px;
  }
}

.docs-header-bottom {
  background: var(--rpl-clr-neutral-100);
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);

  @media (--rpl-bp-l) {
    display: none;
  }
}

.docs-header-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
}

.docs-header-link {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  line-height: 14px;
}

.docs-header-link-icon {
  margin-left: var(--rpl-sp-2);
}

.docs-header-menu {
  @media (--rpl-bp-l) {
    display: none;
  }

  overflow-y: auto;
  background: var(--rpl-clr-neutral-100);
  padding: var(--rpl-sp-4) var(--rpl-sp-3) var(--rpl-sp-5);
  position: fixed;
  top: 101px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
}

.docs-header-menu-inner {
  max-width: 400px;
  margin: 0 auto;
}
</style>
