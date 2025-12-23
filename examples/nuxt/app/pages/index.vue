<template>
  <RplLayout
    :background="background"
    :direction="direction"
    :language="language"
    :sideBarPlacement="sideBarPlacement"
  >
    <template #aboveHeader>
      <RplIconSprite />
    </template>
    <template #primaryNav>
      <RplPrimaryNav
        :primaryLogo="{
          altText: 'Victoria government logo',
          href: '/'
        }"
        :items="
          (site?.menus.menuMain || []).map((item) => ({
            ...item,
            id: item.uuid
          }))
        "
      >
      </RplPrimaryNav>
    </template>
    <template #breadcrumbs>
      <RplBreadcrumbs
        :items="[{ text: 'Home', url: '/' }]"
        :besideQuickExit="true"
      />
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <RplHeroHeader
        :breadcrumbs="hasBreadcrumbs"
        :behindNav="true"
        v-bind="heroHeader"
      >
        {{ heroHeader.summary }}
      </RplHeroHeader>
    </template>
    <template #body>
      <ul class="rpl-storybook__page rpl-grid">
        <RplPromoCard
          v-for="(card, idx) in cards"
          :key="idx"
          el="li"
          v-bind="card"
          class="rpl-col-4"
        >
          <template #meta>
            <RplTag variant="neutral" label="Test"></RplTag
            ><span class="rpl-card__status"
              ><RplIcon
                class="rpl-icon--colour-success"
                name="icon-check-circle-filled"
              ></RplIcon
              ><span>Open</span></span
            >
          </template>
          <RplContent :html="card.content"> </RplContent>
        </RplPromoCard>
      </ul>
    </template>
    <template #belowBody> </template>
    <template #aboveSidebar> </template>
    <template #sidebar> </template>
    <template #belowSidebar> </template>
    <template #footer>
      <RplFooter v-bind="footerProps"> </RplFooter>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import site from './../../data/site.json'

const background = 'default'
const direction = ''
const language = ''
const sideBarPlacement = 'right'

const RplFooterLinks = [
  {
    text: 'Your Services',
    url: '#services',
    items: [
      {
        text: 'Grants awards and assistance',
        url: '#'
      },
      {
        text: 'Law and safety',
        url: '#'
      },
      {
        text: 'Business and Industry',
        url: '#'
      },
      {
        text: 'Jobs and the Workplace',
        url: '#'
      },
      {
        text: 'Transport and Traffic',
        url: '#'
      },
      {
        text: 'Education',
        url: '#'
      },
      {
        text: 'Housing and Property',
        url: '#'
      },
      {
        text: 'Health',
        url: '#'
      },
      {
        text: 'Community',
        url: '#'
      },
      {
        text: 'Art, Culture and Sport',
        url: '#'
      },
      {
        text: 'Environment and Water',
        url: '#'
      }
    ]
  },
  {
    text: 'News',
    url: '#news'
  },
  {
    text: 'About VIC Government - A very long title to test wrapping behaviour',
    url: '#about',
    items: [
      {
        text: 'Grants awards and assistance',
        url: '#'
      },
      {
        text: 'Law and safety',
        url: '#'
      },
      {
        text: 'Business and Industry ',
        url: '#'
      },
      {
        text: 'Jobs and the Workplace',
        url: '#'
      },
      {
        text: 'Transport and Traffic',
        url: '#'
      },
      {
        text: 'Education',
        url: '#'
      },
      {
        text: 'Housing and Property',
        url: '#'
      },
      {
        text: 'Health',
        url: '#'
      },
      {
        text: 'Community',
        url: '#'
      },
      {
        text: 'Art, Culture and Sport',
        url: '#'
      },
      {
        text: 'Environment and Water',
        url: '#'
      }
    ]
  },
  {
    text: 'Events',
    url: '#events'
  },
  {
    text: 'Connect with us',
    url: '',
    items: [
      {
        text: 'DFFH Twitter',
        url: '#',
        icon: 'icon-x'
      },
      {
        text: 'DH Twitter',
        url: '#',
        icon: 'icon-x'
      },
      {
        text: 'DFFH LinkedIn',
        url: '#',
        icon: 'icon-linkedin'
      },
      {
        text: 'DFFH Facebook',
        url: '#',
        icon: 'icon-facebook'
      },
      {
        text: 'Youtube',
        url: '#',
        icon: 'icon-youtube'
      }
    ]
  }
]

const footerProps = {
  variant: 'default' as const,
  nav: RplFooterLinks,
  links: [
    { text: 'Privacy', url: '#' },
    { text: 'Disclaimer', url: '#' },
    { text: 'Terms of use', url: '#' },
    { text: 'Sitemap', url: '#' },
    { text: 'Accessibility Statement', url: '#' },
    { text: 'Help', url: '#' }
  ],
  credit: 'Image credit: image metadata slash credit goes here.',
  copyright: '© Copyright State Government of Victoria',
  logos: [
    {
      src: '/placeholders/logo.png',
      alt: 'Landscape',
      url: '#'
    }
  ]
}

const heroHeader = {
  title: 'Find, connect, shape your Victoria',
  summary:
    "Access grants and services, find out what's on in Victoria and have your say on government decisions.",
  links: {
    title: 'Popular searches',
    items: [
      { text: 'Jobs and careers', url: '#first' },
      { text: 'Working with Children Check', url: '#second' },
      { text: 'NDIS Worker Screening Check', url: '#third' },
      { text: 'Coronavirus: latest information', url: '#fourth' },
      { text: 'Contact the Victorian Government', url: '#fifth' }
    ]
  }
}

const cards = [
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: 'https://www.vic.gov.au/sites/default/files/2025-11/MT-D1-Home-Banner-State-Library-Promo-%281%29.jpg?width=1536',
      alt: 'test'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: 'https://www.vic.gov.au/sites/default/files/2025-11/MT-D1-Home-Banner-State-Library-Promo-%281%29.jpg?width=1536',
      alt: 'test'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: 'https://www.vic.gov.au/sites/default/files/2025-11/MT-D1-Home-Banner-State-Library-Promo-%281%29.jpg?width=1536',
      alt: 'test'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  }
]
</script>
