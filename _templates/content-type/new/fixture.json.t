---
to: examples/nuxt-app/test/fixtures/<%= h.changeCase.paramCase(name) %>/sample-<%= h.changeCase.paramCase(name) %>.json
---
{
  "title": "Sample <%= h.changeCase.sentenceCase(name) %>",
  "changed": "2022-09-15T15:14:30+10:00",
  "created": "2022-09-15T15:14:30+10:00",
  "type": "<%= h.changeCase.paramCase(name) %>",
  "nid": "2526ba4a-e12b-4fbd-a15a-38ac2528b922",
  "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt sit amet ligula sit amet lacinia. In a leo nec tortor aliquet faucibus.",
  "header": {
    "title": "Sample <%= h.changeCase.sentenceCase(name) %>",
    "summary": "news intro test"
  }
}
