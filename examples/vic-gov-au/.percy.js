module.exports = {
  'version': 1,
  'agent': {
    'asset-discovery': {
      'allowed-hostnames': [
        '*.amazee.io',
        '*.vic.gov.au'
      ],
      'request-headers': {
        'Authorization': 'Basic ' + (
          Buffer.from(`${process.env.CONTENT_API_AUTH_USER}:${process.env.CONTENT_API_AUTH_PASS}`).toString('base64')
        )
      },
      'network-idle-timeout': 5000, // ms
      'page-pool-size-min': 5, // pages
      'page-pool-size-max': 30 // pages
    },
    'percyCSS': `
      .rpl-markup__iframe-container, .rpl-card-carousel__slider {
        display: none;
      }
    `
  }
}
