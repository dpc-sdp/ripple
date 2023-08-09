Feature: Languages

  Background:
    Given the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Scenario: RTL languages load with the correct font and direction
    Given the endpoint "/api/tide/page" with query "?path=/arabic-page&site=8888" returns fixture "/landingpage/languages-ar" with status 200
    When I visit the page "/arabic-page"
    Then The section ".rpl-header" should be display "rtl" in "ar" with the font "Noto Kufi Arabic"
    And The section "#rpl-main" should be display "rtl" in "ar" with the font "Noto Kufi Arabic"

  @mockserver
  Scenario: LTR languages load with the correct font and direction
    Given the endpoint "/api/tide/page" with query "?path=/korean-page&site=8888" returns fixture "/landingpage/languages-ko" with status 200
    When I visit the page "/korean-page"
    Then The section ".rpl-header" should be display "ltr" in "ko" with the font "Noto Sans KR"
    And The section "#rpl-main" should be display "ltr" in "ko" with the font "Noto Sans KR"
