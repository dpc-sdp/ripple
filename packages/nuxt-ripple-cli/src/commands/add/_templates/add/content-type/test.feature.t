---
to: "<%= locals.createTests ? `${cypressPath}/e2e/${h.changeCase.kebabCase(name)}/${h.changeCase.kebabCase(name)}.feature` : null %>"
---

Feature: <%= name %> page

  Background:
    Given the endpoint "/api/tide/page" with query "?path=/sample-<%= h.changeCase.kebabCase(name) %>&site=8888" returns fixture "/<%= h.changeCase.kebabCase(name) %>/sample-<%= h.changeCase.kebabCase(name) %>" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200
    When I visit the page "/sample-<%= h.changeCase.kebabCase(name) %>"

  @mockserver
  Scenario: On load
    Then the title should be "Sample <%= name %>"
