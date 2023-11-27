Feature: Languages

  Background:
    Given the site endpoint returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: RTL languages load with the correct font and direction
    Given the page endpoint for path "/arabic-page" returns fixture "/landingpage/languages-ar" with status 200
    When I visit the page "/arabic-page"
    Then the section ".rpl-header" should be display "rtl" in "ar" with the font "Noto Kufi Arabic"
    And the section "#rpl-main" should be display "rtl" in "ar" with the font "Noto Kufi Arabic"

  @mockserver
  Scenario: LTR languages load with the correct font and direction
    Given the page endpoint for path "/korean-page" returns fixture "/landingpage/languages-ko" with status 200
    When I visit the page "/korean-page"
    Then the section ".rpl-header" should be display "ltr" in "ko" with the font "Noto Sans KR"
    And the section "#rpl-main" should be display "ltr" in "ko" with the font "Noto Sans KR"
