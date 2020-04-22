Feature: GTM

  As a site admin I need to ensure that Google Tag Manager is installed on the site and Google Anlytics is capturing page views
  
  Scenario: GTM is installed on page
    Given I visit the page "/"
    Then the GTM script should be installed with id "GTM-T5283GW"
  
  # @stubga
  # Scenario: Google analytics page view fires
    # Given I click the link "Contact us"
    # Then the google analytics tracking request should be made