---
to: <%= h.changeCase.paramCase(name) %>/<%= h.prefixedPascalCase(prefix, name) %>.css
---
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.<%= h.prefixedParamCase(prefix, name) %> {
  /* TODO: add component styling */
}
