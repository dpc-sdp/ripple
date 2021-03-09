module.exports = {
  // Include config is used for Tide API query relationship.
  // Learn more on https://www.drupal.org/docs/8/modules/jsonapi/includes
  include: {
    // `movie` is the Drupal node content type id.
    // If the Drupal content type id contains multiple words like `scifi_movie`,
    // then it need to be converted to camel case `scifiMovie` here.
    movie: [
      'field_a',
      'field_b',
      'field_c'
      // ...
    ]
  }
}
