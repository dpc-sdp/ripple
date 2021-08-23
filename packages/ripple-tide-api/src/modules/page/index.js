import get from 'lodash.get'
export default {
  mapping: {
    type: ctx => ctx.type.replace('node--', ''),
    body: (ctx, utils) => utils.getBody(ctx.body.processed),
    image: function(ctx) {
      if (ctx && ctx.field_graphical_image) {
        return {
          url: get(ctx, ['field_graphical_image', 'field_media_image', 'url'])
        }
      }
    }
  },
  includes: [
    'field_whats_next',
    'field_graphical_image',
    'field_graphical_image.field_media_image'
  ]
}
