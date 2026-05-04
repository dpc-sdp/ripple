<template>
  <RplLayout>
    <template #aboveHeader>
      <RplIconSprite />
      <RplAlert
        alertId="alert"
        message="This is an informational alert"
        :isDismissible="false"
      />
    </template>
    <template #primaryNav>
      <RplPrimaryNav
        :primaryLogo="{ altText: 'Logo', href: '/' }"
        :items="primaryNav"
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
      <RplIntroHeader v-bind="introHeader">
        <RplContent>{{ introHeader.content }}</RplContent>
      </RplIntroHeader>
    </template>
    <template #body>
      <ul class="rpl-grid rpl-u-margin-b-12">
        <RplPromoCard
          v-for="(card, idx) in cards"
          :key="idx"
          el="li"
          v-bind="card"
          class="rpl-col-12 rpl-col-6-m rpl-col-4-l"
        >
          <template #meta>
            <RplTag variant="neutral" label="Topic" />
            <RplIcon colour="success" name="icon-check-circle-filled" />
            <span>Open</span>
          </template>
          <RplContent :html="card.content" />
        </RplPromoCard>
      </ul>
      <RplCardCarousel :items="carouselItems" :perView="3" />
    </template>
    <template #belowBody>
      <RplSecondaryCampaign v-bind="secondaryCampaign">
        <RplContent :html="secondaryCampaign.content" />
      </RplSecondaryCampaign>
    </template>
    <template #aboveSidebar> </template>
    <template #sidebar> </template>
    <template #belowSidebar> </template>
    <template #footer>
      <RplFooter :nav="footerNav" :links="footerLinks" />
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
import { primaryNav, footerNav, footerLinks } from './../../data/nav'

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
      { text: 'Contact the Victorian Government', url: '#fourth' }
    ]
  }
}

const introHeader = {
  iconName: 'icon-information-circle-filled',
  title: 'Free family fun and public transport these school holidays',
  content:
    'Victorian families can enjoy an exciting range of free activities these school holidays.',
  links: {
    title: 'Want to know more',
    items: [
      { text: 'First links', url: '#first', icon: 'icon-arrow-right' },
      { text: 'Second link', url: '#second', icon: 'icon-arrow-right' },
      { text: 'A third link', url: '#third', icon: 'icon-arrow-right' }
    ]
  }
}

const secondaryCampaign = {
  title: 'Example campaign banner title',
  content:
    '<p>In do dolore dolore sint ipsum est est, commodo ex laborum Lorem ut deserunt dolore ullamco.</p>',
  link: { text: 'Campaign link', url: '#' },
  image: {
    src: 'image.jpg',
    alt: 'Image alt text'
  }
}

const cards = [
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: '/image.jpg',
      alt: 'image'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: '/image.jpg',
      alt: 'image'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  },
  {
    url: 'https://www.vic.gov.au',
    title: 'Small Business Ventilation Program',
    image: {
      src: '/image.jpg',
      alt: 'image'
    },
    content:
      '<p>Funding for public-facing small businesses to purchase equipment and upgrades to improve ventilation and reduce the spread of COVID-19 and boost customer confidence.</p>'
  }
]

const carouselItems = [
  {
    type: 'promo',
    title: 'Small Business Ventilation Program',
    url: '#',
    summary: 'Funding to help small businesses improve ventilation.',
    meta: { topic: 'Grants' }
  },
  {
    type: 'promo',
    title: 'Working with Children Check',
    url: '#',
    summary: 'Apply for or renew your Working with Children Check.',
    meta: { topic: 'Safety' }
  },
  {
    type: 'promo',
    title: 'Jobs Victoria',
    url: '#',
    summary: 'Find employment opportunities and career development support.',
    meta: { topic: 'Jobs' }
  },
  {
    type: 'promo',
    title: 'Transport for Victoria',
    url: '#',
    summary: 'Plan your journey with real-time transport information.',
    meta: { topic: 'Transport' }
  }
]
</script>
