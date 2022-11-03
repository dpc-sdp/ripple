<template>
  <RplLayoutSidebarComponent
    v-for="contact in mappedContacts"
    :key="contact.id"
    :data-sidebar-component-id="contact.id"
  >
    <RplContactUs
      :title="contact.title"
      :address="contact.address"
      :items="contact.items"
    />
  </RplLayoutSidebarComponent>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  TideAddress,
  TideContact
} from '../../../mapping/sidebar-contacts/sidebar-contacts-mapping-types'

interface Props {
  contacts: TideContact[]
}

const props = withDefaults(defineProps<Props>(), {
  contacts: () => []
})

const formatAddress = (address: TideAddress): string => {
  return `${address.addressLine1 ? address.addressLine1 + ',' : ''} ${
    address.addressLine2
  } ${address.locality}${address.addressLine2 || address.locality ? ', ' : ''}${
    address.administrativeArea
  } ${address.postalCode}`
}

const makeAddressLink = (address: TideAddress): string => {
  return `https://www.google.com.au/maps?q=${encodeURI(formatAddress(address))}`
}

const getSocialMediaIconByType = (type: string): string => {
  return `icon-${type}`
}

const mappedContacts = computed(() => {
  return props.contacts.map((contact) => {
    const address = {
      name: contact.contactName,
      department: contact.department,
      street: contact.postalAddress ? formatAddress(contact.postalAddress) : ''
    }

    let items: Array<{
      id: string
      icon: string
      text: string
      url: string
    }> = []

    if (contact.locationAddress) {
      items.push({
        id: `contact-us-location-${contact.id}`,
        icon: 'icon-pin',
        text: formatAddress(contact.locationAddress),
        url: makeAddressLink(contact.locationAddress)
      })
    }

    if (contact.phones) {
      ;(contact.phones || [])
        .filter((phone) => !!phone.number)
        .forEach((phone) => {
          items.push({
            id: phone.id,
            icon: 'icon-phone',
            text: `${phone.title ? phone.title + ' ' : ''}${phone.number}`,
            url: `tel:${phone.number.replace(/ /g, '')}`
          })
        })
    }

    if (contact.email) {
      items.push({
        id: `contact-us-email-${contact.id}`,
        icon: 'icon-mail',
        text: `mailto:${contact.email}`,
        url: contact.email
      })
    }

    if (contact.socialMedia) {
      ;(contact.socialMedia || []).forEach((social) => {
        items.push({
          id: social.id,
          icon: getSocialMediaIconByType(social.type),
          text: social.text,
          url: social.url
        })
      })
    }

    return {
      id: contact.id,
      title: contact.contactTitle,
      address,
      items
    }
  })
})
</script>
