export interface TidePage extends Record<string,any> {
  title: string,
  changed: string,
  created: string,
  type: string,
  nid: number,
  _source?: Record<string,any>
}

export default {
  mapping: <Record<string,any>> {
    title: 'title',
    changed: 'changed',
    created: 'created',
    type: data => data.type && data.type.replace('node--', ''),
    nid: 'drupal_internal__nid'
  },
  includes: []
}
