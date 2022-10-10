export default {
  title: 'title',
  created: 'created',
  modified: 'modified',
  nid: 'id',
  _src: (src) => (process.env.NODE_ENV === 'development' ? src : undefined)
}
