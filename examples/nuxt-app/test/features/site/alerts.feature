Feature: Site alerts

  As a user I can view important alerts at the top of each page

  @mockserver
  Scenario: Alert display
    Given the site endpoint returns fixture "/site/alerts" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"
    Then the following alerts should be displayed in this order
      | title              | icon                           | variant     | linkText  | linkUrl    |
      | Emergency title    | icon-exclamation-circle-filled | error       | Test link | /demo-link |
      | Fire title         | icon-fire                      | error       | Test link | /demo-link |
      | Medical title      | icon-medical                   | error       | Test link | /demo-link |
      | Flood title        | icon-flood                     | error       | Test link | /demo-link |
      | Lightning title    | icon-lightning                 | warning     | Test link | /demo-link |
      | Pollution title    | icon-smoke                     | warning     | Test link | /demo-link |
      | Heat wave title    | icon-temperature               | warning     | Test link | /demo-link |
      | Demo alert title   | icon-information-circle-filled | information | Test link | /demo-link |
      | Traffic title      | icon-traffic                   | information | Test link | /demo-link |
      | Notification title | icon-information-circle-filled | information | Test link | /demo-link |

  @mockserver
  Scenario: Cookie set on load
    Given the 'dismissed alert cookie' has been set with the following ids
      | id      |
      | ALERT_3 |
      | ALERT_5 |
      | ALERT_8 |
      | ALERT_9 |

    Given the site endpoint returns fixture "/site/alerts" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"

    Then the following alerts should be displayed in this order
      | title              | icon                           | variant     | linkText  | linkUrl    |
      | Emergency title    | icon-exclamation-circle-filled | error       | Test link | /demo-link |
      | Medical title      | icon-medical                   | error       | Test link | /demo-link |
      | Flood title        | icon-flood                     | error       | Test link | /demo-link |
      | Lightning title    | icon-lightning                 | warning     | Test link | /demo-link |
      | Demo alert title   | icon-information-circle-filled | information | Test link | /demo-link |
      | Notification title | icon-information-circle-filled | information | Test link | /demo-link |

  @mockserver
  Scenario: User dismisses alert
    Given the site endpoint returns fixture "/site/alerts" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"

    When the user dismisses the alert with ID "ALERT_2"
    When the user dismisses the alert with ID "ALERT_5"
    When the user dismisses the alert with ID "ALERT_1"
    When the user dismisses the alert with ID "ALERT_8"
    When the user dismisses the alert with ID "ALERT_7"

    Then the following alerts should be displayed in this order
      | title              | icon                           | variant     | linkText  | linkUrl    |
      | Medical title      | icon-medical                   | error       | Test link | /demo-link |
      | Flood title        | icon-flood                     | error       | Test link | /demo-link |
      | Heat wave title    | icon-temperature               | warning     | Test link | /demo-link |
      | Traffic title      | icon-traffic                   | information | Test link | /demo-link |
      | Notification title | icon-information-circle-filled | information | Test link | /demo-link |

    Then the 'dismissed alert cookie' should be set with the following ids
      | id      |
      | ALERT_2 |
      | ALERT_5 |
      | ALERT_1 |
      | ALERT_8 |
      | ALERT_7 |

  @mockserver
  Scenario: Cookie set on load and user dismisses alert
    Given the 'dismissed alert cookie' has been set with the following ids
      | id      |
      | ALERT_3 |
      | ALERT_5 |
      | ALERT_8 |
      | ALERT_9 |

    Given the site endpoint returns fixture "/site/alerts" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"

    When the user dismisses the alert with ID "ALERT_6"
    When the user dismisses the alert with ID "ALERT_2"

    Then the following alerts should be displayed in this order
      | title              | icon                           | variant     | linkText  | linkUrl    |
      | Flood title        | icon-flood                     | error       | Test link | /demo-link |
      | Lightning title    | icon-lightning                 | warning     | Test link | /demo-link |
      | Demo alert title   | icon-information-circle-filled | information | Test link | /demo-link |
      | Notification title | icon-information-circle-filled | information | Test link | /demo-link |

    Then the 'dismissed alert cookie' should be set with the following ids
      | id      |
      | ALERT_3 |
      | ALERT_5 |
      | ALERT_8 |
      | ALERT_9 |
      | ALERT_6 |
      | ALERT_2 |

  @mockserver
  Scenario: More details link
    Given the site endpoint returns fixture "/site/alerts" with status 200
    And the page endpoint for path "/" returns fixture "/landingpage/home" with status 200
    Given I visit the page "/"

    Then clicking the more details link for the alert with ID "ALERT_2" should take me to "/demo-link"
