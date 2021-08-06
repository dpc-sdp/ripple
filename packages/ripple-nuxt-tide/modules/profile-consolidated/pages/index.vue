<template>
  <rpl-row row-gutter class="app-content tide-content tide-content--profile-consolidated">
    <rpl-col cols="full">
      <rpl-anchor-links v-if="anchorLinks" title="On this page:" :links="anchorLinks" />
      <rpl-markup v-if="page.body" :html="page.body.processed"></rpl-markup>
      <div  v-for="(item, index) of profileData" :key="index">
        {{ item.profileType }}
          <div v-for="(value, key) of item.profileSpecificFeilds" :key="key">
            {{ value.element.label }} : {{ value.element.value }}
          </div>
        </div>
    </rpl-col>
    <rpl-col v-if="page.field_show_topic_term_and_tags" cols="full">
      <app-topic-tags :topic="this.page.field_topic" :tags="this.page.field_tags" />
    </rpl-col>
  </rpl-row>
</template>

<script>
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplAnchorLinks from '@dpc-sdp/ripple-anchor-links'
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import AppTopicTags from '../../../lib/components/AppTopicTags'
import jsonapiParse from 'jsonapi-parse'
import { include } from '../../publication/tide.config'

export default {
  components: {
    RplRow,
    RplCol,
    RplMarkup,
    RplAnchorLinks,
    AppTopicTags
  },
  props: {
    page: Object,
    anchorLinks: Array
  },
  async fetch () {
    const include = this.page.field_profile_fields.field_profile_type.field_field_lables.map(itm => itm.key).join(',')
    const response = await this.$tide.get(`/paragraph/profile_type_fields/${this.page.field_profile_fields.id}`, { include: include })
    if (response) {
      this.page.profileFields = jsonapiParse.parse(response).data
    }
  },
  computed: {
    fields () {
      const _fields = this.page.field_profile_fields.field_profile_type.field_field_lables
      return _fields
    },
    profileData () {
      let profileType = ''
      let profileSpecificFeilds = []
      profileType = this.page.field_profile_fields.field_profile_type.name
      this.fields.forEach(field => {
        if (field) {
          let name = []
          var element = {}
          element.label = field.value
          if (this.page.profileFields[field.key].length > 0) {
            this.page.profileFields[field.key].forEach(value => {
              if (value) {
                name.push(value.name)
              }
            })
          } else {
            name.push(this.page.profileFields[field.key].name)
          }
          element.value = name.toString()
          profileSpecificFeilds.push({ element: element })
        }
      })
      return [{
        profileType,
        profileSpecificFeilds
      }]
    }
  }
}
</script>
