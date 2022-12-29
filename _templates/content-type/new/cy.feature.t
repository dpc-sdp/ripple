---
to: examples/nuxt-app/test/features/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.feature
---

Feature: <%= h.changeCase.sentenceCase(name) %> page

  Example of mocked page

  Background:
    Given the endpoint "/api/tide/page" with query "?path=/sample-<%= h.changeCase.paramCase(name) %>&site=8888" returns fixture "/<%= h.changeCase.paramCase(name) %>/sample-<%= h.changeCase.paramCase(name) %>" with status 200
    And the endpoint "/api/tide/site" with query "?id=8888" returns fixture "/site/reference" with status 200

  @mockserver
  Example: On load
    When I visit the page "/sample-<%= h.changeCase.paramCase(name) %>"
    Then the title should be "Sample <%= h.changeCase.sentenceCase(name) %>"
