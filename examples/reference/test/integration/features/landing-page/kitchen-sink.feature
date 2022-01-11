Feature: Landing page 

  As a citizen I on a landing page I want to ensure all components load correctly

  Scenario: On load - desktop
    Given the mock server has started
    And I am using a "macbook-13" device
    And the endpoint "http://localhost:3001/tide-api/v2/site/4" returns fixture "site/reference" with status 200 
    And the endpoint "http://localhost:3001/tide-api/v2/page" with query "?path=/kitchen-sink&site=4" returns fixture "landing-page/kitchen-sink" with status 200 
    When I visit the page "/kitchen-sink"

    # Components
    Then the "rpl-card-promo" component should exist
    Then the "rpl-card-navigation" component should exist
    Then the "rpl-call-to-action" component should exist
    Then the "rpl-card-keydates" component should exist
    Then the "rpl-image-gallery" component should exist
    Then the "rpl-card-carousel" component should exist
    Then the "rpl-timeline" component should exist
    Then the "rpl-complex-image" component should exist
    Then the "rpl-data-table" component should exist
