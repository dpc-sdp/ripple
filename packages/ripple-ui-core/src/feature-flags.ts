
export type IRplFeatureFlags = {
/**
   * @description Sets the theme variant of the button component
   */
  buttonTheme?: 'neutral' | 'default'
  /**
   * @description Sets the theme variant of the header component
   */
  headerTheme?: 'neutral' | 'default'
  /**
   * @description Sets the theme variant of the site footer component
   */
  footerTheme?: 'neutral' | 'default'
  /**
   * @description Sets the display of the footer menu to one single level i.e. no children
   */
  footerMenuSingleLevel?: boolean
  /**
   * @description Disable the primary vic.gov.au logo for sites that are not co-branded
   */
  disablePrimaryLogo?: boolean
  /**
   * @description Disable the footer vic.gov.au logo for sites that are not co-branded
   */
  disableFooterLogo?: boolean
  /**
   * @deprecated content collections will no longer use app search, this feature flag will have no effect
   * @description Sets which search connector to use for content collection queries
   */
  contentCollectionSearchConnector?: 'appSearch' | 'elasticsearch'
  /**
   * @description Option to disable the display of topics and tags on all content types
   */
  disableTopicTags?: boolean
  /**
   * @description Option to disable the display of the updated date on all content types
   */
  disableUpdatedDate?: boolean
  /**
   * @description Option to disable the display of the search form within the primary navigation
   */
  disablePrimaryNavSearch?: boolean
  /**
   * @description Force multi-line links to render on a single line in the primary navigation
   */
  primaryNavNowrap?: boolean
  /**
   * @description Option to override the default URL the search for redirects to
   */
  primaryNavSearchUrl?: string
  /**
   * @description Add a login link to the primary navigation
   */
  primaryNavLogin?: {
    url: string
    text?: string
  }
  /**
   * @description Option to disable the display of coloured/rainbow stripes on top of promo cards
   */
  hidePromoCardStripe?: boolean
  /**
   * @description Sets the number of toggle-able levels
   */
  sectionNavToggleLevels?: number
  /**
   * @description Collapse inner links in breadcrumbs
   */
  breadcrumbsCollapseInnerLinks?: boolean
  /**
   * @description Remove the content rating form
   */
  disableContentRating?: boolean
  /**
   * @description Custom flags
   */
  [key: string]: any
}
